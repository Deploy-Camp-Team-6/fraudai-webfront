import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonRouterOutlet,
  IonMenuButton,
  IonBadge,
} from '@ionic/angular/standalone';
import { ApiKeyService } from 'src/app/core/services/api-key.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonRouterOutlet,
    IonMenuButton,
    IonBadge,
  ],
})
export class LayoutPage {
  public apiKeyService = inject(ApiKeyService);
  public authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.signOut(false);
    this.router.navigate(['/']);
  }
}
