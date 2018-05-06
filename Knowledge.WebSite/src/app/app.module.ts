import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';


import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {SearchboxComponent} from './components/searchbox/searchbox.component';
import {AddComponent} from './components/add/add.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import {SearchResultsComponent} from './components/search-results/search-results.component';
import {CovalentFileModule, CovalentLayoutModule, CovalentStepsModule} from '@covalent/core';
import {FormsModule} from '@angular/forms';
import {MenuComponent} from './components/menu/menu.component';
import {EnumToArrayPipe} from './pipes/enum-to-array.pipe';
import {SearchDialogComponent} from './components/menu/search-dialog/search-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchboxComponent,
    AddComponent,
    NotFoundComponent,
    SearchResultsComponent,
    MenuComponent,
    EnumToArrayPipe,
    SearchDialogComponent

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
    MatMenuModule,
    MatToolbarModule,
    MatSelectModule,
    MatDialogModule,
    MatCardModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'add', component: AddComponent},
      {path: 'search/:page/:query', component: SearchResultsComponent},
      {path: '**', component: NotFoundComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SearchDialogComponent]
})
export class AppModule {
}
