import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, trash, eye } from 'ionicons/icons';
import { ToastService } from 'src/app/core/services/toast.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

export interface ApiKey {
  name: string;
  prefix: string;
  createdAt: Date;
  lastUsed: Date;
}

@Component({
  selector: 'app-api-keys',
  templateUrl: './api-keys.component.html',
  styleUrls: ['./api-keys.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ApiKeysComponent {
  public apiKeys: ApiKey[] = [
    { name: 'My First Key', prefix: 'sk_123...', createdAt: new Date(), lastUsed: new Date() },
    { name: 'Marketing Campaign Key', prefix: 'sk_abc...', createdAt: new Date(), lastUsed: new Date() },
    { name: 'Staging Environment Key', prefix: 'sk_xyz...', createdAt: new Date(), lastUsed: new Date() },
  ];

  private alertController = inject(AlertController);
  private toastService = inject(ToastService);

  constructor() {
    addIcons({ add, trash, eye });
  }

  async createKey() {
    const alert = await this.alertController.create({
      header: 'Create API Key',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Key name',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Create',
          handler: (data) => {
            const newKey: ApiKey = {
              name: data.name || 'New API Key',
              prefix: `sk_${Math.random().toString(36).substring(2, 8)}...`,
              createdAt: new Date(),
              lastUsed: new Date(),
            };
            this.apiKeys.push(newKey);
            this.toastService.present({ message: 'API key created' });
          },
        },
      ],
    });

    await alert.present();
  }

  revokeKey(key: ApiKey) {
    this.apiKeys = this.apiKeys.filter(k => k !== key);
    this.toastService.present({ message: 'API key revoked' });
  }
}
