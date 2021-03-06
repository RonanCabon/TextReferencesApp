import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TextReference } from '../models/textReference';
import { TextReferenceService } from '../services/textReferences.service';

import { WindowRefService } from '../services/windowRef.service';

@Component({
  selector: 'textReferences-detail',
  template: `
   <section *ngIf="textReference">
    <h2>You selected:  {{textReference?.key}}</h2>
    <h3>Description</h3>
    <p>
       {{textReference?.key}} title  {{textReference?.value.title}}
    </p>
    <a href="javascript:void(0)" (click)="openURLinNewTab(textReference)">
      Open URL
    </a>        
  </section>
   <button class="btn btn-primary" (click)="gotoTextReferencesList()">Back to textReferences list</button>
  `
})
export class TextReferencesDetailComponent implements OnInit, OnDestroy {
  textReference: TextReference;
  sub: any;

  constructor(private textReferenceService: TextReferenceService,
    private route: ActivatedRoute,
    private router: Router,
    private winRef: WindowRefService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = params['id']; // Cf. app.route.ts
      this.textReferenceService.get(id).subscribe(
        textReference => this.textReference = textReference
      )
    });
  }

  // enables to avoid memory leaks
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoTextReferencesList() { // management of the "back" button on the detail's page
    let link = ['/references'];
    this.router.navigate(link);
  }

  openURLinNewTab(textReference: TextReference) {
    this.winRef.nativeWindow.open(textReference.value.url, '_blank');
  }

}
