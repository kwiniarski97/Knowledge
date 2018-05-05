import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent implements OnInit {

  public static search(query: string) {
    // todo
    console.log(query);
  }

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  search(query: string) {
    SearchboxComponent.search(query);
  }
}
