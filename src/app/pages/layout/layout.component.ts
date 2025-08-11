import { Component } from '@angular/core';
import { IonContent, IonRouterOutlet } from '@ionic/angular/standalone';
import { LayoutHeaderComponent } from './layout-header.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [IonContent, IonRouterOutlet, LayoutHeaderComponent],
})
export class LayoutPage {}

