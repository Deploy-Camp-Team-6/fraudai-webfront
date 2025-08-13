import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonSegment,
  IonSegmentButton,
} from '@ionic/angular/standalone';
import { SegmentValue } from '@ionic/angular';
import { ModelSelectorService } from 'src/app/core/services/model-selector.service';
import { ApiKeyService } from 'src/app/core/services/api-key.service';
import { CodeBlockComponent } from 'src/app/shared/components/code-block/code-block.component';
import { Subscription } from 'rxjs';
import { Model } from 'src/app/core/models/model.model';
import { environment } from 'src/environments/environment';
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
  public modelSelectorService = inject(ModelSelectorService);
  public apiKeyService = inject(ApiKeyService);

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
    this.subscriptions.add(
      this.modelSelectorService.selectedModel$.subscribe(model => {
        if (model) {
          this.generateSnippets(model, this.apiKeyService.getApiKey());
        }
      })
    );
    this.subscriptions.add(
      this.apiKeyService.isApiKeyActive$.subscribe(() => {
        this.generateSnippets(this.modelSelectorService.getSelectedModel(), this.apiKeyService.getApiKey());
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  generateSnippets(model: Model | null, apiKey: string | null) {
    if (!model) {
      return;
    }
    const endpoint = `${environment.apiBaseUrl}/v1/detect`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey || 'YOUR_API_KEY'}`,
    };
    const body = {
      model: model.id,
      data: {
        // Example data structure
        amount: 120.50,
        currency: 'USD',
        user_id: 'user-12345',
      },
    };

    const bodyString = JSON.stringify(body, null, 2);

    this.curlSnippet = `curl -X POST ${endpoint} \\\n-H "Content-Type: application/json" \\\n-H "Authorization: Bearer ${apiKey || 'YOUR_API_KEY'}" \\\n-d '${bodyString}'`;

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
data = ${bodyString}

response = requests.post(url, headers=headers, data=json.dumps(data))
print(response.json())`;
  }
}
