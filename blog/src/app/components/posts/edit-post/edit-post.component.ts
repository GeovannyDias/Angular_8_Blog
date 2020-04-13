import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PostI } from 'src/app/shared/models/post.interface';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  @Input() post: PostI;

  private image: any;
  private imageOriginal: any;

  public editPostForm = new FormGroup({
    id: new FormControl('', Validators.required),
    titlePost: new FormControl('', Validators.required),
    contentPost: new FormControl('', Validators.required),
    tagsPost: new FormControl('', Validators.required),
    imagePost: new FormControl('', Validators.required),
  });

  constructor(
    private postService: PostService
  ) { }


  ngOnInit() {
    this.image = this.post.imagePost;
    this.imageOriginal = this.post.imagePost;
    this.initValuesForm();
  }

  editPost() {
    const post = this.editPostForm.value;

    console.log('Edit Post → editPost()');
    // console.log('img:', this.image);
    // console.log('imgOriginal:', this.imageOriginal);

    if (this.image === this.imageOriginal) {
      post.imagePost = this.imageOriginal;
      // call method (id, post)
      this.postService.updatePost(post.id, post);

    } else {
      // call method (id, post, this.image)
      this.postService.updatePost(post.id, post, this.image);
    }
  }

  handleImage(event: any) {
    console.log('Edit Post → handleImage()');
    this.image = event.target.files[0];
  }

  // Cargar los valores a edtar

  private initValuesForm() {
    this.editPostForm.patchValue({
      id: this.post.id,
      titlePost: this.post.titlePost,
      contentPost: this.post.contentPost,
      tagsPost: this.post.tagsPost
    }); // recibe un objeto de opciones

    console.log('Form:', this.editPostForm.value);


  }



}
