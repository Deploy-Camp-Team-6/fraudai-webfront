import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
} from '@ionic/angular/standalone';
import { ApiKeyService, ApiKey } from '../services/api-key.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-api-keys',
  templateUrl: './api-keys.page.html',
  styleUrls: ['./api-keys.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonInput,
    FormsModule,
    NgFor,
  ],
})
export class ApiKeysPage implements OnInit {
  keys: ApiKey[] = [];
  newKeyName = '';
  private apiKeys = inject(ApiKeyService);

  constructor() {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.apiKeys.listKeys().subscribe((k) => (this.keys = k));
  }

  createKey() {
    if (!this.newKeyName) return;
    this.apiKeys.createKey(this.newKeyName).subscribe(() => {
      this.newKeyName = '';
      this.load();
    });
  }

  revoke(id: string) {
    this.apiKeys.revokeKey(id).subscribe(() => this.load());
  }

  regenerate(id: string) {
    this.apiKeys.regenerateKey(id).subscribe(() => this.load());
  }
}
