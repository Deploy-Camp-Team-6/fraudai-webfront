import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyButtonComponent } from '../copy-button/copy-button.component';

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss'],
  standalone: true,
  imports: [CommonModule, CopyButtonComponent],
})
export class CodeBlockComponent {
  @Input() code = '';
  @Input() language = 'typescript';
}
