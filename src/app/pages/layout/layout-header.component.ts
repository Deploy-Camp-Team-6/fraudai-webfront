import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonBadge,
  IonToggle,
  IonIcon,
} from '@ionic/angular/standalone';
import { ApiKeyService } from 'src/app/core/services/api-key.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-layout-header',
  standalone: true,
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss'],
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonMenuButton,
    IonBadge,
    IonToggle,
    IonIcon,
  ],
})
export class LayoutHeaderComponent {
  apiKeyService = inject(ApiKeyService);
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  private router = inject(Router);

  logout() {
    this.authService.signOut(false);
    this.router.navigate(['/']);
  }

  toggleTheme(event: CustomEvent) {
    this.themeService.toggleDarkTheme(event.detail.checked);
  }
}

