import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImportsModule } from '../../import/import';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  imports: [ImportsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  email: string = '';
  password: string = '';
  formType=1;

  constructor(
    private router: Router,
    private loginService:LoginService
  ) {
    
  }

  changeForm(index:number){
    this.formType=index;
    console.log(this.formType)
  }

  ngOnInit(): void {
    this.loginService.getUser().subscribe((user) => {
      if (user) {
        console.log('User is logged in:', user.email);
        this.router.navigate(['/home']);
      }
    });
  }

  login() {
    this.loginService.login(this.email, this.password).subscribe(
      (userCredential) => {
        console.log('User logged in:', userCredential);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  create(){
    this.loginService.createUser(this.email, this.password)
      .then((userCredential) => {
        console.log('User created:', userCredential);
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  }

  onRegister() {
    this.loginService.register(this.email, this.password)
      .then((result) => {
        if (result.success) {
          console.log(result.message);
        }
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  }

  forgotPassword() {
    this.loginService.forgotPassword(this.email)
      .then(() => {
      })
      .catch((err) => {
        console.error('Error creating user:', err);
      });
  }

}
