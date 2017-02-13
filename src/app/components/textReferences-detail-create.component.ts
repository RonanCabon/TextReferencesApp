import { Component } from '@angular/core';
import { TextReference } from '../models/textReference';
import { TextreferencesFormDetailComponent } from './textReferences-form-detail.component';

@Component({
    selector: 'text-reference-detail-create',
    template: '<text-reference-detail-form></text-reference-detail-form>'
})
export class TextReferencesDetailCreateComponent {
    textReference: TextReference;
}