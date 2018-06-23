import { Injectable } from '@angular/core';
import { last } from '@angular/router/src/utils/collection';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _lastSelectedPost: Post;

  get lastSelectedPost(): Post {
    return this._lastSelectedPost;
  }
  set lastSelectedPost(post: Post) {
    this._lastSelectedPost = post;
  }

  constructor() { }


}
