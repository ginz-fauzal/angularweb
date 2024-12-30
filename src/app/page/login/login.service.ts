import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  // async login(email: string, password: string) {
  //   try {
  //     const result = await this.afAuth.signInWithEmailAndPassword(email, password);
  //     console.log('Login Berhasil:', result);
  //     this.router.navigate(['/home']);
  //   } catch (error) {
  //     console.error('Error saat login:', error);
  //   }
  // }

  login(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          observer.next(userCredential);
          observer.complete();
        })
        .catch((error) => {
          if (error.code === 'auth/user-not-found') {
            // Jika user tidak ditemukan, buat akun baru
            this.createUser(email, password).subscribe(observer);
          } else {
            observer.error(error);
          }
        });
    });
  }

  getUser() {
    return this.afAuth.authState;
  }

  createUser(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          observer.next(userCredential);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
