import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    // const email = 'geo@geo.com';
    // const pass = '12345678';

    // this.authService.login(email, pass).then(res => {
    //   console.log('Ok');
    // }).catch(error => console.log(error));
  }

  onLogin() {
    // console.log('Form1:', form);
    // console.log('Form2:', this.loginForm.value);

    this.authService.login(this.loginForm.value.email, this.loginForm.value.pass).then(res => {
      console.log('Ok');
    }).catch(error => console.log(error));
    this.resetForm();
  }

  resetForm() {
    this.loginForm.reset();
  }





}
