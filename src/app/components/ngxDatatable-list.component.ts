import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'test-ngx-datatable',
  template: `
  <h2>Use of the ngx-datatable </h2> 
<div>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [columns]="columns">
      </ngx-datatable>
</div> 
   <button class="btn btn-primary" (click)="gotoTextReferencesList()">Back to textReferences list</button>
  `
})
export class NgxDatatableListComponent {

  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  gotoTextReferencesList() { // management of the "back" button
    let link = ['/references'];
    this.router.navigate(link);
  }

}
