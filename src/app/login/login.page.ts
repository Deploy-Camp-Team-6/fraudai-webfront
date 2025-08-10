import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonList,
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonItem,
    IonList,
    FormsModule,
  ],
})
export class LoginPage {
  email = '';
  password = '';
  private auth = inject(AuthService);
  private router = inject(Router);

  constructor() {}

  login() {
    this.auth.login(this.email, this.password).subscribe(() => {
      this.router.navigateByUrl('/tabs');
    });
  }
}
