import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { MetricsService, UsageMetrics } from '../services/metrics.service';
import { NgIf } from '@angular/common';
import { inject } from '@angular/core';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.page.html',
  styleUrls: ['./metrics.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, NgIf],
})
export class MetricsPage implements OnInit {
  metrics: UsageMetrics | null = null;
  private metricsService = inject(MetricsService);

  constructor() {}

  ngOnInit() {
    this.metricsService.getMetrics().subscribe((m) => (this.metrics = m));
  }
}
