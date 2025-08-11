import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LayoutPage } from './layout.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { ApiKeyService } from 'src/app/core/services/api-key.service';

describe('LayoutPage', () => {
  let component: LayoutPage;
  let fixture: ComponentFixture<LayoutPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LayoutPage, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: { signOut: () => {} } },
        { provide: ApiKeyService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
