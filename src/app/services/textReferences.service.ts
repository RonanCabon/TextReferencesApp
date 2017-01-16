import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { TextReference } from '../models/textReference';

@Injectable()
export class TextReferenceService{

    private baseUrl: string = 'http://localhost:8080/api';
    constructor(private http : Http){
    }

    // get all the textReferences and return an observable array[]
    getAll(): Observable<TextReference[]>{
        let textReferences$ = this.http
        .get(`${this.baseUrl}/references`, {headers: this.getHeaders()}) // Observable<Object[]>
        .map(mapTextReferences) // mapTextReferences is a callback method
        .catch(handleError);
        return textReferences$;
    }

    private getHeaders(){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }

    // get a single textReference
    get(id: string): Observable<TextReference> {
        console.log('calling ',`${this.baseUrl}/references/${id}`);
        let textReference$ = this.http
        .get(`${this.baseUrl}/references/${id}`, {headers: this.getHeaders()})
        .map(mapTextReference)
        .catch(handleError);
        return textReference$;
    }

    // update an existing textReference
    //update(textReference: TextReference) : Observable<Response>{
    //    return this
    //    .http
    //    .put(`${this.baseUrl}/references/${textReference.id}`, JSON.stringify(textReference), {headers: this.getHeaders()});
    //}

    // create a new textReference
    //create(textReference: TextReference) : Observable<Response>{
    //    return this
    //    .http
    //    .put(`${this.baseUrl}/references/${textReference.id}`, JSON.stringify(textReference), {headers: this.getHeaders()});
    //}

    // delete an existing textReference
    //delete(textReference: TextReference) : Observable<Response>{
    //    return this
    //    .http
    //    .delete(`${this.baseUrl}/references/${textReference.id}`, {headers: this.getHeaders()});
    //}

}

// internals functions of the service

function mapTextReferences(response:Response): TextReference[]{
    return response.json().map(toTextReference); // toTextReference is a callback method and is called on each element of the array Observable<Object[]>
}

function mapTextReference(response:Response): TextReference{
    console.log('mapTextreference ',response.json());
   return toTextReference(response.json());
}

function toTextReference(r:any): TextReference{

    let key=Object.keys(r)[0];
    let value=r[key];
 
    let textReference = <TextReference>({
        key: key,
        value:{}
    });
    
    textReference.value.id=value.id;
    textReference.value.title=value.title;
    textReference.value.url=value.url;
    textReference.value.description=value.description;
    textReference.value.bookmarkNote=value.bookmarkNote;
    textReference.value.read=value.read;

    console.log('textReference ',textReference);

  return textReference;
}

function handleError (error: any) {
  let errorMsg = error.message || `problem in getting data !`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}

