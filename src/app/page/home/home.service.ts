import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

}
