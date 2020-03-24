import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData: Observable<firebase.User>;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore
  ) {
    this.userData = this.afAuth.authState;
  }



  //=================================================================================
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

  //=================================================================================
  //Cerrar Sesión
  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/home']);
    });

    // setTimeout(() => {
    //   location.reload();
    // }, 1000);

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
