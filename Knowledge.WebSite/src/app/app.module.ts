import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchboxComponent } from './components/searchbox/searchbox.component';
import { AddComponent } from './components/add/add.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatIconModule, MatInputModule} from '@angular/material';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import {CovalentFileModule, CovalentLayoutModule, CovalentStepsModule} from '@covalent/core';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchboxComponent,
    AddComponent,
    NotFoundComponent,
    SearchResultsComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentFileModule,
    MatIconModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'add', component: AddComponent },
      { path: '**', component: NotFoundComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
