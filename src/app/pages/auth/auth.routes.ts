import { Routes } from '@angular/router';
import { SignInPage } from './sign-in/sign-in.component';
import { SignUpPage } from './sign-up/sign-up.component';

export const AUTH_ROUTES: Routes = [
  {
    path: 'sign-in',
    component: SignInPage,
    title: 'Fraud AI - Sign In',
  },
  {
    path: 'sign-up',
    component: SignUpPage,
    title: 'Fraud AI - Sign Up',
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
];
