import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiKeysComponent } from './api-keys.component';
import { ToastService } from 'src/app/core/services/toast.service';

describe('ApiKeysComponent', () => {
  let component: ApiKeysComponent;
  let fixture: ComponentFixture<ApiKeysComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ApiKeysComponent],
      providers: [
        { provide: AlertController, useValue: { create: () => Promise.resolve({ present: () => Promise.resolve() }) } },
        { provide: ModalController, useValue: {} },
        { provide: ToastService, useValue: { present: () => Promise.resolve() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
