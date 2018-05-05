import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  query: string;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.query = this.route.snapshot.params['query'];
  }




}
