import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { DocsPage } from './docs.component';
import { environment } from 'src/environments/environment';

describe('DocsPage', () => {
  let component: DocsPage;
  let fixture: ComponentFixture<DocsPage>;
  let httpMock: HttpTestingController;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DocsPage],
        providers: [provideHttpClient(), provideHttpClientTesting()],
      }).compileComponents();

      httpMock = TestBed.inject(HttpTestingController);

      fixture = TestBed.createComponent(DocsPage);
      httpMock
        .expectOne(`${environment.apiBaseUrl}/v1/inference/models`)
        .flush({ models: [] });

      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
