import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PostI } from "../../shared/models/post.interface";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postCollection: AngularFirestoreCollection<PostI>;
  private posts: Observable<PostI[]>;

  constructor(
    private db: AngularFirestore
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

  updatePost(id: string, post: PostI) {
    this.postCollection = this.db.collection<PostI>('posts');
    return this.postCollection.doc(id).update(post);
  }

  setPost(post: PostI) {
    const id = this.db.createId();
    this.postCollection = this.db.collection<PostI>('posts');
    return this.postCollection.doc(id).set({ ...post });
  }

  removePost(id) {
    this.postCollection = this.db.collection<PostI>('posts');
    return this.postCollection.doc(id).delete();
  }



  // addUser(user: PostI) { // No utilizada
  //   // Puede manjarse con "SET"
  //   this.postCollection = this.db.collection<PostI>('posts');
  //   return this.postCollection.add(user);
  // }


}
