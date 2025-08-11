import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LayoutPage } from './layout.component';

describe('LayoutPage', () => {
  let component: LayoutPage;
  let fixture: ComponentFixture<LayoutPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [LayoutPage, RouterTestingModule, HttpClientTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(LayoutPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

