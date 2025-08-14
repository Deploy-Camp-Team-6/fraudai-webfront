import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ModalController,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonButtons,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

@Component({
  selector: 'app-generate-key-modal',
  templateUrl: './generate-key-modal.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonButtons,
  ],
})
export class GenerateKeyModalComponent {
  public name = '';
  private modalCtrl = inject(ModalController);

  constructor() {
    addIcons({ close });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss({ name: this.name }, 'confirm');
  }
}
