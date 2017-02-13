import { Component, OnInit, NgZone } from '@angular/core';
import { TextReference } from '../models/textReference';
import { TextReferenceService } from '../services/textReferences.service';
import { WindowRefService } from '../services/windowRef.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'textReferences-list',
  templateUrl: './app/components/textReferences-list.html',
  styleUrls: ['./app/components/textReferences-list.css']
})
export class TextReferencesListComponent implements OnInit {

  // pre-allocating a typed array in TypeScript
  textReferences: TextReference[] = [];

  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private textReferenceService: TextReferenceService,
    private zone : NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private winRef: WindowRefService) { } // enables to call the window object

  ngOnInit() { // initial action : populate the textReferences
    console.log('Call textReferences list ngOninit ...');
    this.textReferenceService.getAll().subscribe(
        textReferences => this.textReferences = textReferences, // success case : get textReferences and assign it to the local textReferences
      error => this.errorMessage = error, // error case : get error and assign it to the local errorMessage
      () => this.zone.run(() => { this.isLoading = false }) // onComplete => run Angular 2 change detections with Zone.js to update the DOM
    );
  }

  deleteTextReference(textReference: TextReference) {
    // if (confirm('Are you sure you want to delete textReference ' + textReference.value.title)) {
    this.textReferenceService.delete(textReference)
      .subscribe(
      (response) => {
        //if (response.status === 204) {
        this.textReferences.forEach((t: TextReference, i: number) => {
          if (t.key === textReference.key) {
            this.textReferences.splice(i, 1);
          }
        });
        console.log(this.textReferences);
      }
      //}
      );
    //}

    let link = ['/references'];
    this.router.navigate(link);

  }

  openURLinNewTab(textReference: TextReference) {
    this.winRef.nativeWindow.open(textReference.value.url, '_blank');
  }

  createNewTextReference() {
    let link = ['/create'];
    this.router.navigate(link);
  }

  updateTextReference(textReference: TextReference) {
    console.log('updateTextReference: ', textReference);
    let link = ['/update', textReference.key];
    this.router.navigate(link);
  }

  gotoNgxDatatableList() {
    let link = ['/ngxdatatable'];
    this.router.navigate(link);
  }

}
