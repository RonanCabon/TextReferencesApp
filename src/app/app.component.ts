import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: `
    <h1>  {{title}}  </h1>
    <div class="alert alert-success" role="alert">
      <strong>Well done! Bootstrap successfully loaded !!!</strong>
    </div>
<p>
  <ngb-alert [dismissible]="false">
    <strong>Well done! ng-Bootstrap successfully loaded !!!</strong>
  </ngb-alert>
</p>    
    <router-outlet></router-outlet>
    `
})
export class AppComponent {
  title: String = 'Text References application';
}