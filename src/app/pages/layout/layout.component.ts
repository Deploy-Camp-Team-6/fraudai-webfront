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
  IonIcon,
} from '@ionic/angular/standalone';
import { ApiKeyService } from 'src/app/core/services/api-key.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { addIcons } from 'ionicons';
import { moon, sunny } from 'ionicons/icons';

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
    IonIcon,
  ],
})
export class LayoutPage {
  public apiKeyService = inject(ApiKeyService);
  public authService = inject(AuthService);
  public themeService = inject(ThemeService);
  private router = inject(Router);

  constructor() {
    addIcons({ moon, sunny });
  }

  logout() {
    this.authService.signOut(false);
    this.router.navigate(['/']);
  }

  toggleTheme() {
    this.themeService.toggle();
  }
}
