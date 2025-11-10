

## 📦 Installation and oktoflow- integration:

### Install via npm:  npm install oktoflow-transex --force

####### Create html file in the new component, as in this Xpath managementUI\src\app\components\editor\inputControls\expression-input\expression-input.component.html
<div class="expression-input-wrapper">
  <lib-expression-editor
    [(ngModel)]="expressionValue"
    [simpleMode]="true"
    [editorConfig]="limitedConnectorConfig"
    [placeholder]="'Enter expression...'"
    [textareaStyle]="textareaStyle"
    (binaryTreeChange)="onBinaryTreeChange($event)"
    >
  </lib-expression-editor>
</div>

##### and in component ts file managementUI\src\app\components\editor\inputControls\expression-input\expression-input.component.ts

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { editorInput } from 'src/interfaces';
import { DataType, ContextType } from 'oktoflow-transex';

@Component({
  selector: 'app-expression-input',
  templateUrl: './expression-input.component.html',
  styleUrls: [],
  standalone: false
})
export class ExpressionInputComponent implements OnInit {

  @Input() input: editorInput | undefined;
  @Output() valueChange = new EventEmitter<string>();

  expressionValue: string = '';
  
  // Limited Connector Context configuration
  limitedConnectorConfig = {
    contextType: ContextType.LIMITED_CONNECTOR,
    expectedResultType: DataType.REAL,
    allowDivision: false
  };

  // Textarea style configuration matching the image
  textareaStyle = {
    borderColor: '#4a90a4',
    focusBorderColor: '#357a8a',
    validBorderColor: '#28a745',
    errorBorderColor: '#dc3545',
    borderRadius: '4px',
    fontSize: '14px',
    padding: '8px 12px'
  };

  constructor() { }

  ngOnInit(): void {
    if (this.input && this.input.value) {
      this.expressionValue = String(this.input.value);
    }
  }

  /**
   * Handles binary tree changes from TransEx editor.
   * Logs the abstract syntax tree to browser console for debugging.
   */
  onBinaryTreeChange(binaryTreeResult: any): void {
    if (binaryTreeResult?.success && binaryTreeResult.tree) {
      console.log('🌳 Expression AST');
      console.log('Tree:', binaryTreeResult.tree);
      console.log('JSON:', JSON.stringify(binaryTreeResult.tree, null, 2));
    }
  }

}

##### and in app.module.ts in managementUI\src\app\app.module.ts
import { ExpressionInputComponent } from './components/editor/inputControls/expression-input/expression-input.component';
import { ExpressionEditorComponent } from 'oktoflow-transex';
Then add  ExpressionInputComponent in the declarations array, and in the bootstrap array add
ExpressionEditorComponent], providers: [{
            provide: HTTP_INTERCEPTORS,
            useClass: Interceptor,
            multi: true,
        },
######

-- Then add in line 197 in editor.component.html in managementUI\src\app\components\editor\editor.component.html
 <!-- Separate Expression Editor Card in Optionals-->
          <mat-card appearance="outlined" class="inputBox custom" *ngIf="input.name && input.name.toLowerCase() === 'description'">
            <p class="inputLabel">Expression Editor (Limited Connector Context)</p>
            <app-expression-input [input]="input"></app-expression-input>
          </mat-card>
        </div>
```bash



🚀 Quick Start
1. Import the Component
Since OktoFlow TransEx uses standalone components, import directly into your component:

import { Component } from '@angular/core';
import { ExpressionEditorComponent } from 'oktoflow-transex';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ExpressionEditorComponent],
  template: `
    <lib-expression-editor
      [(ngModel)]="expression"
      [editorConfig]="config">
    </lib-expression-editor>
  `
})
export class AppComponent {
  expression = '';
  config = {
    expectedResultType: 'Boolean',
    contextType: 'boolean',
    title: 'Condition Builder',
    description: 'Enter a boolean expression'
  };
}   
###########################################
📖 Usage Examples
###########################################
###########################################
Complete Working Example
###########################################
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpressionEditorComponent, ExpressionEvaluatorService, DataType } from 'oktoflow-transex';

@Component({
  selector: 'app-complete-example',
  standalone: true,
  imports: [FormsModule, ExpressionEditorComponent],
  template: `
    <div class="container">
      <h1>OktoFlow TransEx Demo</h1>
      
      <!-- Boolean Context -->
      <section>
        <h2>Boolean Expression (Guard)</h2>
        <lib-expression-editor
          [(ngModel)]="booleanExpr"
          [editorConfig]="booleanConfig"
          (validationChange)="onBooleanValidation($event)">
        </lib-expression-editor>
        <p class="status" [class.valid]="booleanValid">
          {{ booleanValid ? '✓ Valid' : '✗ Invalid' }}
        </p>
      </section>

      <!-- Assignment Context -->
      <section>
        <h2>Assignment Expression (Data Mapping)</h2>
        <lib-expression-editor
          [(ngModel)]="assignmentExpr"
          [editorConfig]="assignmentConfig"
          (binaryTreeChange)="onTreeGenerated($event)">
        </lib-expression-editor>
        <details>
          <summary>View Generated AST</summary>
          <pre>{{ astJson }}</pre>
        </details>
      </section>

      <!-- Arithmetic Context -->
      <section>
        <h2>Arithmetic Expression</h2>
        <lib-expression-editor
          [(ngModel)]="arithmeticExpr"
          [editorConfig]="arithmeticConfig">
        </lib-expression-editor>
      </section>

      <!-- Simple Mode -->
      <section>
        <h2>Simple Mode</h2>
        <lib-expression-editor
          [(ngModel)]="simpleExpr"
          [simpleMode]="true"
          [placeholder]="'Enter expression...'"
          [editorConfig]="simpleConfig">
        </lib-expression-editor>
      </section>
    </div>
  `,
  styles: [`
    .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
    section { margin-bottom: 40px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
    h1 { color: #007bff; }
    h2 { color: #333; margin-bottom: 15px; }
    .status { font-weight: bold; margin-top: 10px; }
    .status.valid { color: #28a745; }
    pre { background: #f8f9fa; padding: 15px; border-radius: 4px; overflow-x: auto; }
  `]
})
export class CompleteExampleComponent {
  // Boolean
  booleanExpr = 'temperature > 25 && status == "active"';
  booleanConfig: any;
  booleanValid = false;

  // Assignment
  assignmentExpr = 'output.value = input.data * 2';
  assignmentConfig: any;
  astJson = '';

  // Arithmetic
  arithmeticExpr = '(price * quantity) - discount';
  arithmeticConfig: any;

  // Simple
  simpleExpr = '';
  simpleConfig: any;

  constructor(private evaluator: ExpressionEvaluatorService) {
    this.booleanConfig = this.evaluator.getBooleanConfig();
    this.assignmentConfig = this.evaluator.getAssignmentConfig();
    this.arithmeticConfig = this.evaluator.getArithmeticConfig();
    this.simpleConfig = {
      expectedResultType: DataType.ANY,
      contextType: 'general'
    };
  }

  onBooleanValidation(result: any) {
    this.booleanValid = result?.isValid || false;
  }

  onTreeGenerated(tree: any) {
    if (tree && tree.success) {
      this.astJson = JSON.stringify(tree.tree, null, 2);
    }
  }
}

###########################################
🎨 Styling & Customization
Custom Textarea Styling
###########################################
import { Component } from '@angular/core';
import { ExpressionEditorComponent, TextareaStyleConfig } from 'oktoflow-transex';

@Component({
  selector: 'app-styled-editor',
  standalone: true,
  imports: [ExpressionEditorComponent],
  template: `
    <lib-expression-editor
      [(ngModel)]="expression"
      [textareaStyle]="customStyle"
      [editorConfig]="config">
    </lib-expression-editor>
  `
})
export class StyledEditorComponent {
  expression = '';
  config = { expectedResultType: 'Boolean', contextType: 'boolean' };
  
  customStyle: TextareaStyleConfig = {
    borderColor: '#007bff',
    focusBorderColor: '#0056b3',
    errorBorderColor: '#dc3545',
    validBorderColor: '#28a745',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '14px',
    fontFamily: 'monospace',
    backgroundColor: '#f8f9fa',
    textColor: '#212529',
    minHeight: '100px'
  };
}
