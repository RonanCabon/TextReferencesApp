import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TextReference } from '../models/textReference';
import { TextReferenceService } from '../services/textReferences.service';

import { TextreferencesFormDetailComponent } from './textReferences-form-detail.component';

@Component({
  selector: 'text-reference-detail-update',
  template: '<text-reference-detail-form [model]="textReference"></text-reference-detail-form>'
})
export class TextReferencesDetailUpdateComponent implements OnInit {

  textReference: TextReference;
  sub: any;

  constructor(private textReferenceService: TextReferenceService,
    private route: ActivatedRoute,
    private router: Router) { }

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

}