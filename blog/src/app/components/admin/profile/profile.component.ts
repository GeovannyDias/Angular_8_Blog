import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FileI } from 'src/app/shared/models/file.interface';
import { UserI } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  createFormGroup() {
    return new FormGroup({
      displayName: new FormControl('', Validators.required),
      email: new FormControl({ value: '', disabled: true }, Validators.required), // Campo deshabilidatado
      photoURL: new FormControl('', Validators.required),
    });
  }
  image: FileI
  currerntImage: string = 'https://picsum.photos/seed/picsum/200/300';


  constructor(
    private authService: AuthService
  ) {
    this.profileForm = this.createFormGroup();
  }

  ngOnInit() {
    this.authService.userData$.subscribe((user: any) => {
      console.log('User:', user);
      this.initValuesForm(user);
    });
  }

  initValuesForm(user: UserI) {
    if (user.photoURL) {
      this.currerntImage = user.photoURL;
    }
    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email,
      // photoURL: user.photoURL,
    });
  }

  async onSaveUser(user: UserI) {
    console.log('Save User:', user);
    // this.profileForm.value
    // await this.authService.updateUserProfile(user).then(() => {
    //   console.log('Update profile....');
    // }).catch(error => console.log('Error update profile:', error));
    this.authService.preUpdateUserProfile(user, this.image);
  }

  handleImge(image: FileI) {
    this.image = image
  }




}
