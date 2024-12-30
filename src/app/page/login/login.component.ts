import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImportsModule } from '../../import/import';

import { LoginService } from './login.service';
// import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  imports: [ImportsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  // private auth = inject(Auth);

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private loginService:LoginService
  ) {
    
  }
  ngOnInit(): void {
    this.loginService.getUser().subscribe((user) => {
      if (user) {
        // Redirect jika user sudah login
        console.log('User is logged in:', user.email);
        this.router.navigate(['/home']);
      }
    });
  }

  login() {
    this.loginService.login(this.email, this.password).subscribe(
      (userCredential) => {
        // Login berhasil
        console.log('User logged in:', userCredential);
        this.router.navigate(['/home']);

        // Redirect atau proses lebih lanjut sesuai kebutuhan
      },
      (error) => {
        // Tampilkan pesan error jika ada
        this.errorMessage = error.message;
        console.log('Error:', error);
      }
    );
  }

}
