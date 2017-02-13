import { Routes, RouterModule } from '@angular/router';
import { TextReferencesListComponent } from './components/textReferences-list.component';
import { TextReferencesDetailComponent } from './components/textReferences-detail.component';
import { TextReferencesDetailCreateComponent } from './components/textReferences-detail-create.component';
import { TextReferencesDetailUpdateComponent } from './components/textReferences-detail-update.component';
import { NgxDatatableListComponent } from './components/ngxDatatable-list.component';

// Route config let's you map routes to components
const routes: Routes = [

  // map '/references' to the textReferences list component
  {
    path: 'references',
    component: TextReferencesListComponent,
  },
  // map '/references/:id' to textreferences details component
  {
    path: 'references/:id',
    component: TextReferencesDetailComponent
  },
  // map '/references/create' to textreferences detail create component
  {
    path: 'create', // do not use references which is dedicated to backend call
    component: TextReferencesDetailCreateComponent
  },
  // map '/references/update' to textreferences detail update component
  {
    path: 'update/:id', // do not use references which is dedicated to backend call
    component: TextReferencesDetailUpdateComponent
  },
  // map '/' to '/references' as the default route
  {
    path: '',
    redirectTo: '/references',
    pathMatch: 'full'
  },
  // map '/ngxdatatable' to '/ngxdatatable' list component
  {
    path: 'ngxdatatable',
    component: NgxDatatableListComponent,
  },
];

export const routing = RouterModule.forRoot(routes);

