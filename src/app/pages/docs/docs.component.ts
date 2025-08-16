import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonSegment,
  IonSegmentButton,
} from '@ionic/angular/standalone';
import { SegmentValue } from '@ionic/angular';
import { ApiKeyService } from 'src/app/core/services/api-key.service';
import { CodeBlockComponent } from 'src/app/shared/components/code-block/code-block.component';
import { Subscription } from 'rxjs';
import { Model } from 'src/app/core/models/model.model';
import { CalloutComponent } from 'src/app/shared/components/callout/callout.component';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonSegment,
    IonSegmentButton,
    CodeBlockComponent,
    CalloutComponent,
  ],
})
export class DocsPage implements OnDestroy {
  public apiKeyService = inject(ApiKeyService);

  private readonly exampleModel: Model = {
    id: 'example-fraud-model',
    model_type: 'xgboost',
    name: 'Example Fraud Model',
    version: '1.0.0',
    stage: 'production',
    run_id: 'example-run-id',
    signature_inputs: ['transaction_id', 'amount', 'merchant_type', 'device_type'],
  };

  public sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'authentication', title: 'Authentication' },
    { id: 'api-reference', title: 'API Reference' },
    { id: 'errors', title: 'Errors' },
    { id: 'sdk-libs', title: 'SDKs & Libraries' },
  ];

  public curlSnippet = '';
  public fetchSnippet = '';
  public pythonSnippet = '';
  public selectedLanguage: SegmentValue = 'curl';

  private subscriptions = new Subscription();

  constructor() {
    this.generateSnippets(this.apiKeyService.getApiKey());
    this.subscriptions.add(
      this.apiKeyService.isApiKeyActive$.subscribe(() => {
        this.generateSnippets(this.apiKeyService.getApiKey());
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  generateSnippets(apiKey: string | null) {
    const model = this.exampleModel;
    const endpoint = 'https://api.fraudai.cloud/v1/fraud/predict';
    const headers = {
      'Content-Type': 'application/json',
        'x-api-key': apiKey || 'YOUR_API_KEY',
      };
      const body = {
        model: model.id,
        features: {
          transaction_id: 9876543210,
          amount: 200.12,
          merchant_type: 'electronics',
          device_type: 'laptop',
        },
      };

      const bodyString = JSON.stringify(body);

      this.curlSnippet = `curl -X POST '${endpoint}' \\
  -H 'Content-Type: application/json' \\
  -H 'x-api-key: ${apiKey || 'YOUR_API_KEY'}' \\
  -d '${bodyString}'`;

      this.fetchSnippet = `fetch('${endpoint}', {
  method: 'POST',
  headers: ${JSON.stringify(headers, null, 2)},
  body: JSON.stringify(${JSON.stringify(body, null, 2)})
})
.then(response => response.json())
.then(data => console.log(data));`;

      this.pythonSnippet = `import requests
import json

url = "${endpoint}"
headers = ${JSON.stringify(headers, null, 2)}
data = ${JSON.stringify(body, null, 2)}

response = requests.post(url, headers=headers, data=json.dumps(data))
print(response.json())`;
    }
}
