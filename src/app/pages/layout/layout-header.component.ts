import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';

import { AuthService } from 'src/app/core/services/auth.service';
import { ApiKeyService } from 'src/app/core/services/api-key.service';
import { BrandLogoComponent } from 'src/app/shared/components/brand-logo/brand-logo.component';
import { ThemeToggleComponent } from 'src/app/shared/components/theme-toggle/theme-toggle.component';
import { addIcons } from 'ionicons';
import { logInOutline, logOutOutline, keyOutline } from 'ionicons/icons';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonButton,
    IonIcon,
    BrandLogoComponent,
    ThemeToggleComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutHeaderComponent {
  public authService = inject(AuthService);
  public apiKeyService = inject(ApiKeyService);
  private router = inject(Router);

  constructor() {
    addIcons({ logInOutline, logOutOutline, keyOutline });
  }

  logout() {
    this.authService.signOut();
    this.router.navigate(['/']);
  }
}
