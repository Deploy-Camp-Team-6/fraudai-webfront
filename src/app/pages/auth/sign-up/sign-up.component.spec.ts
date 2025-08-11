import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SignUpPage } from './sign-up.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';

describe('SignUpPage', () => {
  let component: SignUpPage;
  let fixture: ComponentFixture<SignUpPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SignUpPage, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: {} },
        { provide: ToastService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
