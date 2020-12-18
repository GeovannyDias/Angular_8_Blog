import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FileI } from '../models/file.interface';
import { UserI } from '../models/user.interface';
import { map, finalize } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData$: Observable<firebase.User>;

  private filePath: any;
  // private downloadURL: Observable<string>;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    private storage: AngularFireStorage,
  ) {
    this.userData$ = this.afAuth.authState;
  }


  //Iniciar Sesión
  async login(mail: string, pass: string) {
    return new Promise((resolve, rejected) => {
      this.afAuth.auth.signInWithEmailAndPassword(mail, pass).then(user => {

        // const uid = this.afAuth.auth.currentUser.uid
        // this.fcmService.generateToken(uid, tipo);
        console.log('Successful....');
        resolve(user);
        this.router.navigate(['/']);
      }).catch(err => {
        // const sms = 'Usuario o contraseña incorrecto';
        // this.mensaje_login(sms);
        console.log('Error auth....');
        console.log('Message Rej: ', err.message);
        console.log('Code Rej: ', err.code);
        rejected(err)
      });
    });
  }


  //Cerrar Sesión
  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });

    // setTimeout(() => {
    //   location.reload();
    // }, 1000);

  }

  preUpdateUserProfile(user: UserI, image?: FileI) {
    if (image) {
      this.uploadImage(user, image);
    } else {
      this.updateUserProfile(user);
    }
  }

  async uploadImage(user: UserI, image: FileI) {
    this.filePath = 'profile/' + image.name;
    // this.filePath = `images/${image.name}`;
    // this.filePath = 'images/' + id;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(urlImage => {
          // this.downloadURL = urlImage;
          user.photoURL = urlImage;
          this.updateUserProfile(user);
        });
      })
    ).subscribe();
  }

  async updateUserProfile(user: UserI) {
    console.log('save profile', user);
    await this.afAuth.auth.currentUser.updateProfile({
      displayName: user.displayName,
      photoURL: user.photoURL
    }).then(() => {
      console.log('Update profile....');
    }).catch(error => console.log('Error update profile:', error));
  }









  //=================================================================================
  // Registro
  // async signup(data: UsuarioI) {

  //   this.storageService.setValue('tipo_auth', data.tipo).then(res => {
  //     console.log('Storage value:', res);
  //   }).catch(error => console.log('Error Storage value:', error));


  //   // setTimeout(async () => {

  //   return await new Promise((resolve, reject) => {
  //     this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.pass).then(async res => {
  //       const uid = res.user.uid;
  //       const id = uid;
  //       delete data.pass;
  //       const tipo = data.tipo;

  //       await this.updateFirebaseuser(data).then(() => {
  //         console.log('Update Profile successful 1...');
  //       }).catch(error => console.log('Error update profile:', error));

  //       await this.db.collection(tipo).doc(uid).set({ id, uid, ...data }).then(() => {
  //         console.log('Signup successful 2...');
  //         this.fcmService.generateToken(uid, tipo);
  //         resolve(res);

  //         // if (data.tipo == 'propietario') {
  //         //   this.navCtrl.navigateForward(['/registro-auto']);
  //         // }

  //         // if (data.tipo == 'encargado') {
  //         //   this.navCtrl.navigateForward(['/menu-driver-geo']);
  //         // }
  //       }).catch(error => console.log('Error Signup:', error));




  //       // loading.dismiss();
  //     }).catch(error => reject(error));
  //   });
  //   // }, 2000);



  // }




}
