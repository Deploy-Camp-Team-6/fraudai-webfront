import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
  IonItem,
} from '@ionic/angular/standalone';
import { ModelService, ModelInfo } from '../services/model.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.page.html',
  styleUrls: ['./playground.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonButton,
    IonItem,
    FormsModule,
    NgFor,
    NgIf,
  ],
})
export class PlaygroundPage implements OnInit {
  models: ModelInfo[] = [];
  selectedModel = '';
  input = '';
  output = '';

  private modelService = inject(ModelService);

  constructor() {}

  ngOnInit() {
    this.modelService.getModels().subscribe((models) => {
      this.models = models;
      if (models.length) {
        this.selectedModel = models[0].id;
      }
    });
  }

  run() {
    if (!this.selectedModel || !this.input) {
      return;
    }
    this.modelService.runInference(this.selectedModel, this.input).subscribe((res) => {
      this.output = res.output;
    });
  }
}
