import { Component, Input, OnInit } from '@angular/core';
// import { PostService } from '../../posts/post.service';
// import { Observable } from 'rxjs';
import { PostI } from 'src/app/shared/models/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: PostI;
  // public posts$: Observable<PostI[]>; // $ Es una convencion

  constructor(
    // private postService: PostService
  ) { }

  ngOnInit() {
    // this.posts$ = this.postService.getPosts();
  }

}
