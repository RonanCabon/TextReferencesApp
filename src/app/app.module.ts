import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// routes declaration
import { routing } from './app.routes';

// components declaration
import { AppComponent }   from './app.component';
import { TextReferencesListComponent } from './components/textReferences-list.component';
import { TextReferencesDetailComponent } from './components/textReferences-detail.component';


// services declarations
import { TextReferenceService } from './services/textReferences.service';

@NgModule({
  imports:      [ BrowserModule, routing, FormsModule, HttpModule, NgbModule.forRoot()],
  declarations: [ AppComponent, TextReferencesListComponent, TextReferencesDetailComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [TextReferenceService]
})
export class AppModule { }