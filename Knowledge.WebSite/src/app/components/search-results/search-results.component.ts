import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SchoolTypes} from '../../models/school-types.enum';
import {MaterialTypes} from '../../models/material-type.enum';
import {Post} from '../../models/post';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  query: string;

  posts: Post[];

  currentPage = 1;
  numberOfPages: number = 10;

  constructor(private route: ActivatedRoute, private postService: PostService) {

  }

  ngOnInit() {
    this.query = this.route.snapshot.params['query'];
    this.currentPage = this.route.snapshot.params['page'];

    // todo pobierz z serwisu
    this.postService.search(this.query).subscribe(response => {
      this.posts = response;
    }, err => {
      console.log(err);
    });
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

  downloadFile(filePath: string) {
    // todo
    window.open(filePath, '_blank');
  }

  getSchoolTypeName(school: SchoolTypes): string {
    return SchoolTypes[school];
  }

  getMaterialTypeName(materialType: MaterialTypes): string {
    return MaterialTypes[materialType];
  }

  getShortDate(addDateUtc: Date) {
    return new Date(addDateUtc).toLocaleDateString();
  }
}
