import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  IonContent,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { AlertController, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, trash, eye, copyOutline } from 'ionicons/icons';
import { ToastService } from 'src/app/core/services/toast.service';
import { GenerateKeyModalComponent } from './generate-key-modal/generate-key-modal.component';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { Clipboard } from '@capacitor/clipboard';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface ApiKeyResponse {
  id: number;
  label: string;
  key: string;
  active: boolean;
  rate_rpm: number;
  last_used_at: string | null;
  created_at: string;
}

export interface ApiKey {
  label: string;
  key: string;
  prefix: string;
  createdAt: Date;
  lastUsedAt: Date | null;
}

@Component({
  selector: 'app-api-keys',
  templateUrl: './api-keys.component.html',
  styleUrls: ['./api-keys.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    IonContent,
    IonButton,
    IonIcon,
    CardComponent,
  ],
})
export class ApiKeysComponent implements OnInit {
  public apiKeys: ApiKey[] = [];

  private alertCtrl = inject(AlertController);
  private modalCtrl = inject(ModalController);
  private toastService = inject(ToastService);
  private http = inject(HttpClient);

  constructor() {
    addIcons({ add, trash, eye, copyOutline });
  }

  ngOnInit() {
    this.loadApiKeys();
  }

  private loadApiKeys() {
    this.http
      .get<ApiKeyResponse[]>(`${environment.apiBaseUrl}/v1/apikeys`)
      .subscribe({
        next: (keys) =>
          (this.apiKeys = keys.map((k) => ({
            label: k.label,
            key: k.key,
            prefix: this.maskKey(k.key),
            createdAt: new Date(k.created_at),
            lastUsedAt: k.last_used_at ? new Date(k.last_used_at) : null,
          })) ),
        error: () =>
          this.toastService.present({ message: 'Failed to load API keys', color: 'danger' }),
      });
  }

  private maskKey(key: string): string {
    return `${key.slice(0, 8)}...${key.slice(-4)}`;
  }

  async createKey() {
    const modal = await this.modalCtrl.create({
      component: GenerateKeyModalComponent,
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      const keyString = `sk_live_${Math.random().toString(36).substring(2)}`;
      const newKey: ApiKey = {
        label: data.name || 'New API Key',
        key: keyString,
        prefix: this.maskKey(keyString),
        createdAt: new Date(),
        lastUsedAt: null,
      };
      this.apiKeys = [...this.apiKeys, newKey];
      this.toastService.present({ message: 'API key created successfully', color: 'success' });
    }
  }

  async revokeKey(keyToRevoke: ApiKey) {
    const alert = await this.alertCtrl.create({
      header: 'Revoke API Key',
      message: `Are you sure you want to revoke the key "${keyToRevoke.label}"? This action is permanent.`,
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
