import { Injectable, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastController = inject(ToastController);

  async present(opts: { message: string, color?: string, duration?: number, position?: 'top' | 'bottom' | 'middle' }) {
    const toast = await this.toastController.create({
      message: opts.message,
      duration: opts.duration || 5000,
      color: opts.color || 'primary',
      position: opts.position || 'top',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
        }
      ]
    });
    await toast.present();
  }

  async presentError(message: string) {
    return this.present({ message, color: 'danger' });
  }
}
