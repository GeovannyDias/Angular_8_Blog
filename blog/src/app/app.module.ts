import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewPostComponent } from './components/posts/new-post/new-post.component';
import { NewPostModule } from './components/posts/new-post/new-post.module';
import { PostComponent } from './components/posts/post/post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ToolbarComponent } from './shared/componentes/toolbar/toolbar.component';

/* Firebase */
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule, StorageBucket } from "@angular/fire/storage";
import { AngularFireModule } from "@angular/fire";
import { firebaseConfig } from 'src/environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    NewPostComponent,
    PostComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,

    AppRoutingModule,
    NewPostModule,
    MaterialModule,

  ],
  providers: [
    { provide: StorageBucket, useValue: 'gs://blog-geo.appspot.com' } // Para trabajar con el Bucket de las imagenes (Storage of Firebase)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
