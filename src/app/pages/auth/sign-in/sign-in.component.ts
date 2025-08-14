import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonSpinner,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { BrandLogoComponent } from 'src/app/shared/components/brand-logo/brand-logo.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonSpinner,
    CardComponent,
    BrandLogoComponent,
  ],
})
export class SignInPage implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private returnUrl!: string;

  public form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  public loading = false;

  constructor() {
    addIcons({ mailOutline, lockClosedOutline });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || localStorage.getItem('redirectUrl') || '/playground';
    localStorage.removeItem('redirectUrl'); // Clean up old storage mechanism
  }

  signIn() {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.authService.signIn(this.form.getRawValue() as { email: string; password: string }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (err) => {
        this.loading = false;
        this.toastService.presentError('Sign in failed. Please check your credentials and try again.');
      },
    });
  }
}
