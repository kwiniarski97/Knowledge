import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SchoolTypes} from '../../models/school-types.enum';
import {MaterialType} from '../../models/material-type.enum';
import {Post} from '../../models/post';
import {User} from '../../models/user';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  query: string;

  posts: Post[] = [{
    id: 1,
    title: 'Title placeholder',
    description: 'Description placeholder',
    school: SchoolTypes.Podstawowa,
    type: MaterialType.Kartkowka,
    thumbImagePath: 'assets/img/placeholder.jpg',
    filePath: 'assets/img/placeholder.jpg',
    points: 17,
    downloads: 103,
    user: {nickname: 'asdada'},
    dateOfAdding: new Date().toLocaleDateString()
  }];

  currentPage = 1;
  numberOfPages: number = 10;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.query = this.route.snapshot.params['query'];
    this.currentPage = this.route.snapshot.params['page'];

    // todo pobierz z serwisu
  }


  upvote(id: number) {
    // todo
    ++this.posts.find(x => x.id === id).points;
  }

  downvote(id: number) {
    // todo
    --this.posts.find(x => x.id === id).points;

  }

  getFirstPage() {
    // todo
  }

  getPreviousPage() {
    // todo
  }

  getNextPage() {
    // todo
  }

  getLastPage() {
    // todo
  }

  downloadFile(post: Post) {
    // todo
  }
}
