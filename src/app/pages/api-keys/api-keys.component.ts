import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonButtons,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { AlertController, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, trash, eye, copyOutline } from 'ionicons/icons';
import { ToastService } from 'src/app/core/services/toast.service';
import { GenerateKeyModalComponent } from './generate-key-modal/generate-key-modal.component';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { Clipboard } from '@capacitor/clipboard';

export interface ApiKey {
  name: string;
  key: string;
  prefix: string;
  scopes: string[];
  createdAt: Date;
  lastUsed: Date | null;
}

@Component({
  selector: 'app-api-keys',
  templateUrl: './api-keys.component.html',
  styleUrls: ['./api-keys.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonButtons,
    IonList,
    IonItem,
    IonLabel,
    CardComponent,
  ],
})
export class ApiKeysComponent {
  public apiKeys: ApiKey[] = [
    { name: 'My First Key', key: 'sk_live_123abcde', prefix: 'sk_live_...', scopes: ['read', 'write'], createdAt: new Date(), lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 24) },
    { name: 'Marketing Campaign Key', key: 'sk_live_456fghij', prefix: 'sk_live_...', scopes: ['read'], createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), lastUsed: null },
  ];

  private alertCtrl = inject(AlertController);
  private modalCtrl = inject(ModalController);
  private toastService = inject(ToastService);

  constructor() {
    addIcons({ add, trash, eye, copyOutline });
  }

  async createKey() {
    const modal = await this.modalCtrl.create({
      component: GenerateKeyModalComponent,
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      const newKey: ApiKey = {
        name: data.name || 'New API Key',
        key: `sk_live_${Math.random().toString(36).substring(2)}`,
        prefix: `sk_live_...${Math.random().toString(36).substring(9, 13)}`,
        scopes: data.scopes,
        createdAt: new Date(),
        lastUsed: null,
      };
      this.apiKeys = [...this.apiKeys, newKey];
      this.toastService.present({ message: 'API key created successfully', color: 'success' });
    }
  }

  async revokeKey(keyToRevoke: ApiKey) {
    const alert = await this.alertCtrl.create({
      header: 'Revoke API Key',
      message: `Are you sure you want to revoke the key "${keyToRevoke.name}"? This action is permanent.`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Revoke',
          role: 'destructive',
          handler: () => {
            this.apiKeys = this.apiKeys.filter(k => k.key !== keyToRevoke.key);
            this.toastService.present({ message: 'API key revoked', color: 'danger' });
          },
        },
      ],
    });
    await alert.present();
  }

  async copyKey(key: string) {
    await Clipboard.write({ string: key });
    this.toastService.present({ message: 'API key copied to clipboard' });
  }
}
