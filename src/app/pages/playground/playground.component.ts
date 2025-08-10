import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModelSelectorService } from 'src/app/core/services/model-selector.service';
import { Model } from 'src/app/core/models/model.model';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from '@ionic/angular/standalone';
import { CodeBlockComponent } from 'src/app/shared/components/code-block/code-block.component';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    CodeBlockComponent,
  ],
})
export class PlaygroundComponent {
  public modelSelectorService = inject(ModelSelectorService);
  public availableModels: Model[] = [];
  public selectedModelId: string | null = null;
  public requestBody = '{}';
  public responseBody = '';

  constructor() {
    this.availableModels = this.modelSelectorService.getAvailableModels();
    this.modelSelectorService.selectedModel$.subscribe(model => {
      this.selectedModelId = model?.id || null;
    });
  }

  onModelChange(event: any) {
    const modelId = event.detail.value;
    const selectedModel = this.availableModels.find(m => m.id === modelId);
    if (selectedModel) {
      this.modelSelectorService.setSelectedModel(selectedModel);
    }
  }

  runInference() {
    // Mock inference logic
    this.responseBody = JSON.stringify({
      model: this.modelSelectorService.getSelectedModel()?.name,
      version: this.modelSelectorService.getSelectedModel()?.version,
      fraud_score: Math.random().toFixed(4),
    }, null, 2);
  }
}
