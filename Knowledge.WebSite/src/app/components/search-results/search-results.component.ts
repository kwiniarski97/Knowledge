import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SchoolTypes} from '../../models/school-types.enum';
import {MaterialType} from '../../models/material-type.enum';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  query: string;

  posts: any = [{
    id: 1,
    title: 'Title placeholder',
    description: 'Description placeholder',
    school: SchoolTypes.Podstawowa,
    type: MaterialType.Kartkowka,
    file: null,
    points: 17,
    downloads: 103,
    userNickname: 'user2137',
    dateOfAdding: new Date().toLocaleDateString()
  }];

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.query = this.route.snapshot.params['query'];
  }




}
