import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {SearchDialogComponent} from './search-dialog/search-dialog.component';
import {SearchboxComponent} from '../searchbox/searchbox.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isMobileMenuShown = false;

  routes = [
    {path: 'add', name: 'Dodaj'},
  ];

  constructor(public dialog: MatDialog) {
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
    this.dialog.open(SearchDialogComponent, {
      width: '350px',
      height: '170px'
    });
  }

  search(query: string) {
    SearchboxComponent.search(query);
  }
}
