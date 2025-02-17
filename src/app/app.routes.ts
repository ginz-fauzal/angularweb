import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { NotfoundComponent } from './page/notfound/notfound.component';

import { AuthGuard } from './auth/auth.guard';


export const routes: Routes = [
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
    { path: '**', component: NotfoundComponent },
];
