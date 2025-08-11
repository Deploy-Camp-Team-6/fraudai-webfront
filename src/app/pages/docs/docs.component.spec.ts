import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocsPage } from './docs.component';

describe('DocsPage', () => {
  let component: DocsPage;
  let fixture: ComponentFixture<DocsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DocsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DocsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
