import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButtons,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, trash, eye } from 'ionicons/icons';

@Component({
  selector: 'app-api-keys',
  templateUrl: './api-keys.component.html',
  styleUrls: ['./api-keys.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButtons,
  ],
})
export class ApiKeysComponent {
  public apiKeys = [
    { name: 'My First Key', prefix: 'sk_123...', createdAt: new Date(), lastUsed: new Date() },
    { name: 'Marketing Campaign Key', prefix: 'sk_abc...', createdAt: new Date(), lastUsed: new Date() },
    { name: 'Staging Environment Key', prefix: 'sk_xyz...', createdAt: new Date(), lastUsed: new Date() },
  ];

  constructor() {
    addIcons({ add, trash, eye });
  }

  createKey() {
    // Logic to open a dialog to create a new key
    console.log('Create new key');
  }

  revokeKey(key: any) {
    // Logic to revoke the key
    console.log('Revoke key', key);
  }
}
