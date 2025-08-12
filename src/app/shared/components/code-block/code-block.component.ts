import { Component, Input, AfterViewInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyButtonComponent } from '../copy-button/copy-button.component';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss'],
  standalone: true,
  imports: [CommonModule, CopyButtonComponent],
})
export class CodeBlockComponent implements AfterViewInit, OnChanges {
  @Input() code = '';
  @Input() language = 'typescript';
  @ViewChild('codeElement') codeElement?: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    this.highlight();
  }

  ngOnChanges() {
    this.highlight();
  }

  private highlight() {
    setTimeout(() => {
      if (this.codeElement) {
        hljs.highlightElement(this.codeElement.nativeElement);
      }
    });
  }
}
