import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { TextReference } from '../models/textReference';

@Injectable()
export class TextReferenceService {

    private baseUrl: string = 'http://localhost:8080/api';
    constructor(private http: Http) {
    }

    // get all the textReferences and return an observable array[]
    getAll(): Observable<TextReference[]> {
        console.log('calling get ', `${this.baseUrl}/references`);
        let textReferences$ = this.http
            .get(`${this.baseUrl}/references`, { headers: this.getHeaders() }) // Observable<Object[]>
            .map(mapTextReferences) // mapTextReferences is a callback method
            .catch(handleError);
        return textReferences$;
    }

    private getHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    // get a single textReference
    get(id: string): Observable<TextReference> {
        console.log('calling get ', `${this.baseUrl}/references/${id}`);
        let textReference$ = this.http
            .get(`${this.baseUrl}/references/${id}`, { headers: this.getHeaders() })
            .map(mapTextReference)
            .catch(handleError);
        return textReference$;
    }

    // update an existing textReference
    update(textReference: TextReference): Observable<Response> {
        let id = textReference.key;
        console.log('calling put ', `${this.baseUrl}/references/${id}`);
        let response$ = this.http
            .put(`${this.baseUrl}/references/${id}`, JSON.stringify(textReference), { headers: this.getHeaders() })
            .map(extractData)
            .catch(handleError);
        return response$;
    }

    // create a new textReference
    create(textReference: TextReference): Observable<Response> {
        console.log('calling post ', `${this.baseUrl}/references`);
        console.log('create a new textReference : ', JSON.stringify(textReference));
        let response$ = this.http
            .post(`${this.baseUrl}/references`, JSON.stringify(textReference), { headers: this.getHeaders() })
            .map(extractData)
            .catch(handleError);
        return response$;
    }

    // delete an existing textReference
    delete(textReference: TextReference): Observable<Response> {
        let id = textReference.key;
        console.log('calling delete ', `${this.baseUrl}/references/${id}`);
        let response$ = this.http
            .delete(`${this.baseUrl}/references/${id}`, { headers: this.getHeaders() })
            .map(extractData)
            .catch(handleError);
        return response$;
    }

}

// internals functions of the service

function mapTextReferences(response: Response): TextReference[] {
    return response.json().map(toTextReference); // toTextReference is a callback method and is called on each element of the array Observable<Object[]>
}

function mapTextReference(response: Response): TextReference {
    return toTextReference(response.json());
}

function toTextReference(r: any): TextReference {

    let key = Object.keys(r)[0];
    let value = r[key];

    let textReference = <TextReference>({
        key: key,
        value: {}
    });

    textReference.value.id = value.id;
    textReference.value.title = value.title;
    textReference.value.category = value.category;
    textReference.value.url = value.url;
    textReference.value.description = value.description;
    textReference.value.bookmarkNote = value.bookmarkNote;
    textReference.value.read = value.read;

    return textReference;
}

function extractData(res: Response) {
    let body = res.json();
    return body.data || {};
}

function handleError(error: any) {
    let errorMsg = error.message || `problem in getting data !`
    console.error(errorMsg);

    // throw an application level error
    return Observable.throw(errorMsg);
}

