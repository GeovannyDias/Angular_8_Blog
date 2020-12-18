import { Component, OnInit } from '@angular/core';
import { PostService } from '../../posts/post.service';
import { Observable } from 'rxjs';
import { PostI } from 'src/app/shared/models/post.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Maquetar datos de prueba (Mockear)
  public posts$: Observable<PostI[]>; // $ Es una convencion

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    // this.postService.getPosts().subscribe(data => {
    //   console.log(data);
    // });
    this.posts$ = this.postService.getPosts();
  }


}
