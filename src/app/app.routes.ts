import { Routes, RouterModule } from '@angular/router';
import { TextReferencesListComponent } from './components/textReferences-list.component';
import { TextReferencesDetailComponent } from './components/textReferences-detail.component';

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
  // map '/' to '/references' as the default route
  {
    path: '',
    redirectTo: '/references',
    pathMatch: 'full'
  },
];

export const routing = RouterModule.forRoot(routes);

