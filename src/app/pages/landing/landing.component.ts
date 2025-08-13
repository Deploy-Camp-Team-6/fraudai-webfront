import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonIcon,
} from '@ionic/angular/standalone';
import { CardComponent } from '../../shared/components/card/card.component';
import { addIcons } from 'ionicons';
import { shieldCheckmarkOutline, codeSlashOutline, analyticsOutline, serverOutline, documentTextOutline, flashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonContent,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonIcon,
    CardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPage {
  constructor() {
    addIcons({ shieldCheckmarkOutline, codeSlashOutline, analyticsOutline, serverOutline, documentTextOutline, flashOutline });
  }
}
