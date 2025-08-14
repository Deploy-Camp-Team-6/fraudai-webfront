import { Component, inject, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ModelSelectorService } from 'src/app/core/services/model-selector.service';
import { Model } from 'src/app/core/models/model.model';
import {
  IonContent,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonList,
  IonButton,
  IonIcon,
  IonSpinner,
  IonSegment,
  IonSegmentButton,
  IonTextarea,
} from '@ionic/angular/standalone';
import { CodeBlockComponent } from 'src/app/shared/components/code-block/code-block.component';
import { Subscription } from 'rxjs';
import { CardComponent } from '../../shared/components/card/card.component';
import { StatChipComponent } from '../../shared/components/stat-chip/stat-chip.component';
import { ApiKeyService } from 'src/app/core/services/api-key.service';
import { addIcons } from 'ionicons';
import { playOutline, refreshOutline, documentTextOutline } from 'ionicons/icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonList,
    IonButton,
    IonIcon,
    IonSpinner,
    IonSegment,
    IonSegmentButton,
    IonTextarea,
    CodeBlockComponent,
    CardComponent,
    StatChipComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent implements OnInit, OnDestroy {
  public modelSelectorService = inject(ModelSelectorService);
  public apiKeyService = inject(ApiKeyService);
  private http = inject(HttpClient);

  public availableModels: Model[] = [];
  public selectedModelId: string | null = null;
  public requestBody = '{\n  "amount": 120.50,\n  "currency": "USD",\n  "user_id": "user-12345"\n}';
  public responseBody = '';
  public responseStatus = '';
  public responseLatency = 0;
  public responseTab: 'pretty' | 'raw' = 'pretty';
  public isLoading = false;
  private sub = new Subscription();

  constructor() {
    addIcons({ playOutline, refreshOutline, documentTextOutline });
  }

  ngOnInit(): void {
    this.sub.add(
      this.modelSelectorService.availableModels$.subscribe(models => {
        this.availableModels = models;
      })
    );

    this.sub.add(
      this.modelSelectorService.selectedModel$.subscribe(model => {
        this.selectedModelId = model?.id || null;
      })
    );
  }

  onModelChange(event: any) {
    const modelId = event.detail.value as string;
    const selectedModel = this.availableModels.find(m => m.id === modelId);
    if (selectedModel) {
      this.modelSelectorService.setSelectedModel(selectedModel);
    }
  }

  runInference() {
    this.isLoading = true;
    this.responseBody = '';
    this.responseStatus = '';
    this.responseLatency = 0;

    let features: any;
    try {
      features = JSON.parse(this.requestBody);
    } catch (e) {
      this.responseStatus = 'Invalid JSON';
      this.responseBody = e instanceof Error ? e.message : String(e);
      this.isLoading = false;
      return;
    }

    const payload = {
      model: this.modelSelectorService.getSelectedModel()?.id,
      features,
    };

    const startTime = Date.now();

    if (environment.useMock) {
      setTimeout(() => {
        const endTime = Date.now();
        this.responseLatency = endTime - startTime;
        this.responseStatus = '200 OK';
        this.responseBody = JSON.stringify(
          {
            id: `asdf-${Math.random().toString(36).substring(2, 9)}`,
            model: payload.model,
            created: Math.floor(Date.now() / 1000),
            provider: 'fraud-ai',
            score: parseFloat(Math.random().toFixed(4)),
            assessment: {
              risk: Math.random() > 0.5 ? 'high' : 'low',
              reasons: ['Unusual transaction amount', 'New device ID'],
            },
          },
          null,
          2,
        );
        this.isLoading = false;
      }, 800 + Math.random() * 500);
      return;
    }

    this.sub.add(
      this.http
        .post(`${environment.apiBaseUrl}/v1/inference/predict`, payload, { observe: 'response' })
        .subscribe({
          next: res => {
            const endTime = Date.now();
            this.responseLatency = endTime - startTime;
            this.responseStatus = `${res.status} ${res.statusText}`;
            this.responseBody = JSON.stringify(res.body, null, 2);
            this.isLoading = false;
          },
          error: err => {
            const endTime = Date.now();
            this.responseLatency = endTime - startTime;
            this.responseStatus = err.status ? `${err.status} ${err.statusText || ''}` : 'Error';
            this.responseBody = err.error
              ? typeof err.error === 'string'
                ? err.error
                : JSON.stringify(err.error, null, 2)
              : err.message;
            this.isLoading = false;
          },
        }),
    );
  }

  clear() {
    this.responseBody = '';
    this.responseStatus = '';
    this.responseLatency = 0;
  }

  loadExample() {
    this.requestBody = JSON.stringify(
      {
        amount: 99.99,
        currency: 'EUR',
        user_id: 'user-67890',
        metadata: {
          device_id: 'abc-123',
          ip_address: '123.45.67.89',
        },
      },
      null,
      2,
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
