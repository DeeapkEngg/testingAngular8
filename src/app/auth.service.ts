import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token === '123' ? true : false;
  }

  public Authenticate(username: string, password: string){
       if (username && password) {
        const promise = new Promise((resolve, reject) => {
           if (username === 'admin' && password === 'admin') {
               resolve('123');
           }
           else {
             reject('Username and password is wrong');
           }
       });
        return promise;
      }
    }
}
