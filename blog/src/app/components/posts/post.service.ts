import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from "rxjs";
import { map, finalize } from "rxjs/operators";
import { PostI } from "../../shared/models/post.interface";
import { FileI } from 'src/app/shared/models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postCollection: AngularFirestoreCollection<PostI>;
  private posts: Observable<PostI[]>;

  private filePath: any;
  private downloadURL: Observable<string>;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  // ==========================================================================
  // CRUD - GEO
  // ==========================================================================

  // All Post
  getPosts() {
    console.log('post.service → getPosts');
    this.postCollection = this.db.collection<PostI>('posts');
    const posts = this.postCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data }; //operador de propagacion
        });
      }
    ));

    return posts;
  }

  // One Post

  getPost(id: string) {
    this.postCollection = this.db.collection<PostI>('posts');
    return this.postCollection.doc<PostI>(id).valueChanges();
  }

  updatePost(id: string, post: PostI, newImage?: FileI): void {
    this.postCollection = this.db.collection<PostI>('posts');
    if (newImage) { // Update data and image
      this.addPost_uploadImage(post, newImage, true);
    } else { // Update only data
      this.postCollection.doc(id).update(post).then(() => {
        console.log('UPDATE POST SUCCESSFUL...');
      }).catch(error => console.log('Error update post', error));
    }
  }

  updatePost_image(id: string, post: PostI) {
    this.postCollection = this.db.collection<PostI>('posts');
    return this.postCollection.doc(id).update(post);
  }

  setPost(post: PostI) {
    // const id = this.db.createId();
    this.postCollection = this.db.collection<PostI>('posts');
    return this.postCollection.doc(post.id).set({ ...post });
  }

  removePost(id) {
    this.postCollection = this.db.collection<PostI>('posts');
    return this.postCollection.doc(id).delete();
  }


  // -------------------------------------------
  async addPost_uploadImage(post: PostI, image: FileI, edit?: boolean) {
    if (edit) { // updatPost
      const id = post.id;
      // post.id = id;
      this.filePath = 'images/' + id;
    } else { // setPost
      const id = this.db.createId();
      post.id = id;
      this.filePath = 'images/' + id;
    }
    // this.filePath = `images/${image.name}`;

    // this.filePath = 'images/' + id;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(urlImage => {
          this.downloadURL = urlImage;
          console.log('URL_IMAGE:', this.downloadURL);
          console.log('POST:', post);
          post.imagePost = this.downloadURL;
          post.fileRef = this.filePath;

          if (edit) {
            // UPDATE POST
            this.updatePost_image(post.id, post).then(() => {
              console.log('UPDATE POST SUCCESSFUL...');
            }).catch(error => console.log('Error update post', error));
          } else {
            // CALL ADD POST
            this.setPost(post).then(() => {
              console.log('SET POST SUCCESSFUL...');
            }).catch(error => console.log('Error set post', error));
          }

        });
      })
    ).subscribe();
  }






}
