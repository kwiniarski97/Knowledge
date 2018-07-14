import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import {  registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';


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
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { LoginDialogComponent } from './components/menu/login-dialog/login-dialog.component';
import { AuthService } from './services/auth.service';
import { HttpClientJwtModule } from './modules/http-client-jwt/http-client-jwt.module';
import { TranslateModule, TranslateLoader, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PostDetailsComponent } from './components/search-results/post-details/post-details.component';
import { SchoolnamePipe } from './pipes/schoolname.pipe';
import { DisqusModule } from 'ngx-disqus';
import { UserSessionService } from './services/user-session.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchboxComponent,
    AppComponent,
    HomeComponent,
    SearchboxComponent,
    AddComponent,
    NotFoundComponent,
    SearchResultsComponent,
    MenuComponent,
    EnumToArrayPipe,
    SchoolnamePipe,
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
    HttpClientJwtModule,
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
    DisqusModule.forRoot('gotowiec'),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'add', component: AddComponent },
      { path: 'search/:page/:query', component: SearchResultsComponent },
      { path: 'post/:id', component: PostDetailsComponent },
      { path: '**', component: NotFoundComponent },
    ])
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pl' },
    PostService,
    AuthService,
    UserSessionService
  ],
  bootstrap: [AppComponent],
  entryComponents: [SearchDialogComponent, LoginDialogComponent]
})
export class AppModule {

  constructor(private translateService: TranslateService) {
    registerLocaleData(localePl, 'pl');
    translateService.setDefaultLang('pl');
    translateService.use('pl');
  }
}
