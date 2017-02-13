import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'; // use of template drive forms
import { ReactiveFormsModule } from "@angular/forms"; // use of model driven / reactive forms
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

// routes declaration
import { routing } from './app.routes';

// components declaration
import { AppComponent } from './app.component';
import { TextReferencesListComponent } from './components/textReferences-list.component';
import { TextReferencesDetailComponent } from './components/textReferences-detail.component';
import { NgxDatatableListComponent } from './components/ngxDatatable-list.component';
import { TextreferencesFormDetailComponent } from './components/textReferences-form-detail.component';
import { TextReferencesDetailCreateComponent } from './components/textReferences-detail-create.component';
import { TextReferencesDetailUpdateComponent } from './components/textReferences-detail-update.component';

// services declarations
import { TextReferenceService } from './services/textReferences.service';
import { WindowRefService } from './services/windowRef.service';

@NgModule({
  imports: [BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot(),
    NgxDatatableModule],
  declarations: [AppComponent,
    TextReferencesListComponent,
    TextReferencesDetailComponent,
    NgxDatatableListComponent,
    TextreferencesFormDetailComponent,
    TextReferencesDetailCreateComponent,
    TextReferencesDetailUpdateComponent
  ],
  bootstrap: [AppComponent],
  providers: [TextReferenceService,
    WindowRefService]
})
export class AppModule { }