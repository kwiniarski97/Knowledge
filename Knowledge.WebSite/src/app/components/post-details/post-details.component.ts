import {Component, OnInit} from '@angular/core';
import {PostDetails} from '../../models/post-details';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  post: PostDetails = new PostDetails();

  constructor(private route: ActivatedRoute, private postService: PostService) {
    const id = this.route.snapshot.params['id'];
    this.postService.getPostById(id).subscribe(ok => {
      this.post = ok;
    });
  }

  ngOnInit() {
  }

}
