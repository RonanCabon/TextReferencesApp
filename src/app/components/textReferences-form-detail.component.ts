import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TextReference } from '../models/textReference';

import { TextReferenceService } from '../services/textReferences.service';

import { UUID } from 'angular2-uuid';

@Component({
    selector: 'text-reference-detail-form',
    templateUrl: './app/components/textReferences-model-driven-form-detail.html',
    styleUrls: ['./app/components/textReferences-form-detail.css']
})
export class TextreferencesFormDetailComponent implements OnInit {
    public textReferenceForm: FormGroup; // our model driven form Cf. textReferences-model-driven-form-detail.html
    public events: any[] = []; // use later to display form changes

    textReference: TextReference;

    update: boolean = false; // enables to test state : create or update

    errorMessage: string = '';
    response: Object;

    constructor(private _fb: FormBuilder, // form builder simplify form initialization
        private textReferenceService: TextReferenceService,
        private route: ActivatedRoute,
        private router: Router) { }

    @Input()
    set model(textReference: TextReference) {
        if (textReference) {
            this.textReference = textReference;
            console.log('Call set model (update an existing textReference ...)');
            this.initFormWithTextReference(this.textReference);
            this.update = true; // set the update flag
        }
    };

    ngOnInit() {
        console.log('Call ngOnInit');
        // we will initialize our form model here with a FormBuilder
        this.textReferenceForm = this._fb.group({
            id: [0],
            category: [''],
            title: [''],
            url: [''],
            description: [''],
            bookmarkNote: [''],
            read: [false]
        });

        // subscribe to form changes 
        this.subcribeToFormChanges();

    }

    initEmptyTextTeference(): TextReference {

        // build a new textReference object from scratch

        let uuid = UUID.UUID();

        let textReference = <TextReference>({
            key: uuid, // call the UUID service to generate a unique id
            value: {}
        });

        textReference.value.id = 0;
        textReference.value.title = "";
        textReference.value.category = "";
        textReference.value.url = "";
        textReference.value.description = "";
        textReference.value.bookmarkNote = "";
        textReference.value.read = false;

        return textReference;
    }

    initFormWithTextReference(model: TextReference) {

        // The purpose is here to init the form from an existing textReference
        // for exemple click on an element from the list and get its detail in the detail form 

        // setValue() : passes all the values of the form
        // we can do one value at a time (<FormControl>this.myForm.controls['name']).setValue('John', { onlySelf: true });
        // patchValue(value) : enables one value of the form

        // we can do the whole form in one time
        // (<FormGroup>this.textReferenceForm).setValue(model, { onlySelf: true });

        // initialize the form from the textReference
        (<FormControl>this.textReferenceForm.controls['id']).setValue(model.value.id);
        (<FormControl>this.textReferenceForm.controls['title']).setValue(model.value.title);
        (<FormControl>this.textReferenceForm.controls['category']).setValue(model.value.category);
        (<FormControl>this.textReferenceForm.controls['url']).setValue(model.value.url);
        (<FormControl>this.textReferenceForm.controls['description']).setValue(model.value.description);
        (<FormControl>this.textReferenceForm.controls['bookmarkNote']).setValue(model.value.bookmarkNote);
        (<FormControl>this.textReferenceForm.controls['read']).setValue(model.value.read);

    }

    save(model: any) {

        console.log('call save(), update state: ', this.update);

        if (!this.update) {
            console.log('Call save with no update => create');
            this.textReference = this.initEmptyTextTeference();
        }

        // update textReference from the form object (create/update)
        this.textReference.value.id = model.id;
        this.textReference.value.title = model.title;
        this.textReference.value.category = model.category;
        this.textReference.value.url = model.url;
        this.textReference.value.description = model.description;
        this.textReference.value.bookmarkNote = model.bookmarkNote;
        this.textReference.value.read = model.read;

        // save the textReference in the backend (call API to save textReference)

        if (this.update) { // update an existing textReference
            this.textReferenceService.update(this.textReference)
                .subscribe(
                res => this.response = res, // success case : get Response object and assign it to the local response
                error => this.errorMessage = error, // error case : get error and assign it to the local errorMessage
            );
        } else { // create a new textReference
            this.textReferenceService.create(this.textReference)
                .subscribe(
                res => this.response = res, // success case : get Response object and assign it to the local response
                error => this.errorMessage = error, // error case : get error and assign it to the local errorMessage
            );
        }

        let link = ['/references'];
        this.router.navigate(link);

    }

    reset() {
        this.textReferenceForm.reset();
    }

    openURL() {
        console.log('call openURL TODO');
    }

    subcribeToFormChanges() {
        // initialize stream
        const myFormValueChanges$ = this.textReferenceForm.valueChanges;

        // subscribe to the stream 
        myFormValueChanges$.subscribe(x => this.events.push({ event: 'STATUS CHANGED', object: x }));
    }

}