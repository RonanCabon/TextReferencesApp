import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

// routes declaration
import { routing } from './app.routes';

// components declaration
import { AppComponent }   from './app.component';
import { TextReferencesListComponent } from './components/textReferences-list.component';
import { TextReferencesDetailComponent } from './components/textReferences-detail.component';
import { NgxDatatableListComponent } from './components/ngxDatatable-list.component';


// services declarations
import { TextReferenceService } from './services/textReferences.service';

@NgModule({
  imports:      [ BrowserModule, routing, FormsModule, HttpModule, NgbModule.forRoot(),NgxDatatableModule],
  declarations: [ AppComponent, TextReferencesListComponent, TextReferencesDetailComponent,NgxDatatableListComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [TextReferenceService]
})
export class AppModule { }