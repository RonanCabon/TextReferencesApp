import { Component, OnInit } from '@angular/core';
import { TextReference } from '../models/textReference';
import { TextReferenceService } from '../services/textReferences.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'textReferences-list',
  template: `
  <section>
    <section *ngIf="isLoading && !errorMessage">
      Loading textReferences ... Retrieving data...
    </section>
    <ul>
      <li *ngFor="let textReference of textReferences">
        <a href="#" [routerLink]="['/references', textReference.key]">
          {{textReference.key}}
        </a>
      </li>
    </ul>
    <section *ngIf="errorMessage">
      {{errorMessage}}
    </section>
  </section>
    <p>textReferences object from the backend:</p>
    {{textReferences|json}}
    <div>
    <button class="btn btn-primary" (click)="gotoNgxDatatableList()">Test ngxDatatable list</button>
    </div>
  `
})
export class TextReferencesListComponent implements OnInit{

  // pre-allocating a typed array in TypeScript
  textReferences: TextReference[] = [];
  test:any;

  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private textReferenceService:TextReferenceService,
  private route: ActivatedRoute,
  private router: Router){}

  ngOnInit(){ // initial action : populate the textReferences
    this.textReferenceService.getAll().subscribe(
      textReferences => this.textReferences = textReferences, // success case : get textReferences and assign it to the local textReferences
      error => this.errorMessage = error, // error case : get error and assign it to the local errorMessage
      () => this.isLoading = false // onComplete
    );
  }

  gotoNgxDatatableList(){ 
        let link = ['/ngxdatatable'];
        this.router.navigate(link);
    }

}
