import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PostService } from '../post.service';
import { PostI } from 'src/app/shared/models/post.interface';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  public newPostForm = new FormGroup({
    titlePost: new FormControl('', Validators.required),
    contentPost: new FormControl('', Validators.required),
    tagsPost: new FormControl('', Validators.required),
    imagePost: new FormControl('', Validators.required),
  });

  image: any;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
  }

  async addNewPost() {
    // console.log('add New Post', this.newPostForm.value);
    await this.postService.addPost_uploadImage(this.newPostForm.value, this.image);

  }


  handleImage(event: any) {
    this.image = event.target.files[0];
    console.log('Image:', this.image);
  }




}
