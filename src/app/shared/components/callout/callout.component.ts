import { Component, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { informationCircleOutline, warningOutline, checkmarkCircleOutline } from 'ionicons/icons';

type CalloutType = 'info' | 'warn' | 'success';

@Component({
  selector: 'app-callout',
  templateUrl: './callout.component.html',
  styleUrls: ['./callout.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalloutComponent {
  @Input() type: CalloutType = 'info';

  @HostBinding('attr.data-type')
  get dataType() {
    return this.type;
  }

  get iconName(): string {
    switch (this.type) {
      case 'warn':
        return 'warning-outline';
      case 'success':
        return 'checkmark-circle-outline';
      case 'info':
      default:
        return 'information-circle-outline';
    }
  }

  constructor() {
    addIcons({ informationCircleOutline, warningOutline, checkmarkCircleOutline });
  }
}
