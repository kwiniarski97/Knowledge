import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchboxComponent } from './components/searchbox/searchbox.component';
import { AddComponent } from './components/add/add.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { CovalentFileModule, CovalentLayoutModule, CovalentStepsModule } from '@covalent/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { SearchDialogComponent } from './components/menu/search-dialog/search-dialog.component';
import { PostService } from './services/post.service';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { LoginDialogComponent } from './components/menu/login-dialog/login-dialog.component';
import { AuthService } from './services/auth.service';


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
    SearchDialogComponent,
    FooterComponent,
    PostDetailsComponent,
    LoginDialogComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentFileModule,
    MatIconModule,
    MatCheckboxModule,
    MatMenuModule,
    MatToolbarModule,
    MatSelectModule,
    MatDialogModule,
    MatCardModule,
    MatTabsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'add', component: AddComponent },
      { path: 'search/:page/:query', component: SearchResultsComponent },
      { path: 'post/:id', component: PostDetailsComponent },
      { path: '**', component: NotFoundComponent },
    ])
  ],
  providers: [PostService, AuthService],
  bootstrap: [AppComponent],
  entryComponents: [SearchDialogComponent, LoginDialogComponent]
})
export class AppModule {
}
