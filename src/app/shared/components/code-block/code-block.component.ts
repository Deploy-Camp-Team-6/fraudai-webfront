import { Component, Input, AfterViewInit, OnChanges, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
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
export class CodeBlockComponent implements AfterViewInit, OnChanges, AfterViewChecked {
  @Input() code = '';
  @Input() language = 'typescript';
  @ViewChild('codeElement') codeElement?: ElementRef<HTMLElement>;

  private needsHighlight = false;

  ngAfterViewInit() {
    this.needsHighlight = true;
  }

  ngOnChanges() {
    this.needsHighlight = true;
  }

  ngAfterViewChecked() {
    if (this.needsHighlight) {
      this.highlight();
      this.needsHighlight = false;
    }
  }

  private highlight() {
    if (this.codeElement) {
      this.codeElement.nativeElement.textContent = this.code;
      hljs.highlightElement(this.codeElement.nativeElement);
    }
  }
}
