import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../models/post';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  pageId: string;
  pageUrl: string;

  post: Post = new Post();

  constructor(private route: ActivatedRoute, private postService: PostService, private sessionService: SessionService) {

  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.pageUrl = this.route.snapshot.url.toString();
    this.postService.getPostById(id).subscribe(ok => {
      this.post = ok;
    });

  }



}
