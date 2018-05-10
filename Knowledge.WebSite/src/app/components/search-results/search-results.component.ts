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

  totalItems: number;

  constructor(private route: ActivatedRoute, private postService: PostService) {

  }

  ngOnInit() {
    this.query = this.route.snapshot.params['query'];
    this.currentPage = this.route.snapshot.params['page'];

    // todo pobierz z serwisu
    this.postService.search(this.query, this.currentPage).subscribe(response => {
      this.currentPage = response['currentPage'];
      this.posts = response['posts'];
      //todo zbinduj reszte propów
    }, err => {
      console.log(err);
    });

    this.postService.getNumberOfPostsInSearchQuery(this.query).subscribe(response => {
      this.totalItems = response;
      this.numberOfPages = this.totalItems / this.numberOfPages;
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

  getShortDate(addDateUtc: string) {
    return new Date(addDateUtc).toLocaleDateString();
  }
}
