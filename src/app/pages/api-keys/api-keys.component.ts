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
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  id: number;
  label: string;
  key: string;
  prefix: string;
  createdAt: Date;
  lastUsedAt: Date | null;
}

interface CreateApiKeyResponse {
  details: {
    id: number;
    user_id: number;
    label: string;
    active: boolean;
    rate_rpm: number;
    created_at: string;
  };
  key: string;
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
            id: k.id,
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

    if (role === 'confirm' && data?.name) {
      this.http
        .post<CreateApiKeyResponse>(`${environment.apiBaseUrl}/v1/apikeys`, {
          label: data.name,
        })
        .subscribe({
          next: async (res) => {
            const keyString = res.key;
            const details = res.details;
            const newKey: ApiKey = {
              id: details.id,
              label: details.label,
              key: keyString,
              prefix: this.maskKey(keyString),
              createdAt: new Date(details.created_at),
              lastUsedAt: null,
            };
            this.apiKeys = [...this.apiKeys, newKey];
            await this.presentKeyAlert(keyString);
            this.toastService.present({
              message: 'API key created successfully',
              color: 'success',
            });
          },
          error: () =>
            this.toastService.present({
              message: 'Failed to create API key',
              color: 'danger',
            }),
        });
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
            this.http
              .delete(`${environment.apiBaseUrl}/v1/apikeys/${keyToRevoke.id}`)
              .subscribe({
                next: () => {
                  this.apiKeys = this.apiKeys.filter(
                    (k) => k.id !== keyToRevoke.id,
                  );
                  this.toastService.present({
                    message: 'API key revoked',
                    color: 'danger',
                  });
                },
                error: (error: HttpErrorResponse) => {
                  let message = 'Failed to revoke API key';
                  if (error.status === 404) {
                    message = 'API key not found';
                  } else if (error.status === 401) {
                    message = 'Unauthorized';
                  }
                  this.toastService.present({ message, color: 'danger' });
                },
              });
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

  private async presentKeyAlert(key: string) {
    const alert = await this.alertCtrl.create({
      header: 'API Key Created',
      message: `Please copy and store your new API key:<br><code>${key}</code>`,
      buttons: [
        {
          text: 'Copy',
          handler: () => this.copyKey(key),
        },
        { text: 'Close', role: 'cancel' },
      ],
    });
    await alert.present();
  }
}
