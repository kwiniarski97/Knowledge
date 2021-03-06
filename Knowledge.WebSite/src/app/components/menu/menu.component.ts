import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';
import { SearchboxComponent } from '../searchbox/searchbox.component';
import { Router } from '@angular/router';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { UserSessionService } from '../../services/user-session.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isMobileMenuShown = false;

  routes = [
    { path: 'add', name: 'Dodaj' },
  ];

  constructor(public dialog: MatDialog, private router: Router, public userSession: UserSessionService) {
  }

  ngOnInit() {
  }

  showMobileMenu(): void {
    this.isMobileMenuShown = !this.isMobileMenuShown;
  }

  hideMobileMenu() {
    this.isMobileMenuShown = false;
  }

  openSearchBox(): void {
    this.hideMobileMenu();
    this.dialog.open(SearchDialogComponent, {
      width: '350px',
      height: '170px'
    });
  }

  search(query: string) {
    const searchBoxComponent = new SearchboxComponent(this.router);
    searchBoxComponent.search(query);
  }

  openLoginBox() {
    this.dialog.open(LoginDialogComponent, {
      maxWidth: '60vw',
      minWidth: '30vw'
    });
  }

  logout() {
    this.userSession.userLogout();
  }
}
