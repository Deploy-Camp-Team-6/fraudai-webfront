import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmark, copyOutline } from 'ionicons/icons';
import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-copy-button',
  templateUrl: './copy-button.component.html',
  styleUrls: ['./copy-button.component.scss'],
  standalone: true,
  imports: [CommonModule, IonButton, IonIcon],
})
export class CopyButtonComponent {
  @Input() textToCopy = '';
  public copied = false;

  constructor() {
    addIcons({ checkmark, copyOutline });
  }

  async copy() {
    if (!this.textToCopy) {
      return;
    }
    await Clipboard.write({
      string: this.textToCopy,
    });
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 2000);
  }
}
