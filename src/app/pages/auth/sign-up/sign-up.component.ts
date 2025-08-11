import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonSpinner,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonSpinner,
  ],
})
export class SignUpPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  public form = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordMatchValidator }
  );
  public loading = false;

  private passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  signUp() {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    const { name, email, password } = this.form.getRawValue();
    this.authService
      .signUp({ name: name!, email: email!, password: password! })
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigateByUrl('/playground');
        },
        error: () => {
          this.loading = false;
          this.toastService.presentError(
            'Sign up failed. Please check your details and try again.'
          );
        },
      });
  }
}
