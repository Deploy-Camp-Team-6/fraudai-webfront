import { Component, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

type ChipColor = 'success' | 'warning' | 'danger' | 'neutral';

@Component({
  selector: 'app-stat-chip',
  templateUrl: './stat-chip.component.html',
  styleUrls: ['./stat-chip.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatChipComponent {
  @Input() color: ChipColor = 'neutral';

  @HostBinding('attr.data-color')
  get dataColor() {
    return this.color;
  }
}
