import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Observable } from 'rxjs';
import { PostI } from 'src/app/shared/models/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  public post: {
    id: string;
    titlePost: string;
    contentPost: string;
    imagePost: string;
  } = {
      id: '1',
      titlePost: 'Post One',
      contentPost: 'Hola geo',
      imagePost: 'https://i.picsum.photos/id/237/200/300.jpg'
    }


  post$: Observable<PostI>
  id_post: string;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.getDataPost();

  }


  getDataPost() {
    // this.post.id = this.route.snapshot.params.id;
    this.id_post = this.route.snapshot.params.id;
    if (this.id_post) {
      this.post$ = this.postService.getPost(this.id_post);
    }
  }



}
