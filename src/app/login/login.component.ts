import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName = '';
  userPassword = '';
  userError: string = null;
  passwordError: string = null;
  error: string = null;
  constructor(public auth: AuthService,  public router: Router) {}

  ngOnInit(): void {
    const token: any =  localStorage.getItem('token');
    if (token !== null){
      this.router.navigate(['/home']);
    }
  }
  isValidate() {
    let flag = true;
    this.userError = '';
    this.passwordError = '';
    if (this.userName === '') {
       this.userError = 'Username is missing';
       flag = false;
     }
    if (this.userPassword === '') {
      this.passwordError = 'Password is missing';
      flag = false;
    }

    return flag;
  }
  checkDetails($event = null) {
    if ( $event !=  null ) {
      $event.preventDefault();
    }
    this.error = '';
    if (this.isValidate()) {
    const dt = this.auth.Authenticate(this.userName, this.userPassword);
    dt.then( (token: string) => this.loginSuccess(token))
      .catch((err: string) => this.loginFailure(err) );
   }
  }

  loginFailure(err: string) {
    this.error = err;
  }

  loginSuccess(token: string) {
    localStorage.setItem('token', token);
    this.router.navigate(['/home']);
  }

}
