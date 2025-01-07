import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          observer.next(userCredential);
          observer.complete();
        })
        .catch((error) => {
            observer.error(error);
        });
    });
  }

  getUser() {
    return this.afAuth.authState;
  }

  createUser(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  register(email: string, password: string):Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
      const user = userCredential.user;
      if (user) {
        return user.sendEmailVerification().then(() => {
          return { success: true, message: 'User created and verification email sent.' };
        });
      } else {
        return { success: false, message: 'User creation failed.' };
      }
    }).catch((error) => {
      throw error;
    });
  }

  forgotPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  isEmailVerified() {
    return this.afAuth.currentUser.then(user => {
      return user?.emailVerified || false;
    });
  }
}
