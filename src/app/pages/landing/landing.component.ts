import { Component, HostBinding, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonFooter,
  IonToolbar,
  IonTitle,
} from '@ionic/angular/standalone';
import { ThemeService } from 'src/app/core/services/theme.service';
import { addIcons } from 'ionicons';
import { analyticsOutline, shieldCheckmarkOutline, pulseOutline } from 'ionicons/icons';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonContent,
    IonButton,
    IonIcon,
    IonFooter,
    IonToolbar,
    IonTitle,
  ],
})
export class LandingPage implements OnInit {
  @HostBinding('class.dark') isDark = false;

  constructor(private themeService: ThemeService) {
    addIcons({ analyticsOutline, shieldCheckmarkOutline, pulseOutline });
  }

  ngOnInit() {
    this.themeService.isDark$.subscribe((isDark) => {
      this.isDark = isDark;
    });
  }
}
