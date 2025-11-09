import * as i0 from '@angular/core';
import { Input, Component, EventEmitter, Output, forwardRef, ViewChild, Injectable } from '@angular/core';
import * as i2 from '@angular/forms';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

var DataType;
(function (DataType) {
    DataType["BOOLEAN"] = "Boolean";
    DataType["INTEGER"] = "Integer";
    DataType["REAL"] = "Real";
    DataType["STRING"] = "String";
    DataType["ASSIGNMENT"] = "Assignment";
    DataType["FUNCTION"] = "Function";
    DataType["ANY"] = "Any"; // Add this line
})(DataType || (DataType = {}));
var ContextType;
(function (ContextType) {
    ContextType["BOOLEAN"] = "boolean";
    ContextType["ASSIGNMENT"] = "assignment";
    ContextType["ARITHMETIC"] = "arithmetic";
    ContextType["LIMITED_CONNECTOR"] = "limited_connector";
    ContextType["GENERAL"] = "general";
})(ContextType || (ContextType = {}));

// Core interfaces

class ExpressionHeaderComponent {
    editorConfig;
    ContextType = ContextType;
    getContextDescription() {
        if (!this.editorConfig)
            return '';
        switch (this.editorConfig.contextType) {
            case ContextType.BOOLEAN:
                return 'Boolean expressions for conditions and state machines';
            case ContextType.ASSIGNMENT:
                return 'Assignment expressions for data mapping and transformations';
            case ContextType.LIMITED_CONNECTOR:
                return 'Arithmetic expressions with limited operations (+, -, *, optionally /)';
            case ContextType.ARITHMETIC:
                return 'Mathematical expressions returning numeric values';
            case ContextType.GENERAL:
                return 'Flexible expression editor without specific validation';
            default:
                return '';
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ExpressionHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.1.3", type: ExpressionHeaderComponent, isStandalone: true, selector: "lib-expression-header", inputs: { editorConfig: "editorConfig" }, ngImport: i0, template: "<div class=\"header-section\">\r\n  <h3 class=\"editor-title\">{{ editorConfig?.title || 'Expression Editor' }}</h3>\r\n  <p class=\"editor-description\">{{ getContextDescription() }}</p>\r\n</div>\r\n", styles: [".header-section{margin-bottom:15px;padding:20px 24px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:8px;border:none;text-align:center}.editor-title{margin:0 0 8px;font-size:1.5rem;font-weight:600;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.1);font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.editor-description{margin:0;font-size:.875rem;color:#000;font-weight:400;opacity:.95;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ExpressionHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-expression-header', standalone: true, imports: [CommonModule], template: "<div class=\"header-section\">\r\n  <h3 class=\"editor-title\">{{ editorConfig?.title || 'Expression Editor' }}</h3>\r\n  <p class=\"editor-description\">{{ getContextDescription() }}</p>\r\n</div>\r\n", styles: [".header-section{margin-bottom:15px;padding:20px 24px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:8px;border:none;text-align:center}.editor-title{margin:0 0 8px;font-size:1.5rem;font-weight:600;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.1);font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.editor-description{margin:0;font-size:.875rem;color:#000;font-weight:400;opacity:.95;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}\n"] }]
        }], propDecorators: { editorConfig: [{
                type: Input
            }] } });

class DivisionToggleComponent {
    editorConfig;
    configChange = new EventEmitter();
    ContextType = ContextType;
    isLimitedConnectorContext() {
        return this.editorConfig?.contextType === ContextType.LIMITED_CONNECTOR;
    }
    toggleDivision() {
        if (this.editorConfig && this.editorConfig.contextType === ContextType.LIMITED_CONNECTOR) {
            const newConfig = {
                ...this.editorConfig,
                allowDivision: !this.editorConfig.allowDivision
            };
            this.configChange.emit(newConfig);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: DivisionToggleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.1.3", type: DivisionToggleComponent, isStandalone: true, selector: "lib-division-toggle", inputs: { editorConfig: "editorConfig" }, outputs: { configChange: "configChange" }, ngImport: i0, template: "<div *ngIf=\"isLimitedConnectorContext()\" class=\"division-toggle-section\">\r\n  <div class=\"toggle-container\">\r\n    <label class=\"toggle-label\">\r\n      <input \r\n        type=\"checkbox\" \r\n        [checked]=\"editorConfig?.allowDivision === true\"\r\n        (change)=\"toggleDivision()\"\r\n        class=\"toggle-checkbox\">\r\n      <span class=\"toggle-text\">Allow Division (/) Operation</span>\r\n    </label>\r\n    <div class=\"toggle-status\" [class.enabled]=\"editorConfig?.allowDivision === true\" [class.disabled]=\"editorConfig?.allowDivision !== true\">\r\n      {{ (editorConfig?.allowDivision === true) ? 'Division Enabled' : 'Division Disabled' }}\r\n    </div>\r\n  </div>\r\n  <div class=\"allowed-operations\">\r\n    <strong>Allowed operations:</strong> \r\n    <span class=\"operations\">+ - * {{ (editorConfig?.allowDivision === true) ? '/' : '' }}</span>\r\n  </div>\r\n</div>\r\n", styles: [".division-toggle-section{margin-bottom:16px;padding:12px;background-color:#f8f9fa;border-radius:6px;border:1px solid #dee2e6}.toggle-container{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}.toggle-label{display:flex;align-items:center;cursor:pointer;font-size:1rem;font-weight:400;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.toggle-checkbox{margin-right:8px;cursor:pointer}.toggle-text{color:#495057;font-weight:500}.toggle-status{padding:4px 8px;border-radius:4px;font-size:.875rem;font-weight:600;text-transform:uppercase;color:#000;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.toggle-status.enabled{background-color:#d4edda;color:#155724;border:1px solid #c3e6cb}.toggle-status.disabled{background-color:#f8d7da;color:#721c24;border:1px solid #f5c6cb}.allowed-operations{font-size:.875rem;color:#000;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.operations{font-family:var(--font-family-mono, \"SF Mono\", \"Cascadia Code\", \"Roboto Mono\", \"Liberation Mono\", Menlo, Monaco, Consolas, monospace);font-weight:700;color:#495057}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: DivisionToggleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-division-toggle', standalone: true, imports: [CommonModule, FormsModule], template: "<div *ngIf=\"isLimitedConnectorContext()\" class=\"division-toggle-section\">\r\n  <div class=\"toggle-container\">\r\n    <label class=\"toggle-label\">\r\n      <input \r\n        type=\"checkbox\" \r\n        [checked]=\"editorConfig?.allowDivision === true\"\r\n        (change)=\"toggleDivision()\"\r\n        class=\"toggle-checkbox\">\r\n      <span class=\"toggle-text\">Allow Division (/) Operation</span>\r\n    </label>\r\n    <div class=\"toggle-status\" [class.enabled]=\"editorConfig?.allowDivision === true\" [class.disabled]=\"editorConfig?.allowDivision !== true\">\r\n      {{ (editorConfig?.allowDivision === true) ? 'Division Enabled' : 'Division Disabled' }}\r\n    </div>\r\n  </div>\r\n  <div class=\"allowed-operations\">\r\n    <strong>Allowed operations:</strong> \r\n    <span class=\"operations\">+ - * {{ (editorConfig?.allowDivision === true) ? '/' : '' }}</span>\r\n  </div>\r\n</div>\r\n", styles: [".division-toggle-section{margin-bottom:16px;padding:12px;background-color:#f8f9fa;border-radius:6px;border:1px solid #dee2e6}.toggle-container{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}.toggle-label{display:flex;align-items:center;cursor:pointer;font-size:1rem;font-weight:400;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.toggle-checkbox{margin-right:8px;cursor:pointer}.toggle-text{color:#495057;font-weight:500}.toggle-status{padding:4px 8px;border-radius:4px;font-size:.875rem;font-weight:600;text-transform:uppercase;color:#000;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.toggle-status.enabled{background-color:#d4edda;color:#155724;border:1px solid #c3e6cb}.toggle-status.disabled{background-color:#f8d7da;color:#721c24;border:1px solid #f5c6cb}.allowed-operations{font-size:.875rem;color:#000;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.operations{font-family:var(--font-family-mono, \"SF Mono\", \"Cascadia Code\", \"Roboto Mono\", \"Liberation Mono\", Menlo, Monaco, Consolas, monospace);font-weight:700;color:#495057}\n"] }]
        }], propDecorators: { editorConfig: [{
                type: Input
            }], configChange: [{
                type: Output
            }] } });

class ExpressionTextareaComponent {
    disabled = false;
    editorConfig;
    currentValidation = null;
    valueChange = new EventEmitter();
    expressionTextarea;
    value = '';
    onChange = (value) => { };
    onTouched = () => { };
    onInput(event) {
        this.value = event.target.value;
        this.onChange(this.value);
        this.valueChange.emit(this.value);
    }
    getPlaceholder() {
        return 'Enter your expression here...';
    }
    insertTextAtCursor(text) {
        if (!this.expressionTextarea?.nativeElement) {
            this.value = (this.value || '') + text;
            this.onChange(this.value);
            this.valueChange.emit(this.value);
            return;
        }
        const textarea = this.expressionTextarea.nativeElement;
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        this.value = this.value.substring(0, startPos) + text + this.value.substring(endPos);
        this.onChange(this.value);
        this.valueChange.emit(this.value);
        setTimeout(() => {
            textarea.focus();
            if (textarea.setSelectionRange && typeof textarea.setSelectionRange === 'function') {
                textarea.setSelectionRange(startPos + text.length, startPos + text.length);
            }
        });
    }
    writeValue(value) {
        this.value = value || '';
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ExpressionTextareaComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.1.3", type: ExpressionTextareaComponent, isStandalone: true, selector: "lib-expression-textarea", inputs: { disabled: "disabled", editorConfig: "editorConfig", currentValidation: "currentValidation" }, outputs: { valueChange: "valueChange" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => ExpressionTextareaComponent),
                multi: true
            }
        ], viewQueries: [{ propertyName: "expressionTextarea", first: true, predicate: ["expressionTextarea"], descendants: true }], ngImport: i0, template: "<div class=\"textarea-container\">\r\n  <textarea\r\n    #expressionTextarea\r\n    class=\"expression-textarea\"\r\n    [class.valid]=\"currentValidation && currentValidation.isValid\"\r\n    [class.invalid]=\"currentValidation && !currentValidation.isValid\"\r\n    [(ngModel)]=\"value\"\r\n    (input)=\"onInput($event)\"\r\n    [placeholder]=\"getPlaceholder()\"\r\n    [disabled]=\"disabled\"\r\n    rows=\"3\"\r\n  ></textarea>\r\n  \r\n  <div *ngIf=\"currentValidation\" class=\"validation-display\" \r\n       [class.validation-success]=\"currentValidation.isValid\"\r\n       [class.validation-error]=\"!currentValidation.isValid\">\r\n    <span class=\"validation-icon\">{{ currentValidation.isValid ? '\u2713' : '\u26A0' }}</span>\r\n    <span class=\"validation-message\">{{ currentValidation.message }}</span>\r\n  </div>\r\n</div>\r\n", styles: [".textarea-container{margin-bottom:16px}.expression-textarea{width:98%;padding:16px;border:2px solid var(--border-color, #ced4da);border-radius:8px;font-family:var(--font-family-mono, \"SF Mono\", \"Cascadia Code\", \"Roboto Mono\", \"Liberation Mono\", Menlo, Monaco, Consolas, monospace);font-size:1rem;font-weight:400;line-height:1.5;resize:vertical;min-height:80px;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;background-color:#fff}.expression-textarea:focus{outline:none;border-color:var(--focus-border-color, #007bff)!important;box-shadow:0 0 0 .2rem #007bff40}.expression-textarea:disabled{background-color:#e9ecef;opacity:1}.expression-textarea.valid{border-color:var(--valid-border-color, #28a745)!important}.expression-textarea.invalid{border-color:var(--error-border-color, #dc3545)!important}.validation-display{display:flex;align-items:center;margin-top:8px;padding:8px 12px;border-radius:4px;font-size:.875rem;color:#000}.validation-success{background-color:#d4edda;color:#155724;border:1px solid #c3e6cb}.validation-error{background-color:#f8d7da;color:#721c24;border:1px solid #f5c6cb}.validation-icon{margin-right:8px;font-weight:700}.validation-message{flex:1}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ExpressionTextareaComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-expression-textarea', standalone: true, imports: [CommonModule, FormsModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => ExpressionTextareaComponent),
                            multi: true
                        }
                    ], template: "<div class=\"textarea-container\">\r\n  <textarea\r\n    #expressionTextarea\r\n    class=\"expression-textarea\"\r\n    [class.valid]=\"currentValidation && currentValidation.isValid\"\r\n    [class.invalid]=\"currentValidation && !currentValidation.isValid\"\r\n    [(ngModel)]=\"value\"\r\n    (input)=\"onInput($event)\"\r\n    [placeholder]=\"getPlaceholder()\"\r\n    [disabled]=\"disabled\"\r\n    rows=\"3\"\r\n  ></textarea>\r\n  \r\n  <div *ngIf=\"currentValidation\" class=\"validation-display\" \r\n       [class.validation-success]=\"currentValidation.isValid\"\r\n       [class.validation-error]=\"!currentValidation.isValid\">\r\n    <span class=\"validation-icon\">{{ currentValidation.isValid ? '\u2713' : '\u26A0' }}</span>\r\n    <span class=\"validation-message\">{{ currentValidation.message }}</span>\r\n  </div>\r\n</div>\r\n", styles: [".textarea-container{margin-bottom:16px}.expression-textarea{width:98%;padding:16px;border:2px solid var(--border-color, #ced4da);border-radius:8px;font-family:var(--font-family-mono, \"SF Mono\", \"Cascadia Code\", \"Roboto Mono\", \"Liberation Mono\", Menlo, Monaco, Consolas, monospace);font-size:1rem;font-weight:400;line-height:1.5;resize:vertical;min-height:80px;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;background-color:#fff}.expression-textarea:focus{outline:none;border-color:var(--focus-border-color, #007bff)!important;box-shadow:0 0 0 .2rem #007bff40}.expression-textarea:disabled{background-color:#e9ecef;opacity:1}.expression-textarea.valid{border-color:var(--valid-border-color, #28a745)!important}.expression-textarea.invalid{border-color:var(--error-border-color, #dc3545)!important}.validation-display{display:flex;align-items:center;margin-top:8px;padding:8px 12px;border-radius:4px;font-size:.875rem;color:#000}.validation-success{background-color:#d4edda;color:#155724;border:1px solid #c3e6cb}.validation-error{background-color:#f8d7da;color:#721c24;border:1px solid #f5c6cb}.validation-icon{margin-right:8px;font-weight:700}.validation-message{flex:1}\n"] }]
        }], propDecorators: { disabled: [{
                type: Input
            }], editorConfig: [{
                type: Input
            }], currentValidation: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], expressionTextarea: [{
                type: ViewChild,
                args: ['expressionTextarea']
            }] } });

class CustomFunctionBuilderComponent {
    isVisible = false;
    functionCreated = new EventEmitter();
    closeModal = new EventEmitter();
    newFunction = {
        name: '',
        syntax: '',
        description: '',
        example: '',
        category: 'custom'
    };
    // Validation methods
    isValidFunctionName() {
        const name = this.newFunction.name?.trim() || '';
        return name.length > 0 && /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);
    }
    isValidFunctionSyntax() {
        const syntax = this.newFunction.syntax?.trim() || '';
        return syntax.length > 0;
    }
    isValidFunctionDescription() {
        const description = this.newFunction.description?.trim() || '';
        return description.length > 0;
    }
    isFormValid() {
        return this.isValidFunctionName() &&
            this.isValidFunctionSyntax() &&
            this.isValidFunctionDescription();
    }
    // add () after FN name
    onFunctionNameChange() {
        if (this.newFunction.name) {
            this.newFunction.syntax = `${this.newFunction.name}()`;
        }
    }
    closeBuilder() {
        this.closeModal.emit();
        this.resetForm();
    }
    createFunction() {
        if (!this.isFormValid()) {
            return;
        }
        const customFunction = {
            name: this.newFunction.name,
            syntax: this.newFunction.syntax,
            description: this.newFunction.description,
            example: this.newFunction.example || '',
            category: this.newFunction.category || 'custom',
        };
        this.functionCreated.emit(customFunction);
        this.resetForm();
    }
    resetForm() {
        this.newFunction = {
            name: '',
            syntax: '',
            description: '',
            example: '',
            category: 'custom'
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: CustomFunctionBuilderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.1.3", type: CustomFunctionBuilderComponent, isStandalone: true, selector: "lib-custom-function-builder", inputs: { isVisible: "isVisible" }, outputs: { functionCreated: "functionCreated", closeModal: "closeModal" }, ngImport: i0, template: "<div class=\"custom-function-overlay\" *ngIf=\"isVisible\" (click)=\"closeBuilder()\">\n  <div class=\"custom-function-dialog\" (click)=\"$event.stopPropagation()\">\n    <div class=\"dialog-header\">\n      <h3>Create Custom Function</h3>\n      <button class=\"close-btn\" (click)=\"closeBuilder()\">\u00D7</button>\n    </div>\n    \n    <div class=\"dialog-content\">\n      <form (ngSubmit)=\"createFunction()\" #functionForm=\"ngForm\">\n        <div class=\"form-group\">\n          <label for=\"functionName\">Function Name:</label>\n          <input\n            type=\"text\"\n            id=\"functionName\"\n            name=\"functionName\"\n            [(ngModel)]=\"newFunction.name\"\n            required\n            class=\"form-control\"\n            placeholder=\"e.g., square\"\n          />\n        </div>\n        \n        <div class=\"form-group\">\n          <label for=\"functionSyntax\">Syntax:</label>\n          <input\n            type=\"text\"\n            id=\"functionSyntax\"\n            name=\"functionSyntax\"\n            [(ngModel)]=\"newFunction.syntax\"\n            required\n            class=\"form-control\"\n            placeholder=\"e.g., square(x)\"\n          />\n        </div>\n        \n        <div class=\"form-group\">\n          <label for=\"functionDescription\">Description:</label>\n          <textarea\n            id=\"functionDescription\"\n            name=\"functionDescription\"\n            [(ngModel)]=\"newFunction.description\"\n            required\n            class=\"form-control\"\n            rows=\"2\"\n            placeholder=\"Returns the square of a number\"\n          ></textarea>\n        </div>\n        \n        <div class=\"form-group\">\n          <label for=\"functionExample\">Example (optional):</label>\n          <input\n            type=\"text\"\n            id=\"functionExample\"\n            name=\"functionExample\"\n            [(ngModel)]=\"newFunction.example\"\n            class=\"form-control\"\n            placeholder=\"square(5) = 25\"\n          />\n        </div>\n        \n        <div class=\"form-group\">\n          <label for=\"functionCategory\">Category:</label>\n          <select\n            id=\"functionCategory\"\n            name=\"functionCategory\"\n            [(ngModel)]=\"newFunction.category\"\n            class=\"form-control\"\n          >\n            <option value=\"custom\">Custom</option>\n          </select>\n        </div>\n        \n        <div class=\"form-actions\">\n          <button type=\"button\" (click)=\"closeBuilder()\" class=\"btn btn-secondary\">\n            Cancel\n          </button>\n          <button type=\"submit\" [disabled]=\"!functionForm.valid\" class=\"btn btn-primary\">\n            Create Function\n          </button>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n", styles: [".custom-function-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:#0009;display:flex;align-items:center;justify-content:center;z-index:1000;backdrop-filter:blur(3px)}.custom-function-dialog{background:#fff;border-radius:12px;box-shadow:0 8px 32px #0003;max-width:750px;max-height:90vh;width:95%;overflow:hidden;border:1px solid #e1e5e9}.dialog-header{background:linear-gradient(135deg,#6f42c1,#5a32a3);color:#fff;padding:20px 24px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,.1)}.dialog-header h3{margin:0;font-size:1.5rem;font-weight:600;display:flex;align-items:center;gap:8px;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.dialog-header h3:before{content:\"\\2699\\fe0f\";font-size:20px}.close-btn{background:#ffffff1a;border:none;color:#fff;font-size:24px;cursor:pointer;padding:8px;border-radius:6px;width:40px;height:40px;display:flex;align-items:center;justify-content:center}.dialog-content{padding:24px;max-height:70vh;overflow-y:auto;background:#fff}.form-group{margin-bottom:20px}.form-group label{display:block;margin-bottom:6px;font-weight:600;color:#000;font-size:.875rem;display:flex;align-items:center;gap:6px;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.form-group label.required:after{content:\"*\";color:#dc3545;font-weight:700}.form-control{width:100%;padding:12px 16px;border:2px solid #e9ecef;border-radius:8px;font-size:1rem;font-weight:400;background:#fff;color:#2c3e50;box-sizing:border-box;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.form-control:focus{outline:none;border-color:#0d6efd;box-shadow:0 0 0 3px #0d6efd1a;background:#fefefe}.form-control::placeholder{color:#adb5bd;font-style:italic}.form-actions{display:flex;gap:12px;justify-content:flex-end;margin-top:24px;padding-top:20px;border-top:2px solid #f1f3f4}.form-actions button{padding:12px 24px;border-radius:8px;font-size:.875rem;font-weight:600;cursor:pointer;border:none;min-width:120px;display:flex;align-items:center;justify-content:center;gap:6px;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.btn-secondary{background:linear-gradient(135deg,#6c757d,#5a6268);color:#fff}.btn-primary{background:linear-gradient(135deg,#0d6efd,#0b5ed7);color:#fff}.btn-primary:disabled{background:#adb5bd;cursor:not-allowed;transform:none;box-shadow:none}@media (max-width: 768px){.custom-function-dialog{width:98%;max-height:95vh;margin:10px}.dialog-header{padding:16px 20px}.dialog-header h3{font-size:16px}.dialog-content{padding:20px}.form-actions{flex-direction:column}.form-actions button{width:100%;margin:4px 0}}.dialog-content::-webkit-scrollbar{width:8px}.dialog-content::-webkit-scrollbar-track{background:#f1f1f1;border-radius:4px}.dialog-content::-webkit-scrollbar-thumb{background:#c1c1c1;border-radius:4px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i2.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: CustomFunctionBuilderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-custom-function-builder', standalone: true, imports: [CommonModule, FormsModule], template: "<div class=\"custom-function-overlay\" *ngIf=\"isVisible\" (click)=\"closeBuilder()\">\n  <div class=\"custom-function-dialog\" (click)=\"$event.stopPropagation()\">\n    <div class=\"dialog-header\">\n      <h3>Create Custom Function</h3>\n      <button class=\"close-btn\" (click)=\"closeBuilder()\">\u00D7</button>\n    </div>\n    \n    <div class=\"dialog-content\">\n      <form (ngSubmit)=\"createFunction()\" #functionForm=\"ngForm\">\n        <div class=\"form-group\">\n          <label for=\"functionName\">Function Name:</label>\n          <input\n            type=\"text\"\n            id=\"functionName\"\n            name=\"functionName\"\n            [(ngModel)]=\"newFunction.name\"\n            required\n            class=\"form-control\"\n            placeholder=\"e.g., square\"\n          />\n        </div>\n        \n        <div class=\"form-group\">\n          <label for=\"functionSyntax\">Syntax:</label>\n          <input\n            type=\"text\"\n            id=\"functionSyntax\"\n            name=\"functionSyntax\"\n            [(ngModel)]=\"newFunction.syntax\"\n            required\n            class=\"form-control\"\n            placeholder=\"e.g., square(x)\"\n          />\n        </div>\n        \n        <div class=\"form-group\">\n          <label for=\"functionDescription\">Description:</label>\n          <textarea\n            id=\"functionDescription\"\n            name=\"functionDescription\"\n            [(ngModel)]=\"newFunction.description\"\n            required\n            class=\"form-control\"\n            rows=\"2\"\n            placeholder=\"Returns the square of a number\"\n          ></textarea>\n        </div>\n        \n        <div class=\"form-group\">\n          <label for=\"functionExample\">Example (optional):</label>\n          <input\n            type=\"text\"\n            id=\"functionExample\"\n            name=\"functionExample\"\n            [(ngModel)]=\"newFunction.example\"\n            class=\"form-control\"\n            placeholder=\"square(5) = 25\"\n          />\n        </div>\n        \n        <div class=\"form-group\">\n          <label for=\"functionCategory\">Category:</label>\n          <select\n            id=\"functionCategory\"\n            name=\"functionCategory\"\n            [(ngModel)]=\"newFunction.category\"\n            class=\"form-control\"\n          >\n            <option value=\"custom\">Custom</option>\n          </select>\n        </div>\n        \n        <div class=\"form-actions\">\n          <button type=\"button\" (click)=\"closeBuilder()\" class=\"btn btn-secondary\">\n            Cancel\n          </button>\n          <button type=\"submit\" [disabled]=\"!functionForm.valid\" class=\"btn btn-primary\">\n            Create Function\n          </button>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n", styles: [".custom-function-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:#0009;display:flex;align-items:center;justify-content:center;z-index:1000;backdrop-filter:blur(3px)}.custom-function-dialog{background:#fff;border-radius:12px;box-shadow:0 8px 32px #0003;max-width:750px;max-height:90vh;width:95%;overflow:hidden;border:1px solid #e1e5e9}.dialog-header{background:linear-gradient(135deg,#6f42c1,#5a32a3);color:#fff;padding:20px 24px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,.1)}.dialog-header h3{margin:0;font-size:1.5rem;font-weight:600;display:flex;align-items:center;gap:8px;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.dialog-header h3:before{content:\"\\2699\\fe0f\";font-size:20px}.close-btn{background:#ffffff1a;border:none;color:#fff;font-size:24px;cursor:pointer;padding:8px;border-radius:6px;width:40px;height:40px;display:flex;align-items:center;justify-content:center}.dialog-content{padding:24px;max-height:70vh;overflow-y:auto;background:#fff}.form-group{margin-bottom:20px}.form-group label{display:block;margin-bottom:6px;font-weight:600;color:#000;font-size:.875rem;display:flex;align-items:center;gap:6px;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.form-group label.required:after{content:\"*\";color:#dc3545;font-weight:700}.form-control{width:100%;padding:12px 16px;border:2px solid #e9ecef;border-radius:8px;font-size:1rem;font-weight:400;background:#fff;color:#2c3e50;box-sizing:border-box;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.form-control:focus{outline:none;border-color:#0d6efd;box-shadow:0 0 0 3px #0d6efd1a;background:#fefefe}.form-control::placeholder{color:#adb5bd;font-style:italic}.form-actions{display:flex;gap:12px;justify-content:flex-end;margin-top:24px;padding-top:20px;border-top:2px solid #f1f3f4}.form-actions button{padding:12px 24px;border-radius:8px;font-size:.875rem;font-weight:600;cursor:pointer;border:none;min-width:120px;display:flex;align-items:center;justify-content:center;gap:6px;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.btn-secondary{background:linear-gradient(135deg,#6c757d,#5a6268);color:#fff}.btn-primary{background:linear-gradient(135deg,#0d6efd,#0b5ed7);color:#fff}.btn-primary:disabled{background:#adb5bd;cursor:not-allowed;transform:none;box-shadow:none}@media (max-width: 768px){.custom-function-dialog{width:98%;max-height:95vh;margin:10px}.dialog-header{padding:16px 20px}.dialog-header h3{font-size:16px}.dialog-content{padding:20px}.form-actions{flex-direction:column}.form-actions button{width:100%;margin:4px 0}}.dialog-content::-webkit-scrollbar{width:8px}.dialog-content::-webkit-scrollbar-track{background:#f1f1f1;border-radius:4px}.dialog-content::-webkit-scrollbar-thumb{background:#c1c1c1;border-radius:4px}\n"] }]
        }], propDecorators: { isVisible: [{
                type: Input
            }], functionCreated: [{
                type: Output
            }], closeModal: [{
                type: Output
            }] } });

class ExpressionControlsComponent {
    disabled = false;
    showCustomFunctionBuilder = false;
    hasVariables = false;
    toggleEditor = new EventEmitter();
    clearExpression = new EventEmitter();
    openFunctionsMenu = new EventEmitter();
    openSymbolPicker = new EventEmitter();
    openCustomFunctionBuilder = new EventEmitter();
    closeCustomFunctionBuilder = new EventEmitter();
    customFunctionCreated = new EventEmitter();
    openVariableManager = new EventEmitter();
    onToggleEditor() {
        this.toggleEditor.emit();
    }
    onClearExpression() {
        this.clearExpression.emit();
    }
    onOpenFunctionsMenu() {
        this.openFunctionsMenu.emit();
    }
    onOpenSymbolPicker() {
        this.openSymbolPicker.emit();
    }
    onOpenCustomFunctionBuilder() {
        this.openCustomFunctionBuilder.emit();
    }
    onCloseCustomFunctionBuilder() {
        this.closeCustomFunctionBuilder.emit();
    }
    onCustomFunctionCreated(customFunction) {
        this.customFunctionCreated.emit(customFunction);
    }
    onOpenVariableManager() {
        this.openVariableManager.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ExpressionControlsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.1.3", type: ExpressionControlsComponent, isStandalone: true, selector: "lib-expression-controls", inputs: { disabled: "disabled", showCustomFunctionBuilder: "showCustomFunctionBuilder", hasVariables: "hasVariables" }, outputs: { toggleEditor: "toggleEditor", clearExpression: "clearExpression", openFunctionsMenu: "openFunctionsMenu", openSymbolPicker: "openSymbolPicker", openCustomFunctionBuilder: "openCustomFunctionBuilder", closeCustomFunctionBuilder: "closeCustomFunctionBuilder", customFunctionCreated: "customFunctionCreated", openVariableManager: "openVariableManager" }, ngImport: i0, template: "<div class=\"controls-row\">\r\n  <button\r\n    (click)=\"onToggleEditor()\"\r\n    [class]=\"'btn-toggle ' + (disabled ? 'btn-enable' : 'btn-disable')\"\r\n  >\r\n    {{ disabled ? \"Enable\" : \"Disable\" }} Editor\r\n  </button>\r\n  <button \r\n    (click)=\"onClearExpression()\" \r\n    class=\"btn\"\r\n    [disabled]=\"disabled\">\r\n    Clear Expression\r\n  </button>\r\n  <button \r\n    (click)=\"onOpenFunctionsMenu()\" \r\n    class=\"btn btn-functions\"\r\n    [disabled]=\"disabled\">\r\n    \uD83D\uDCCB Functions Menu\r\n  </button>\r\n  <button \r\n    (click)=\"onOpenSymbolPicker()\" \r\n    class=\"btn btn-symbols\"\r\n    [disabled]=\"disabled\">\r\n    \uD83D\uDD23 Symbol Picker\r\n  </button>\r\n\r\n  \r\n  <button \r\n    *ngIf=\"hasVariables\"\r\n    (click)=\"onOpenVariableManager()\" \r\n    class=\"btn btn-variables\"\r\n    [disabled]=\"disabled\">\r\n    \uD83E\uDDEE Variables\r\n  </button>\r\n\r\n \r\n  <div class=\"custom-function-inline\">\r\n    <lib-custom-function-builder\r\n      [isVisible]=\"showCustomFunctionBuilder\"\r\n      (functionCreated)=\"onCustomFunctionCreated($event)\"\r\n      (closeModal)=\"onCloseCustomFunctionBuilder()\"\r\n    >\r\n    </lib-custom-function-builder>\r\n    <button \r\n      (click)=\"onOpenCustomFunctionBuilder()\" \r\n      class=\"btn btn-custom\"\r\n      [disabled]=\"disabled\">\r\n      \u2699\uFE0F Create Function\r\n    </button>\r\n  </div>\r\n</div>\r\n", styles: [".controls-row{display:flex;gap:16px;margin-top:24px;flex-wrap:wrap;align-items:center}.btn,.btn-toggle,.btn-functions,.btn-symbols,.btn-custom,.btn-variables,.btn-lambda{padding:12px 20px;border:2px solid transparent;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif);display:inline-flex;align-items:center;gap:8px;min-height:44px;position:relative;overflow:hidden;transition:all .2s ease}.btn:before,.btn-toggle:before,.btn-functions:before,.btn-symbols:before,.btn-custom:before,.btn-variables:before,.btn-lambda:before{content:\"\";position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);transition:left .5s}.btn:hover:before,.btn-toggle:hover:before,.btn-functions:hover:before,.btn-symbols:hover:before,.btn-custom:hover:before,.btn-variables:hover:before,.btn-lambda:hover:before{left:100%}.btn-toggle,.btn-disable{background:linear-gradient(135deg,#dc3545,#c82333);color:#fff;border-color:#dc3545;box-shadow:0 4px 12px #dc354533}.btn-enable{background:linear-gradient(135deg,#28a745,#20c997);color:#fff;border-color:#28a745;box-shadow:0 4px 12px #28a74533}.btn,.btn-functions,.btn-symbols,.btn-custom,.btn-variables,.btn-lambda{background:linear-gradient(135deg,#0d6efd,#0b5ed7);color:#fff;border-color:#0d6efd;box-shadow:0 4px 12px #0d6efd33}.btn:active,.btn-toggle:active,.btn-functions:active,.btn-symbols:active,.btn-custom:active,.btn-variables:active,.btn-lambda:active{transform:translateY(1px);box-shadow:0 2px 8px #00000026}.btn:hover,.btn-toggle:hover,.btn-functions:hover,.btn-symbols:hover,.btn-custom:hover,.btn-variables:hover,.btn-lambda:hover{transform:translateY(-1px);box-shadow:0 6px 16px #0003}.custom-function-inline{position:relative;display:inline-block}.btn:disabled,.btn-functions:disabled,.btn-symbols:disabled,.btn-custom:disabled,.btn-variables:disabled,.btn-lambda:disabled{background:linear-gradient(135deg,#e9ecef,#dee2e6)!important;color:#6c757d!important;border-color:#dee2e6!important;box-shadow:none!important;cursor:not-allowed!important;transform:none!important;opacity:.6}.btn:disabled:before,.btn-functions:disabled:before,.btn-symbols:disabled:before,.btn-custom:disabled:before,.btn-variables:disabled:before,.btn-lambda:disabled:before{display:none}.btn:disabled:hover,.btn-functions:disabled:hover,.btn-symbols:disabled:hover,.btn-custom:disabled:hover,.btn-variables:disabled:hover,.btn-lambda:disabled:hover{transform:none!important;box-shadow:none!important}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CustomFunctionBuilderComponent, selector: "lib-custom-function-builder", inputs: ["isVisible"], outputs: ["functionCreated", "closeModal"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ExpressionControlsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-expression-controls', standalone: true, imports: [CommonModule, CustomFunctionBuilderComponent], template: "<div class=\"controls-row\">\r\n  <button\r\n    (click)=\"onToggleEditor()\"\r\n    [class]=\"'btn-toggle ' + (disabled ? 'btn-enable' : 'btn-disable')\"\r\n  >\r\n    {{ disabled ? \"Enable\" : \"Disable\" }} Editor\r\n  </button>\r\n  <button \r\n    (click)=\"onClearExpression()\" \r\n    class=\"btn\"\r\n    [disabled]=\"disabled\">\r\n    Clear Expression\r\n  </button>\r\n  <button \r\n    (click)=\"onOpenFunctionsMenu()\" \r\n    class=\"btn btn-functions\"\r\n    [disabled]=\"disabled\">\r\n    \uD83D\uDCCB Functions Menu\r\n  </button>\r\n  <button \r\n    (click)=\"onOpenSymbolPicker()\" \r\n    class=\"btn btn-symbols\"\r\n    [disabled]=\"disabled\">\r\n    \uD83D\uDD23 Symbol Picker\r\n  </button>\r\n\r\n  \r\n  <button \r\n    *ngIf=\"hasVariables\"\r\n    (click)=\"onOpenVariableManager()\" \r\n    class=\"btn btn-variables\"\r\n    [disabled]=\"disabled\">\r\n    \uD83E\uDDEE Variables\r\n  </button>\r\n\r\n \r\n  <div class=\"custom-function-inline\">\r\n    <lib-custom-function-builder\r\n      [isVisible]=\"showCustomFunctionBuilder\"\r\n      (functionCreated)=\"onCustomFunctionCreated($event)\"\r\n      (closeModal)=\"onCloseCustomFunctionBuilder()\"\r\n    >\r\n    </lib-custom-function-builder>\r\n    <button \r\n      (click)=\"onOpenCustomFunctionBuilder()\" \r\n      class=\"btn btn-custom\"\r\n      [disabled]=\"disabled\">\r\n      \u2699\uFE0F Create Function\r\n    </button>\r\n  </div>\r\n</div>\r\n", styles: [".controls-row{display:flex;gap:16px;margin-top:24px;flex-wrap:wrap;align-items:center}.btn,.btn-toggle,.btn-functions,.btn-symbols,.btn-custom,.btn-variables,.btn-lambda{padding:12px 20px;border:2px solid transparent;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif);display:inline-flex;align-items:center;gap:8px;min-height:44px;position:relative;overflow:hidden;transition:all .2s ease}.btn:before,.btn-toggle:before,.btn-functions:before,.btn-symbols:before,.btn-custom:before,.btn-variables:before,.btn-lambda:before{content:\"\";position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);transition:left .5s}.btn:hover:before,.btn-toggle:hover:before,.btn-functions:hover:before,.btn-symbols:hover:before,.btn-custom:hover:before,.btn-variables:hover:before,.btn-lambda:hover:before{left:100%}.btn-toggle,.btn-disable{background:linear-gradient(135deg,#dc3545,#c82333);color:#fff;border-color:#dc3545;box-shadow:0 4px 12px #dc354533}.btn-enable{background:linear-gradient(135deg,#28a745,#20c997);color:#fff;border-color:#28a745;box-shadow:0 4px 12px #28a74533}.btn,.btn-functions,.btn-symbols,.btn-custom,.btn-variables,.btn-lambda{background:linear-gradient(135deg,#0d6efd,#0b5ed7);color:#fff;border-color:#0d6efd;box-shadow:0 4px 12px #0d6efd33}.btn:active,.btn-toggle:active,.btn-functions:active,.btn-symbols:active,.btn-custom:active,.btn-variables:active,.btn-lambda:active{transform:translateY(1px);box-shadow:0 2px 8px #00000026}.btn:hover,.btn-toggle:hover,.btn-functions:hover,.btn-symbols:hover,.btn-custom:hover,.btn-variables:hover,.btn-lambda:hover{transform:translateY(-1px);box-shadow:0 6px 16px #0003}.custom-function-inline{position:relative;display:inline-block}.btn:disabled,.btn-functions:disabled,.btn-symbols:disabled,.btn-custom:disabled,.btn-variables:disabled,.btn-lambda:disabled{background:linear-gradient(135deg,#e9ecef,#dee2e6)!important;color:#6c757d!important;border-color:#dee2e6!important;box-shadow:none!important;cursor:not-allowed!important;transform:none!important;opacity:.6}.btn:disabled:before,.btn-functions:disabled:before,.btn-symbols:disabled:before,.btn-custom:disabled:before,.btn-variables:disabled:before,.btn-lambda:disabled:before{display:none}.btn:disabled:hover,.btn-functions:disabled:hover,.btn-symbols:disabled:hover,.btn-custom:disabled:hover,.btn-variables:disabled:hover,.btn-lambda:disabled:hover{transform:none!important;box-shadow:none!important}\n"] }]
        }], propDecorators: { disabled: [{
                type: Input
            }], showCustomFunctionBuilder: [{
                type: Input
            }], hasVariables: [{
                type: Input
            }], toggleEditor: [{
                type: Output
            }], clearExpression: [{
                type: Output
            }], openFunctionsMenu: [{
                type: Output
            }], openSymbolPicker: [{
                type: Output
            }], openCustomFunctionBuilder: [{
                type: Output
            }], closeCustomFunctionBuilder: [{
                type: Output
            }], customFunctionCreated: [{
                type: Output
            }], openVariableManager: [{
                type: Output
            }] } });

class ExpressionInfoComponent {
    value = '';
    typeResult = null;
    currentValidation = null;
    getReturnTypeDisplay() {
        if (!this.typeResult?.success || !this.typeResult.returnType)
            return '';
        switch (this.typeResult.returnType) {
            case DataType.INTEGER:
                return 'Integer';
            case DataType.REAL:
                return 'Real';
            case DataType.BOOLEAN:
                return 'Boolean';
            case DataType.STRING:
                return 'String';
            case DataType.ASSIGNMENT:
                return 'Assignment';
            case DataType.FUNCTION:
                return 'Function';
            default:
                return this.typeResult.returnType;
        }
    }
    shouldShowTypeInfo() {
        return this.typeResult?.success === true &&
            (this.currentValidation === null || this.currentValidation?.isValid === true);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ExpressionInfoComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.1.3", type: ExpressionInfoComponent, isStandalone: true, selector: "lib-expression-info", inputs: { value: "value", typeResult: "typeResult", currentValidation: "currentValidation" }, ngImport: i0, template: "<div class=\"info-section\">\r\n  <p>\r\n    <strong>Current Value:</strong> {{ value || \"No expression entered\" }}\r\n  </p>\r\n\r\n  <div *ngIf=\"shouldShowTypeInfo()\" class=\"type-info\">\r\n    <p>\r\n      <strong>Return Type:</strong>\r\n      <span class=\"result-type\">{{ getReturnTypeDisplay() }}</span>\r\n    </p>\r\n  </div>\r\n\r\n  <div *ngIf=\"typeResult && !typeResult.success\" class=\"error-info\">\r\n    <p>\r\n      <strong>Error:</strong>\r\n      <span class=\"error-message\">{{ typeResult.error }}</span>\r\n    </p>\r\n  </div>\r\n</div>\r\n", styles: [".info-section{margin-top:16px;padding:16px;background-color:#f8f9fa;border-radius:6px;border:1px solid #dee2e6}.info-section p{margin:0 0 8px;font-size:1rem;font-weight:400;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.info-section p:last-child{margin-bottom:0}.type-info{margin-top:12px;padding-top:12px;border-top:1px solid #dee2e6}.result-type{font-family:var(--font-family-mono, \"SF Mono\", \"Cascadia Code\", \"Roboto Mono\", \"Liberation Mono\", Menlo, Monaco, Consolas, monospace);font-weight:700;background-color:#ffffff80;padding:2px 4px;border-radius:3px;color:#0d6efd}.error-message{font-family:var(--font-family-mono, \"SF Mono\", \"Cascadia Code\", \"Roboto Mono\", \"Liberation Mono\", Menlo, Monaco, Consolas, monospace);font-weight:700}.error-info{margin-top:12px;padding:8px;background-color:#f8d7da;border:1px solid #f5c6cb;border-radius:4px;color:#721c24}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ExpressionInfoComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-expression-info', standalone: true, imports: [CommonModule], template: "<div class=\"info-section\">\r\n  <p>\r\n    <strong>Current Value:</strong> {{ value || \"No expression entered\" }}\r\n  </p>\r\n\r\n  <div *ngIf=\"shouldShowTypeInfo()\" class=\"type-info\">\r\n    <p>\r\n      <strong>Return Type:</strong>\r\n      <span class=\"result-type\">{{ getReturnTypeDisplay() }}</span>\r\n    </p>\r\n  </div>\r\n\r\n  <div *ngIf=\"typeResult && !typeResult.success\" class=\"error-info\">\r\n    <p>\r\n      <strong>Error:</strong>\r\n      <span class=\"error-message\">{{ typeResult.error }}</span>\r\n    </p>\r\n  </div>\r\n</div>\r\n", styles: [".info-section{margin-top:16px;padding:16px;background-color:#f8f9fa;border-radius:6px;border:1px solid #dee2e6}.info-section p{margin:0 0 8px;font-size:1rem;font-weight:400;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.info-section p:last-child{margin-bottom:0}.type-info{margin-top:12px;padding-top:12px;border-top:1px solid #dee2e6}.result-type{font-family:var(--font-family-mono, \"SF Mono\", \"Cascadia Code\", \"Roboto Mono\", \"Liberation Mono\", Menlo, Monaco, Consolas, monospace);font-weight:700;background-color:#ffffff80;padding:2px 4px;border-radius:3px;color:#0d6efd}.error-message{font-family:var(--font-family-mono, \"SF Mono\", \"Cascadia Code\", \"Roboto Mono\", \"Liberation Mono\", Menlo, Monaco, Consolas, monospace);font-weight:700}.error-info{margin-top:12px;padding:8px;background-color:#f8d7da;border:1px solid #f5c6cb;border-radius:4px;color:#721c24}\n"] }]
        }], propDecorators: { value: [{
                type: Input
            }], typeResult: [{
                type: Input
            }], currentValidation: [{
                type: Input
            }] } });

class ExtensionManagerService {
    customFunctions = [];
    constructor() { }
    getCustomFunctions() {
        return [...this.customFunctions];
    }
    registerCustomFunction(customFunction) {
        this.customFunctions.push(customFunction);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ExtensionManagerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ExtensionManagerService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ExtensionManagerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

class FunctionsMenuComponent {
    extensionManager;
    showFunctionsMenu = false;
    functionCategories = [];
    selectedFunctionCategory = 'arithmetic';
    selectedFunction = null;
    closeFunctionsMenu = new EventEmitter();
    functionCategorySelected = new EventEmitter();
    functionSelected = new EventEmitter();
    functionInserted = new EventEmitter();
    constructor(extensionManager) {
        this.extensionManager = extensionManager;
    }
    onCloseFunctionsMenu() {
        this.closeFunctionsMenu.emit();
    }
    onSelectFunctionCategory(category) {
        this.functionCategorySelected.emit(category);
    }
    onSelectFunction(func) {
        this.functionSelected.emit(func);
    }
    onInsertFunction(func) {
        this.functionInserted.emit(func);
    }
    getSelectedCategoryFunctions() {
        const category = this.functionCategories.find(c => c.name === this.selectedFunctionCategory);
        let functions = category ? category.functions : [];
        if (this.selectedFunctionCategory === 'custom') {
            const customFunctions = this.extensionManager.getCustomFunctions();
            const customFunctionItems = customFunctions.map(cf => ({
                name: cf.name,
                syntax: cf.syntax,
                description: cf.description,
                example: cf.example || '',
                category: 'custom'
            }));
            functions = [...customFunctionItems];
        }
        return functions;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: FunctionsMenuComponent, deps: [{ token: ExtensionManagerService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.1.3", type: FunctionsMenuComponent, isStandalone: true, selector: "lib-functions-menu", inputs: { showFunctionsMenu: "showFunctionsMenu", functionCategories: "functionCategories", selectedFunctionCategory: "selectedFunctionCategory", selectedFunction: "selectedFunction" }, outputs: { closeFunctionsMenu: "closeFunctionsMenu", functionCategorySelected: "functionCategorySelected", functionSelected: "functionSelected", functionInserted: "functionInserted" }, ngImport: i0, template: "<!-- Functions Menu Modal -->\r\n<div\r\n  class=\"functions-menu-overlay\"\r\n  *ngIf=\"showFunctionsMenu\"\r\n  (click)=\"onCloseFunctionsMenu()\"\r\n>\r\n  <div class=\"functions-menu-dialog\" (click)=\"$event.stopPropagation()\">\r\n    <div class=\"dialog-header\">\r\n      <h3>Functions Menu</h3>\r\n      <button class=\"close-btn\" (click)=\"onCloseFunctionsMenu()\">\u00D7</button>\r\n    </div>\r\n\r\n    <div class=\"dialog-content\">\r\n      <div class=\"category-tabs\">\r\n        <button\r\n          *ngFor=\"let category of functionCategories\"\r\n          class=\"category-tab\"\r\n          [class.active]=\"selectedFunctionCategory === category.name\"\r\n          (click)=\"onSelectFunctionCategory(category.name)\"\r\n        >\r\n          {{ category.label }}\r\n        </button>\r\n      </div>\r\n\r\n      <div class=\"content-area\">\r\n        <div class=\"function-list\">\r\n          <div\r\n            *ngFor=\"let func of getSelectedCategoryFunctions()\"\r\n            class=\"function-item\"\r\n            [class.selected]=\"selectedFunction === func\"\r\n            (click)=\"onSelectFunction(func)\"\r\n          >\r\n            <div class=\"function-name\">{{ func.name }}</div>\r\n            <div class=\"function-syntax\">{{ func.syntax }}</div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"function-details\" *ngIf=\"selectedFunction\">\r\n          <h4>{{ selectedFunction!.name }}</h4>\r\n          <p><strong>Syntax:</strong> {{ selectedFunction!.syntax }}</p>\r\n          <p>\r\n            <strong>Description:</strong> {{ selectedFunction!.description }}\r\n          </p>\r\n          <p *ngIf=\"selectedFunction!.example\">\r\n            <strong>Example:</strong> {{ selectedFunction!.example }}\r\n          </p>\r\n          <button (click)=\"onInsertFunction(selectedFunction!)\">\r\n            Insert Function\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".functions-menu-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;display:flex;justify-content:center;align-items:center;z-index:1000}.functions-menu-dialog{background:#fff;border-radius:8px;box-shadow:0 4px 6px #0000001a;width:90%;max-width:800px;max-height:80vh;overflow:hidden;display:flex;flex-direction:column}.dialog-header{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid #dee2e6;background-color:#f8f9fa}.dialog-header h3{margin:0;font-size:1.5rem;font-weight:600;color:#495057;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.close-btn{background:none;border:none;font-size:24px;cursor:pointer;color:#000;padding:0;width:30px;height:30px;display:flex;align-items:center;justify-content:center;border-radius:4px}.close-btn:hover{background-color:#e9ecef;color:#495057}.dialog-content{flex:1;overflow:hidden;display:flex;flex-direction:column}.category-tabs{display:flex;border-bottom:1px solid #dee2e6;background-color:#f8f9fa;overflow-x:auto}.category-tab{padding:12px 16px;border:none;background:none;cursor:pointer;font-size:.875rem;font-weight:500;color:#000;border-bottom:2px solid transparent;white-space:nowrap;transition:all .15s ease-in-out;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.category-tab:hover{color:#495057;background-color:#e9ecef}.category-tab.active{color:#0d6efd;border-bottom-color:#0d6efd;background-color:#fff}.content-area{flex:1;display:flex;overflow:hidden}.function-list{width:40%;border-right:1px solid #dee2e6;overflow-y:auto;background-color:#f8f9fa}.function-item{padding:12px 16px;border-bottom:1px solid #dee2e6;cursor:pointer;transition:background-color .15s ease-in-out}.function-item:hover{background-color:#e9ecef}.function-item.selected{background-color:#0d6efd;color:#fff}.function-name{font-weight:600;font-size:1rem;margin-bottom:4px;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.function-syntax{font-family:var(--font-family-mono, \"SF Mono\", \"Cascadia Code\", \"Roboto Mono\", \"Liberation Mono\", Menlo, Monaco, Consolas, monospace);font-size:.875rem;color:#000}.function-item.selected .function-syntax{color:#fffc}.function-details{flex:1;padding:20px;overflow-y:auto}.function-details h4{margin:0 0 16px;font-size:1.25rem;font-weight:600;color:#495057;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.function-details p{margin:0 0 12px;font-size:1rem;font-weight:400;line-height:1.4;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.function-details p strong{font-size:.875rem;color:#000}.function-details button{margin-top:16px;padding:8px 16px;background-color:#0d6efd;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:.875rem;font-weight:500;transition:background-color .15s ease-in-out;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.function-details button:hover{background-color:#0b5ed7}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: FunctionsMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-functions-menu', standalone: true, imports: [CommonModule], template: "<!-- Functions Menu Modal -->\r\n<div\r\n  class=\"functions-menu-overlay\"\r\n  *ngIf=\"showFunctionsMenu\"\r\n  (click)=\"onCloseFunctionsMenu()\"\r\n>\r\n  <div class=\"functions-menu-dialog\" (click)=\"$event.stopPropagation()\">\r\n    <div class=\"dialog-header\">\r\n      <h3>Functions Menu</h3>\r\n      <button class=\"close-btn\" (click)=\"onCloseFunctionsMenu()\">\u00D7</button>\r\n    </div>\r\n\r\n    <div class=\"dialog-content\">\r\n      <div class=\"category-tabs\">\r\n        <button\r\n          *ngFor=\"let category of functionCategories\"\r\n          class=\"category-tab\"\r\n          [class.active]=\"selectedFunctionCategory === category.name\"\r\n          (click)=\"onSelectFunctionCategory(category.name)\"\r\n        >\r\n          {{ category.label }}\r\n        </button>\r\n      </div>\r\n\r\n      <div class=\"content-area\">\r\n        <div class=\"function-list\">\r\n          <div\r\n            *ngFor=\"let func of getSelectedCategoryFunctions()\"\r\n            class=\"function-item\"\r\n            [class.selected]=\"selectedFunction === func\"\r\n            (click)=\"onSelectFunction(func)\"\r\n          >\r\n            <div class=\"function-name\">{{ func.name }}</div>\r\n            <div class=\"function-syntax\">{{ func.syntax }}</div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"function-details\" *ngIf=\"selectedFunction\">\r\n          <h4>{{ selectedFunction!.name }}</h4>\r\n          <p><strong>Syntax:</strong> {{ selectedFunction!.syntax }}</p>\r\n          <p>\r\n            <strong>Description:</strong> {{ selectedFunction!.description }}\r\n          </p>\r\n          <p *ngIf=\"selectedFunction!.example\">\r\n            <strong>Example:</strong> {{ selectedFunction!.example }}\r\n          </p>\r\n          <button (click)=\"onInsertFunction(selectedFunction!)\">\r\n            Insert Function\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".functions-menu-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;display:flex;justify-content:center;align-items:center;z-index:1000}.functions-menu-dialog{background:#fff;border-radius:8px;box-shadow:0 4px 6px #0000001a;width:90%;max-width:800px;max-height:80vh;overflow:hidden;display:flex;flex-direction:column}.dialog-header{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid #dee2e6;background-color:#f8f9fa}.dialog-header h3{margin:0;font-size:1.5rem;font-weight:600;color:#495057;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.close-btn{background:none;border:none;font-size:24px;cursor:pointer;color:#000;padding:0;width:30px;height:30px;display:flex;align-items:center;justify-content:center;border-radius:4px}.close-btn:hover{background-color:#e9ecef;color:#495057}.dialog-content{flex:1;overflow:hidden;display:flex;flex-direction:column}.category-tabs{display:flex;border-bottom:1px solid #dee2e6;background-color:#f8f9fa;overflow-x:auto}.category-tab{padding:12px 16px;border:none;background:none;cursor:pointer;font-size:.875rem;font-weight:500;color:#000;border-bottom:2px solid transparent;white-space:nowrap;transition:all .15s ease-in-out;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.category-tab:hover{color:#495057;background-color:#e9ecef}.category-tab.active{color:#0d6efd;border-bottom-color:#0d6efd;background-color:#fff}.content-area{flex:1;display:flex;overflow:hidden}.function-list{width:40%;border-right:1px solid #dee2e6;overflow-y:auto;background-color:#f8f9fa}.function-item{padding:12px 16px;border-bottom:1px solid #dee2e6;cursor:pointer;transition:background-color .15s ease-in-out}.function-item:hover{background-color:#e9ecef}.function-item.selected{background-color:#0d6efd;color:#fff}.function-name{font-weight:600;font-size:1rem;margin-bottom:4px;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.function-syntax{font-family:var(--font-family-mono, \"SF Mono\", \"Cascadia Code\", \"Roboto Mono\", \"Liberation Mono\", Menlo, Monaco, Consolas, monospace);font-size:.875rem;color:#000}.function-item.selected .function-syntax{color:#fffc}.function-details{flex:1;padding:20px;overflow-y:auto}.function-details h4{margin:0 0 16px;font-size:1.25rem;font-weight:600;color:#495057;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.function-details p{margin:0 0 12px;font-size:1rem;font-weight:400;line-height:1.4;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.function-details p strong{font-size:.875rem;color:#000}.function-details button{margin-top:16px;padding:8px 16px;background-color:#0d6efd;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:.875rem;font-weight:500;transition:background-color .15s ease-in-out;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.function-details button:hover{background-color:#0b5ed7}\n"] }]
        }], ctorParameters: () => [{ type: ExtensionManagerService }], propDecorators: { showFunctionsMenu: [{
                type: Input
            }], functionCategories: [{
                type: Input
            }], selectedFunctionCategory: [{
                type: Input
            }], selectedFunction: [{
                type: Input
            }], closeFunctionsMenu: [{
                type: Output
            }], functionCategorySelected: [{
                type: Output
            }], functionSelected: [{
                type: Output
            }], functionInserted: [{
                type: Output
            }] } });

class SymbolPickerComponent {
    showSymbolPicker = false;
    symbolCategories = [];
    selectedSymbolCategory = 'arithmetic';
    selectedSymbol = null;
    closeSymbolPicker = new EventEmitter();
    symbolCategorySelected = new EventEmitter();
    symbolSelected = new EventEmitter();
    symbolInserted = new EventEmitter();
    onCloseSymbolPicker() {
        this.closeSymbolPicker.emit();
    }
    onSelectSymbolCategory(category) {
        this.symbolCategorySelected.emit(category);
    }
    onSelectSymbol(symbol) {
        this.symbolSelected.emit(symbol);
    }
    onInsertSymbol(symbol) {
        this.symbolInserted.emit(symbol);
    }
    getSelectedCategorySymbols() {
        const category = this.symbolCategories.find(c => c.name === this.selectedSymbolCategory);
        return category ? category.symbols : [];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: SymbolPickerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.1.3", type: SymbolPickerComponent, isStandalone: true, selector: "lib-symbol-picker", inputs: { showSymbolPicker: "showSymbolPicker", symbolCategories: "symbolCategories", selectedSymbolCategory: "selectedSymbolCategory", selectedSymbol: "selectedSymbol" }, outputs: { closeSymbolPicker: "closeSymbolPicker", symbolCategorySelected: "symbolCategorySelected", symbolSelected: "symbolSelected", symbolInserted: "symbolInserted" }, ngImport: i0, template: "<div\r\n  class=\"symbol-picker-overlay\"\r\n  *ngIf=\"showSymbolPicker\"\r\n  (click)=\"onCloseSymbolPicker()\"\r\n>\r\n  <div class=\"symbol-picker-dialog\" (click)=\"$event.stopPropagation()\">\r\n    <div class=\"dialog-header\">\r\n      <h3>Symbol Picker</h3>\r\n      <button class=\"close-btn\" (click)=\"onCloseSymbolPicker()\">\u00D7</button>\r\n    </div>\r\n\r\n    <div class=\"dialog-content\">\r\n      <div class=\"category-tabs\">\r\n        <button\r\n          *ngFor=\"let category of symbolCategories\"\r\n          class=\"category-tab\"\r\n          [class.active]=\"selectedSymbolCategory === category.name\"\r\n          (click)=\"onSelectSymbolCategory(category.name)\"\r\n        >\r\n          {{ category.label }}\r\n        </button>\r\n      </div>\r\n\r\n      <div class=\"content-area\">\r\n        <div class=\"symbol-grid\">\r\n          <div\r\n            *ngFor=\"let symbol of getSelectedCategorySymbols()\"\r\n            class=\"symbol-item\"\r\n            [class.selected]=\"selectedSymbol === symbol\"\r\n            (click)=\"onSelectSymbol(symbol)\"\r\n          >\r\n            <div class=\"symbol-display\">{{ symbol.symbol }}</div>\r\n            <div class=\"symbol-name\">{{ symbol.name }}</div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"symbol-details\" *ngIf=\"selectedSymbol\">\r\n          <h4>{{ selectedSymbol!.name }}</h4>\r\n          <p><strong>Symbol:</strong> {{ selectedSymbol!.symbol }}</p>\r\n          <p>\r\n            <strong>Description:</strong> {{ selectedSymbol!.description }}\r\n          </p>\r\n          <button (click)=\"onInsertSymbol(selectedSymbol!)\">\r\n            Insert Symbol\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".symbol-picker-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;display:flex;justify-content:center;align-items:center;z-index:1000}.symbol-picker-dialog{background:#fff;border-radius:8px;box-shadow:0 4px 6px #0000001a;width:90%;max-width:700px;max-height:80vh;overflow:hidden;display:flex;flex-direction:column}.dialog-header{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid #dee2e6;background-color:#f8f9fa}.dialog-header h3{margin:0;font-size:1.5rem;font-weight:600;color:#495057;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.close-btn{background:none;border:none;font-size:24px;cursor:pointer;color:#6c757d;padding:0;width:30px;height:30px;display:flex;align-items:center;justify-content:center;border-radius:4px}.close-btn:hover{background-color:#e9ecef;color:#495057}.dialog-content{flex:1;overflow:hidden;display:flex;flex-direction:column}.category-tabs{display:flex;border-bottom:1px solid #dee2e6;background-color:#f8f9fa;overflow-x:auto}.category-tab{padding:12px 16px;border:none;background:none;cursor:pointer;font-size:.875rem;font-weight:500;color:#000;border-bottom:2px solid transparent;white-space:nowrap;transition:all .15s ease-in-out;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.category-tab:hover{color:#495057;background-color:#e9ecef}.category-tab.active{color:#0d6efd;border-bottom-color:#0d6efd;background-color:#fff}.content-area{flex:1;display:flex;overflow:hidden}.symbol-grid{width:60%;border-right:1px solid #dee2e6;overflow-y:auto;background-color:#f8f9fa;padding:16px;display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:8px;align-content:start}.symbol-item{display:flex;flex-direction:column;align-items:center;padding:12px 8px;border:1px solid #dee2e6;border-radius:6px;background-color:#fff;cursor:pointer;transition:all .15s ease-in-out;min-height:80px;justify-content:center}.symbol-item:hover{background-color:#e9ecef;border-color:#adb5bd}.symbol-item.selected{background-color:#0d6efd;color:#fff;border-color:#0d6efd}.symbol-display{font-size:1.5rem;font-weight:700;margin-bottom:4px;font-family:Times New Roman,serif}.symbol-name{font-size:.7rem;text-align:center;color:#000;line-height:1.2;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.symbol-item.selected .symbol-name{color:#fffc}.symbol-details{flex:1;padding:20px;overflow-y:auto}.symbol-details h4{margin:0 0 16px;font-size:1.25rem;font-weight:600;color:#495057;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.symbol-details p{margin:0 0 12px;font-size:1rem;font-weight:400;line-height:1.4;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.symbol-details p strong{font-size:.875rem;color:#000}.symbol-details button{margin-top:16px;padding:8px 16px;background-color:#0d6efd;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:.875rem;font-weight:500;transition:background-color .15s ease-in-out;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.symbol-details button:hover{background-color:#0b5ed7}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: SymbolPickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-symbol-picker', standalone: true, imports: [CommonModule], template: "<div\r\n  class=\"symbol-picker-overlay\"\r\n  *ngIf=\"showSymbolPicker\"\r\n  (click)=\"onCloseSymbolPicker()\"\r\n>\r\n  <div class=\"symbol-picker-dialog\" (click)=\"$event.stopPropagation()\">\r\n    <div class=\"dialog-header\">\r\n      <h3>Symbol Picker</h3>\r\n      <button class=\"close-btn\" (click)=\"onCloseSymbolPicker()\">\u00D7</button>\r\n    </div>\r\n\r\n    <div class=\"dialog-content\">\r\n      <div class=\"category-tabs\">\r\n        <button\r\n          *ngFor=\"let category of symbolCategories\"\r\n          class=\"category-tab\"\r\n          [class.active]=\"selectedSymbolCategory === category.name\"\r\n          (click)=\"onSelectSymbolCategory(category.name)\"\r\n        >\r\n          {{ category.label }}\r\n        </button>\r\n      </div>\r\n\r\n      <div class=\"content-area\">\r\n        <div class=\"symbol-grid\">\r\n          <div\r\n            *ngFor=\"let symbol of getSelectedCategorySymbols()\"\r\n            class=\"symbol-item\"\r\n            [class.selected]=\"selectedSymbol === symbol\"\r\n            (click)=\"onSelectSymbol(symbol)\"\r\n          >\r\n            <div class=\"symbol-display\">{{ symbol.symbol }}</div>\r\n            <div class=\"symbol-name\">{{ symbol.name }}</div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"symbol-details\" *ngIf=\"selectedSymbol\">\r\n          <h4>{{ selectedSymbol!.name }}</h4>\r\n          <p><strong>Symbol:</strong> {{ selectedSymbol!.symbol }}</p>\r\n          <p>\r\n            <strong>Description:</strong> {{ selectedSymbol!.description }}\r\n          </p>\r\n          <button (click)=\"onInsertSymbol(selectedSymbol!)\">\r\n            Insert Symbol\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".symbol-picker-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;display:flex;justify-content:center;align-items:center;z-index:1000}.symbol-picker-dialog{background:#fff;border-radius:8px;box-shadow:0 4px 6px #0000001a;width:90%;max-width:700px;max-height:80vh;overflow:hidden;display:flex;flex-direction:column}.dialog-header{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid #dee2e6;background-color:#f8f9fa}.dialog-header h3{margin:0;font-size:1.5rem;font-weight:600;color:#495057;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.close-btn{background:none;border:none;font-size:24px;cursor:pointer;color:#6c757d;padding:0;width:30px;height:30px;display:flex;align-items:center;justify-content:center;border-radius:4px}.close-btn:hover{background-color:#e9ecef;color:#495057}.dialog-content{flex:1;overflow:hidden;display:flex;flex-direction:column}.category-tabs{display:flex;border-bottom:1px solid #dee2e6;background-color:#f8f9fa;overflow-x:auto}.category-tab{padding:12px 16px;border:none;background:none;cursor:pointer;font-size:.875rem;font-weight:500;color:#000;border-bottom:2px solid transparent;white-space:nowrap;transition:all .15s ease-in-out;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.category-tab:hover{color:#495057;background-color:#e9ecef}.category-tab.active{color:#0d6efd;border-bottom-color:#0d6efd;background-color:#fff}.content-area{flex:1;display:flex;overflow:hidden}.symbol-grid{width:60%;border-right:1px solid #dee2e6;overflow-y:auto;background-color:#f8f9fa;padding:16px;display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:8px;align-content:start}.symbol-item{display:flex;flex-direction:column;align-items:center;padding:12px 8px;border:1px solid #dee2e6;border-radius:6px;background-color:#fff;cursor:pointer;transition:all .15s ease-in-out;min-height:80px;justify-content:center}.symbol-item:hover{background-color:#e9ecef;border-color:#adb5bd}.symbol-item.selected{background-color:#0d6efd;color:#fff;border-color:#0d6efd}.symbol-display{font-size:1.5rem;font-weight:700;margin-bottom:4px;font-family:Times New Roman,serif}.symbol-name{font-size:.7rem;text-align:center;color:#000;line-height:1.2;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.symbol-item.selected .symbol-name{color:#fffc}.symbol-details{flex:1;padding:20px;overflow-y:auto}.symbol-details h4{margin:0 0 16px;font-size:1.25rem;font-weight:600;color:#495057;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.symbol-details p{margin:0 0 12px;font-size:1rem;font-weight:400;line-height:1.4;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.symbol-details p strong{font-size:.875rem;color:#000}.symbol-details button{margin-top:16px;padding:8px 16px;background-color:#0d6efd;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:.875rem;font-weight:500;transition:background-color .15s ease-in-out;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.symbol-details button:hover{background-color:#0b5ed7}\n"] }]
        }], propDecorators: { showSymbolPicker: [{
                type: Input
            }], symbolCategories: [{
                type: Input
            }], selectedSymbolCategory: [{
                type: Input
            }], selectedSymbol: [{
                type: Input
            }], closeSymbolPicker: [{
                type: Output
            }], symbolCategorySelected: [{
                type: Output
            }], symbolSelected: [{
                type: Output
            }], symbolInserted: [{
                type: Output
            }] } });

class VariableManagerComponent {
    variables = [];
    allowVariableCreation = true;
    showVariableManager = false;
    variableSelected = new EventEmitter();
    variableInserted = new EventEmitter();
    variableCreated = new EventEmitter();
    variableDeleted = new EventEmitter();
    closeVariableManager = new EventEmitter();
    selectedVariable = null;
    showCreateForm = false;
    // New variable form
    newVariable = {
        name: '',
        value: '',
        type: DataType.STRING,
        explanation: '',
    };
    DataType = DataType;
    onVariableSelected(variable) {
        this.selectedVariable = variable;
        this.variableSelected.emit(variable);
    }
    onInsertVariable(variable) {
        this.variableInserted.emit(variable);
    }
    onDeleteVariable(variable, event) {
        // Stop event propagation to prevent variable selection
        event.stopPropagation();
        event.preventDefault();
        // Use setTimeout to ensure the event handling is complete before showing confirm
        setTimeout(() => {
            const confirmed = window.confirm(`Are you sure you want to delete variable "${variable.name}"?\n\nThis action cannot be undone.`);
            if (confirmed) {
                this.variableDeleted.emit(variable);
                // Clear selection if deleted variable was selected
                if (this.selectedVariable === variable) {
                    this.selectedVariable = null;
                }
            }
        }, 10);
    }
    onShowCreateForm() {
        this.showCreateForm = true;
        this.resetNewVariableForm();
    }
    onHideCreateForm() {
        this.showCreateForm = false;
        this.resetNewVariableForm();
    }
    onCreateVariable() {
        if (this.isValidNewVariable()) {
            const variable = {
                name: this.newVariable.name,
                value: this.parseVariableValue(this.newVariable.value, this.newVariable.type),
                type: this.newVariable.type,
                explanation: this.newVariable.explanation,
            };
            this.variableCreated.emit(variable);
            this.onHideCreateForm();
        }
    }
    onClose() {
        this.closeVariableManager.emit();
        this.selectedVariable = null;
        this.showCreateForm = false;
    }
    // Public methods used in template
    isValidNewVariable() {
        return !!(this.newVariable.name?.trim() &&
            this.newVariable.value !== undefined &&
            this.newVariable.explanation?.trim() &&
            this.newVariable.type);
    }
    getValuePlaceholder() {
        switch (this.newVariable.type) {
            case DataType.BOOLEAN:
                return 'true or false';
            case DataType.INTEGER:
                return 'e.g., 42, -10, 0';
            case DataType.REAL:
                return 'e.g., 3.14, -2.5, 0.0';
            case DataType.FUNCTION:
                return 'e.g., (x, y) => x + y, (n) => n * 2';
            case DataType.STRING:
            default:
                return 'e.g., "Hello World", "active"';
        }
    }
    getVariableTypeLabel(type) {
        switch (type) {
            case DataType.BOOLEAN: return 'Boolean';
            case DataType.INTEGER: return 'Integer';
            case DataType.REAL: return 'Real';
            case DataType.STRING: return 'String';
            case DataType.ASSIGNMENT: return 'Assignment';
            case DataType.FUNCTION: return 'Function';
            default: return 'Unknown';
        }
    }
    getVariableValueDisplay(variable) {
        if (variable.type === DataType.STRING) {
            return `"${variable.value}"`;
        }
        if (variable.type === DataType.FUNCTION) {
            return `${variable.value}`;
        }
        return String(variable.value);
    }
    // Private helper methods
    resetNewVariableForm() {
        this.newVariable = {
            name: '',
            value: '',
            type: DataType.STRING,
            explanation: '',
        };
    }
    parseVariableValue(value, type) {
        switch (type) {
            case DataType.BOOLEAN:
                return value === 'true' || value === true;
            case DataType.INTEGER:
                return parseInt(value, 10);
            case DataType.REAL:
                return parseFloat(value);
            case DataType.FUNCTION:
                return String(value); // Keep function as string for lambda expressions
            case DataType.STRING:
            default:
                return String(value);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: VariableManagerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.1.3", type: VariableManagerComponent, isStandalone: true, selector: "lib-variable-manager", inputs: { variables: "variables", allowVariableCreation: "allowVariableCreation", showVariableManager: "showVariableManager" }, outputs: { variableSelected: "variableSelected", variableInserted: "variableInserted", variableCreated: "variableCreated", variableDeleted: "variableDeleted", closeVariableManager: "closeVariableManager" }, ngImport: i0, template: "<div class=\"variable-manager-modal\" *ngIf=\"showVariableManager\" (click)=\"onClose()\">\r\n  <div class=\"variable-manager-content\" (click)=\"$event.stopPropagation()\">\r\n    \r\n    <!-- Header -->\r\n    <div class=\"variable-manager-header\">\r\n      <h3>Variable Manager</h3>\r\n      <button class=\"close-btn\" (click)=\"onClose()\" type=\"button\">\u00D7</button>\r\n    </div>\r\n\r\n    <!-- Variable List -->\r\n    <div class=\"variable-list\" *ngIf=\"!showCreateForm\">\r\n      <div class=\"variable-item\" \r\n           *ngFor=\"let variable of variables\" \r\n           [class.selected]=\"selectedVariable === variable\"\r\n           (click)=\"onVariableSelected(variable)\">\r\n        \r\n        <div class=\"variable-header\">\r\n          <span class=\"variable-name\">{{ variable.name }}</span>\r\n          <span class=\"variable-type\">{{ getVariableTypeLabel(variable.type) }}</span>\r\n          <span class=\"variable-value\">{{ getVariableValueDisplay(variable) }}</span>\r\n          <button \r\n            class=\"delete-btn\" \r\n            (click)=\"onDeleteVariable(variable, $event)\" \r\n            type=\"button\"\r\n            title=\"Delete variable\">\r\n            \uD83D\uDDD1\uFE0F\r\n          </button>\r\n        </div>\r\n        \r\n        <div class=\"variable-explanation\">\r\n          {{ variable.explanation }}\r\n        </div>\r\n        \r\n        <div class=\"variable-actions\" *ngIf=\"selectedVariable === variable\">\r\n          <button class=\"insert-btn\" (click)=\"onInsertVariable(variable)\" type=\"button\">\r\n            Insert Variable\r\n          </button>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"no-variables\" *ngIf=\"variables.length === 0\">\r\n        <p>No variables available.</p>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Create Variable Form -->\r\n    <div class=\"create-variable-form\" *ngIf=\"showCreateForm\">\r\n      <h4>Create New Variable</h4>\r\n      \r\n      <div class=\"form-group\">\r\n        <label for=\"variableName\">Variable Name:</label>\r\n        <input \r\n          id=\"variableName\"\r\n          type=\"text\" \r\n          [(ngModel)]=\"newVariable.name\" \r\n          placeholder=\"Enter variable name (e.g., temperature, count)\"\r\n          class=\"form-control\">\r\n      </div>\r\n\r\n      <div class=\"form-group\">\r\n        <label for=\"variableType\">Type:</label>\r\n        <select id=\"variableType\" [(ngModel)]=\"newVariable.type\" class=\"form-control\">\r\n          <option [value]=\"DataType.STRING\">String</option>\r\n          <option [value]=\"DataType.INTEGER\">Integer</option>\r\n          <option [value]=\"DataType.REAL\">Real</option>\r\n          <option [value]=\"DataType.BOOLEAN\">Boolean</option>\r\n          <option [value]=\"DataType.FUNCTION\">Function</option>\r\n        </select>\r\n      </div>\r\n\r\n      <div class=\"form-group\">\r\n        <label for=\"variableValue\">Value:</label>\r\n        <input \r\n          id=\"variableValue\"\r\n          type=\"text\" \r\n          [(ngModel)]=\"newVariable.value\" \r\n          [placeholder]=\"getValuePlaceholder()\"\r\n          class=\"form-control\">\r\n      </div>\r\n\r\n      <div class=\"form-group\">\r\n        <label for=\"variableExplanation\">Explanation:</label>\r\n        <textarea \r\n          id=\"variableExplanation\"\r\n          [(ngModel)]=\"newVariable.explanation\" \r\n          placeholder=\"Explain what this variable represents and how it's used\"\r\n          class=\"form-control explanation-textarea\"\r\n          rows=\"3\"></textarea>\r\n      </div>\r\n\r\n      <div class=\"form-actions\">\r\n        <button \r\n          class=\"create-btn\" \r\n          (click)=\"onCreateVariable()\" \r\n          [disabled]=\"!isValidNewVariable()\"\r\n          type=\"button\">\r\n          Create Variable\r\n        </button>\r\n        <button class=\"cancel-btn\" (click)=\"onHideCreateForm()\" type=\"button\">\r\n          Cancel\r\n        </button>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Footer Actions -->\r\n    <div class=\"variable-manager-footer\" *ngIf=\"!showCreateForm\">\r\n      <button \r\n        class=\"create-variable-btn\" \r\n        (click)=\"onShowCreateForm()\" \r\n        *ngIf=\"allowVariableCreation\"\r\n        type=\"button\">\r\n        + Create Variable\r\n      </button>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n", styles: [".variable-manager-modal{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;display:flex;justify-content:center;align-items:center;z-index:1000}.variable-manager-content{background:#fff;border-radius:12px;box-shadow:0 10px 30px #0003;width:90%;max-width:600px;max-height:80vh;overflow:hidden;display:flex;flex-direction:column}.variable-manager-header{display:flex;justify-content:space-between;align-items:center;padding:20px;border-bottom:1px solid #e0e0e0;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff}.variable-manager-header h3{margin:0;font-size:1.5rem;font-weight:600;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.close-btn{background:none;border:none;color:#fff;font-size:24px;cursor:pointer;padding:0;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:background-color .2s}.close-btn:hover{background-color:#fff3}.category-selection{padding:15px 20px;border-bottom:1px solid #e0e0e0;background-color:#f8f9fa}.category-selection label{font-weight:600;margin-right:10px;color:#000;font-size:.875rem;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.category-selection select{padding:8px 12px;border:1px solid #ddd;border-radius:6px;font-size:14px;background:#fff;min-width:150px}.variable-list{flex:1;overflow-y:auto;padding:10px;max-height:400px}.variable-item{border:1px solid #e0e0e0;border-radius:8px;margin-bottom:10px;padding:15px;cursor:pointer;transition:all .2s ease;background:#fff}.variable-item:hover{border-color:#667eea;box-shadow:0 2px 8px #667eea1a}.variable-item.selected{border-color:#667eea;background:linear-gradient(135deg,#667eea0d,#764ba20d)}.variable-header{display:flex;align-items:center;gap:15px;margin-bottom:8px}.variable-name{font-weight:600;color:#333;font-size:1rem;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.variable-type{background:#667eea;color:#fff;padding:2px 8px;border-radius:12px;font-size:12px;font-weight:500}.variable-value{background:#f8f9fa;color:#333;padding:6px 12px;border-radius:6px;font-family:var(--font-family-mono, \"SF Mono\", \"Cascadia Code\", \"Roboto Mono\", \"Liberation Mono\", Menlo, Monaco, Consolas, monospace);font-size:1rem;font-weight:400;flex:1;word-break:break-all;max-width:200px}.variable-explanation{color:#000;font-size:.875rem;line-height:1.4;margin-bottom:8px;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.variable-example{color:#000;font-size:.875rem;font-style:italic;margin-bottom:10px;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.variable-actions{display:flex;gap:10px;margin-top:10px}.insert-btn{background:linear-gradient(135deg,#0d6efd,#0b5ed7);color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:.875rem;font-weight:500;transition:transform .2s;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.insert-btn:hover{transform:translateY(-1px);box-shadow:0 4px 12px #0d6efd4d}.no-variables{text-align:center;padding:40px 20px;color:#666}.create-variable-form{padding:20px;flex:1;overflow-y:auto}.create-variable-form h4{margin:0 0 20px;color:#333;font-size:1.25rem;font-weight:600;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.form-group{margin-bottom:15px}.form-group label{display:block;margin-bottom:5px;font-weight:600;color:#000;font-size:.875rem;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.form-control{width:100%;padding:10px 12px;border:1px solid #ddd;border-radius:6px;font-size:14px;transition:border-color .2s;box-sizing:border-box}.form-control:focus{outline:none;border-color:#667eea;box-shadow:0 0 0 3px #667eea1a}.explanation-textarea{resize:vertical;min-height:60px}.form-actions{display:flex;gap:10px;margin-top:20px}.create-btn{background:linear-gradient(135deg,#0d6efd,#0b5ed7);color:#fff;border:none;padding:12px 24px;border-radius:6px;cursor:pointer;font-size:.875rem;font-weight:600;transition:transform .2s;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.create-btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 4px 12px #0d6efd4d}.create-btn:disabled{opacity:.5;cursor:not-allowed}.cancel-btn{background:#6c757d;color:#fff;border:none;padding:12px 24px;border-radius:6px;cursor:pointer;font-size:14px;font-weight:500;transition:background-color .2s}.cancel-btn:hover{background:#5a6268}.variable-manager-footer{display:flex;justify-content:space-between;align-items:center;padding:15px 20px;border-top:1px solid #e0e0e0;background-color:#f8f9fa}.create-variable-btn{background:linear-gradient(135deg,#0d6efd,#0b5ed7);color:#fff;border:none;padding:10px 20px;border-radius:6px;cursor:pointer;font-size:.875rem;font-weight:600;transition:transform .2s;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.create-variable-btn:hover{transform:translateY(-1px);box-shadow:0 4px 12px #0d6efd4d}.variable-count{color:#000;font-size:.875rem;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}@media (max-width: 768px){.variable-manager-content{width:95%;max-height:90vh}.variable-header{flex-direction:column;align-items:flex-start;gap:8px}.form-actions{flex-direction:column}.variable-manager-footer{flex-direction:column;gap:10px}}.delete-btn{background:#ff4757;border:none;color:#fff;padding:6px 8px;border-radius:4px;cursor:pointer;font-size:14px;transition:all .2s ease;margin-left:auto}.delete-btn:hover{background:#ff3838;transform:scale(1.1)}.delete-btn:active{transform:scale(.95)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: VariableManagerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-variable-manager', standalone: true, imports: [CommonModule, FormsModule], template: "<div class=\"variable-manager-modal\" *ngIf=\"showVariableManager\" (click)=\"onClose()\">\r\n  <div class=\"variable-manager-content\" (click)=\"$event.stopPropagation()\">\r\n    \r\n    <!-- Header -->\r\n    <div class=\"variable-manager-header\">\r\n      <h3>Variable Manager</h3>\r\n      <button class=\"close-btn\" (click)=\"onClose()\" type=\"button\">\u00D7</button>\r\n    </div>\r\n\r\n    <!-- Variable List -->\r\n    <div class=\"variable-list\" *ngIf=\"!showCreateForm\">\r\n      <div class=\"variable-item\" \r\n           *ngFor=\"let variable of variables\" \r\n           [class.selected]=\"selectedVariable === variable\"\r\n           (click)=\"onVariableSelected(variable)\">\r\n        \r\n        <div class=\"variable-header\">\r\n          <span class=\"variable-name\">{{ variable.name }}</span>\r\n          <span class=\"variable-type\">{{ getVariableTypeLabel(variable.type) }}</span>\r\n          <span class=\"variable-value\">{{ getVariableValueDisplay(variable) }}</span>\r\n          <button \r\n            class=\"delete-btn\" \r\n            (click)=\"onDeleteVariable(variable, $event)\" \r\n            type=\"button\"\r\n            title=\"Delete variable\">\r\n            \uD83D\uDDD1\uFE0F\r\n          </button>\r\n        </div>\r\n        \r\n        <div class=\"variable-explanation\">\r\n          {{ variable.explanation }}\r\n        </div>\r\n        \r\n        <div class=\"variable-actions\" *ngIf=\"selectedVariable === variable\">\r\n          <button class=\"insert-btn\" (click)=\"onInsertVariable(variable)\" type=\"button\">\r\n            Insert Variable\r\n          </button>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"no-variables\" *ngIf=\"variables.length === 0\">\r\n        <p>No variables available.</p>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Create Variable Form -->\r\n    <div class=\"create-variable-form\" *ngIf=\"showCreateForm\">\r\n      <h4>Create New Variable</h4>\r\n      \r\n      <div class=\"form-group\">\r\n        <label for=\"variableName\">Variable Name:</label>\r\n        <input \r\n          id=\"variableName\"\r\n          type=\"text\" \r\n          [(ngModel)]=\"newVariable.name\" \r\n          placeholder=\"Enter variable name (e.g., temperature, count)\"\r\n          class=\"form-control\">\r\n      </div>\r\n\r\n      <div class=\"form-group\">\r\n        <label for=\"variableType\">Type:</label>\r\n        <select id=\"variableType\" [(ngModel)]=\"newVariable.type\" class=\"form-control\">\r\n          <option [value]=\"DataType.STRING\">String</option>\r\n          <option [value]=\"DataType.INTEGER\">Integer</option>\r\n          <option [value]=\"DataType.REAL\">Real</option>\r\n          <option [value]=\"DataType.BOOLEAN\">Boolean</option>\r\n          <option [value]=\"DataType.FUNCTION\">Function</option>\r\n        </select>\r\n      </div>\r\n\r\n      <div class=\"form-group\">\r\n        <label for=\"variableValue\">Value:</label>\r\n        <input \r\n          id=\"variableValue\"\r\n          type=\"text\" \r\n          [(ngModel)]=\"newVariable.value\" \r\n          [placeholder]=\"getValuePlaceholder()\"\r\n          class=\"form-control\">\r\n      </div>\r\n\r\n      <div class=\"form-group\">\r\n        <label for=\"variableExplanation\">Explanation:</label>\r\n        <textarea \r\n          id=\"variableExplanation\"\r\n          [(ngModel)]=\"newVariable.explanation\" \r\n          placeholder=\"Explain what this variable represents and how it's used\"\r\n          class=\"form-control explanation-textarea\"\r\n          rows=\"3\"></textarea>\r\n      </div>\r\n\r\n      <div class=\"form-actions\">\r\n        <button \r\n          class=\"create-btn\" \r\n          (click)=\"onCreateVariable()\" \r\n          [disabled]=\"!isValidNewVariable()\"\r\n          type=\"button\">\r\n          Create Variable\r\n        </button>\r\n        <button class=\"cancel-btn\" (click)=\"onHideCreateForm()\" type=\"button\">\r\n          Cancel\r\n        </button>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Footer Actions -->\r\n    <div class=\"variable-manager-footer\" *ngIf=\"!showCreateForm\">\r\n      <button \r\n        class=\"create-variable-btn\" \r\n        (click)=\"onShowCreateForm()\" \r\n        *ngIf=\"allowVariableCreation\"\r\n        type=\"button\">\r\n        + Create Variable\r\n      </button>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n", styles: [".variable-manager-modal{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;display:flex;justify-content:center;align-items:center;z-index:1000}.variable-manager-content{background:#fff;border-radius:12px;box-shadow:0 10px 30px #0003;width:90%;max-width:600px;max-height:80vh;overflow:hidden;display:flex;flex-direction:column}.variable-manager-header{display:flex;justify-content:space-between;align-items:center;padding:20px;border-bottom:1px solid #e0e0e0;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff}.variable-manager-header h3{margin:0;font-size:1.5rem;font-weight:600;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.close-btn{background:none;border:none;color:#fff;font-size:24px;cursor:pointer;padding:0;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:background-color .2s}.close-btn:hover{background-color:#fff3}.category-selection{padding:15px 20px;border-bottom:1px solid #e0e0e0;background-color:#f8f9fa}.category-selection label{font-weight:600;margin-right:10px;color:#000;font-size:.875rem;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.category-selection select{padding:8px 12px;border:1px solid #ddd;border-radius:6px;font-size:14px;background:#fff;min-width:150px}.variable-list{flex:1;overflow-y:auto;padding:10px;max-height:400px}.variable-item{border:1px solid #e0e0e0;border-radius:8px;margin-bottom:10px;padding:15px;cursor:pointer;transition:all .2s ease;background:#fff}.variable-item:hover{border-color:#667eea;box-shadow:0 2px 8px #667eea1a}.variable-item.selected{border-color:#667eea;background:linear-gradient(135deg,#667eea0d,#764ba20d)}.variable-header{display:flex;align-items:center;gap:15px;margin-bottom:8px}.variable-name{font-weight:600;color:#333;font-size:1rem;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.variable-type{background:#667eea;color:#fff;padding:2px 8px;border-radius:12px;font-size:12px;font-weight:500}.variable-value{background:#f8f9fa;color:#333;padding:6px 12px;border-radius:6px;font-family:var(--font-family-mono, \"SF Mono\", \"Cascadia Code\", \"Roboto Mono\", \"Liberation Mono\", Menlo, Monaco, Consolas, monospace);font-size:1rem;font-weight:400;flex:1;word-break:break-all;max-width:200px}.variable-explanation{color:#000;font-size:.875rem;line-height:1.4;margin-bottom:8px;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.variable-example{color:#000;font-size:.875rem;font-style:italic;margin-bottom:10px;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.variable-actions{display:flex;gap:10px;margin-top:10px}.insert-btn{background:linear-gradient(135deg,#0d6efd,#0b5ed7);color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:.875rem;font-weight:500;transition:transform .2s;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.insert-btn:hover{transform:translateY(-1px);box-shadow:0 4px 12px #0d6efd4d}.no-variables{text-align:center;padding:40px 20px;color:#666}.create-variable-form{padding:20px;flex:1;overflow-y:auto}.create-variable-form h4{margin:0 0 20px;color:#333;font-size:1.25rem;font-weight:600;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.form-group{margin-bottom:15px}.form-group label{display:block;margin-bottom:5px;font-weight:600;color:#000;font-size:.875rem;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.form-control{width:100%;padding:10px 12px;border:1px solid #ddd;border-radius:6px;font-size:14px;transition:border-color .2s;box-sizing:border-box}.form-control:focus{outline:none;border-color:#667eea;box-shadow:0 0 0 3px #667eea1a}.explanation-textarea{resize:vertical;min-height:60px}.form-actions{display:flex;gap:10px;margin-top:20px}.create-btn{background:linear-gradient(135deg,#0d6efd,#0b5ed7);color:#fff;border:none;padding:12px 24px;border-radius:6px;cursor:pointer;font-size:.875rem;font-weight:600;transition:transform .2s;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.create-btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 4px 12px #0d6efd4d}.create-btn:disabled{opacity:.5;cursor:not-allowed}.cancel-btn{background:#6c757d;color:#fff;border:none;padding:12px 24px;border-radius:6px;cursor:pointer;font-size:14px;font-weight:500;transition:background-color .2s}.cancel-btn:hover{background:#5a6268}.variable-manager-footer{display:flex;justify-content:space-between;align-items:center;padding:15px 20px;border-top:1px solid #e0e0e0;background-color:#f8f9fa}.create-variable-btn{background:linear-gradient(135deg,#0d6efd,#0b5ed7);color:#fff;border:none;padding:10px 20px;border-radius:6px;cursor:pointer;font-size:.875rem;font-weight:600;transition:transform .2s;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}.create-variable-btn:hover{transform:translateY(-1px);box-shadow:0 4px 12px #0d6efd4d}.variable-count{color:#000;font-size:.875rem;font-family:var(--font-family-system, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif)}@media (max-width: 768px){.variable-manager-content{width:95%;max-height:90vh}.variable-header{flex-direction:column;align-items:flex-start;gap:8px}.form-actions{flex-direction:column}.variable-manager-footer{flex-direction:column;gap:10px}}.delete-btn{background:#ff4757;border:none;color:#fff;padding:6px 8px;border-radius:4px;cursor:pointer;font-size:14px;transition:all .2s ease;margin-left:auto}.delete-btn:hover{background:#ff3838;transform:scale(1.1)}.delete-btn:active{transform:scale(.95)}\n"] }]
        }], propDecorators: { variables: [{
                type: Input
            }], allowVariableCreation: [{
                type: Input
            }], showVariableManager: [{
                type: Input
            }], variableSelected: [{
                type: Output
            }], variableInserted: [{
                type: Output
            }], variableCreated: [{
                type: Output
            }], variableDeleted: [{
                type: Output
            }], closeVariableManager: [{
                type: Output
            }] } });

const FUNCTION_CATEGORIES = [
    {
        name: 'arithmetic',
        label: 'Arithmetic',
        functions: [
            {
                name: 'add',
                syntax: 'add(a, b)',
                description: 'Adds two numbers',
                example: 'add(5, 3) = 8',
                category: 'arithmetic'
            },
            {
                name: 'subtract',
                syntax: 'subtract(a, b)',
                description: 'Subtracts second number from first',
                example: 'subtract(10, 3) = 7',
                category: 'arithmetic'
            },
            {
                name: 'multiply',
                syntax: 'multiply(a, b)',
                description: 'Multiplies two numbers',
                example: 'multiply(4, 5) = 20',
                category: 'arithmetic'
            },
            {
                name: 'divide',
                syntax: 'divide(a, b)',
                description: 'Divides first number by second',
                example: 'divide(15, 3) = 5',
                category: 'arithmetic'
            },
            {
                name: 'power',
                syntax: 'power(base, exponent)',
                description: 'Raises base to the power of exponent',
                example: 'power(2, 3) = 8',
                category: 'arithmetic'
            },
            {
                name: 'square',
                syntax: 'square(number)',
                description: 'Returns the square of a number',
                example: 'square(5) = 25',
                category: 'arithmetic'
            },
            {
                name: 'sqrt',
                syntax: 'sqrt(number)',
                description: 'Returns square root of number',
                example: 'sqrt(16) = 4',
                category: 'arithmetic'
            },
            {
                name: 'abs',
                syntax: 'abs(number)',
                description: 'Returns absolute value',
                example: 'abs(-5) = 5',
                category: 'arithmetic'
            }
        ]
    },
    {
        name: 'relational',
        label: 'Relational',
        functions: [
            {
                name: 'equals',
                syntax: 'equals(a, b)',
                description: 'Checks if two values are equal',
                example: 'equals(5, 5) = true',
                category: 'relational'
            },
            {
                name: 'greaterThan',
                syntax: 'greaterThan(a, b)',
                description: 'Checks if first value is greater than second',
                example: 'greaterThan(10, 5) = true',
                category: 'relational'
            },
            {
                name: 'lessThan',
                syntax: 'lessThan(a, b)',
                description: 'Checks if first value is less than second',
                example: 'lessThan(3, 8) = true',
                category: 'relational'
            },
            {
                name: 'greaterThanOrEqual',
                syntax: 'greaterThanOrEqual(a, b)',
                description: 'Checks if first value is greater than or equal to second',
                example: 'greaterThanOrEqual(5, 5) = true',
                category: 'relational'
            },
            {
                name: 'lessThanOrEqual',
                syntax: 'lessThanOrEqual(a, b)',
                description: 'Checks if first value is less than or equal to second',
                example: 'lessThanOrEqual(3, 5) = true',
                category: 'relational'
            }
        ]
    },
    {
        name: 'logical',
        label: 'Logical',
        functions: [
            {
                name: 'and',
                syntax: 'and(a, b)',
                description: 'Logical AND operation',
                example: 'and(true, false) = false',
                category: 'logical'
            },
            {
                name: 'or',
                syntax: 'or(a, b)',
                description: 'Logical OR operation',
                example: 'or(true, false) = true',
                category: 'logical'
            },
            {
                name: 'not',
                syntax: 'not(value)',
                description: 'Logical NOT operation',
                example: 'not(true) = false',
                category: 'logical'
            },
            {
                name: 'if',
                syntax: 'if(condition, trueValue, falseValue)',
                description: 'Conditional expression',
                example: 'if(greaterThan(5, 3), "yes", "no") = "yes"',
                category: 'logical'
            }
        ]
    },
    {
        name: 'string',
        label: 'String',
        functions: [
            {
                name: 'concat',
                syntax: 'concat(str1, str2)',
                description: 'Concatenates two strings',
                example: 'concat("Hello", " World") = "Hello World"',
                category: 'string'
            },
            {
                name: 'length',
                syntax: 'length(string)',
                description: 'Returns length of string',
                example: 'length("Hello") = 5',
                category: 'string'
            },
            {
                name: 'substring',
                syntax: 'substring(string, start, end)',
                description: 'Extracts substring',
                example: 'substring("Hello", 1, 4) = "ell"',
                category: 'string'
            },
            {
                name: 'toUpperCase',
                syntax: 'toUpperCase(string)',
                description: 'Converts to uppercase',
                example: 'toUpperCase("hello") = "HELLO"',
                category: 'string'
            },
            {
                name: 'toLowerCase',
                syntax: 'toLowerCase(string)',
                description: 'Converts to lowercase',
                example: 'toLowerCase("HELLO") = "hello"',
                category: 'string'
            }
        ]
    }
];
// Symbol 
const SYMBOL_CATEGORIES = [
    {
        name: 'arithmetic',
        label: 'Arithmetic',
        symbols: [
            { name: 'Plus', symbol: '+', description: 'Addition operator', category: 'arithmetic' },
            { name: 'Minus', symbol: '-', description: 'Subtraction operator', category: 'arithmetic' },
            { name: 'Multiply', symbol: '*', description: 'Multiplication operator', category: 'arithmetic' },
            { name: 'Divide', symbol: '/', description: 'Division operator', category: 'arithmetic' },
            { name: 'Modulo', symbol: '%', description: 'Modulo operator', category: 'arithmetic' },
            { name: 'Power', symbol: '**', description: 'Exponentiation operator', category: 'arithmetic' }
        ]
    },
    {
        name: 'relational',
        label: 'Relational',
        symbols: [
            { name: 'Equal', symbol: '==', description: 'Equality operator', category: 'relational' },
            { name: 'Not Equal', symbol: '!=', description: 'Inequality operator', category: 'relational' },
            { name: 'Greater Than', symbol: '>', description: 'Greater than operator', category: 'relational' },
            { name: 'Less Than', symbol: '<', description: 'Less than operator', category: 'relational' },
            { name: 'Greater Equal', symbol: '>=', description: 'Greater than or equal operator', category: 'relational' },
            { name: 'Less Equal', symbol: '<=', description: 'Less than or equal operator', category: 'relational' }
        ]
    },
    {
        name: 'logical',
        label: 'Logical',
        symbols: [
            { name: 'AND', symbol: '&&', description: 'Logical AND operator', category: 'logical' },
            { name: 'OR', symbol: '||', description: 'Logical OR operator', category: 'logical' },
            { name: 'NOT', symbol: '!', description: 'Logical NOT operator', category: 'logical' },
            { name: 'Ternary If', symbol: '?:', description: 'Short if syntax (condition ? true : false)', category: 'logical' },
            { name: 'Question Mark', symbol: '?', description: 'Ternary operator condition part', category: 'logical' },
            { name: 'Colon', symbol: ':', description: 'Ternary operator separator', category: 'logical' }
        ]
    },
    {
        name: 'brackets',
        label: 'Brackets',
        symbols: [
            { name: 'Parentheses', symbol: '()', description: 'Grouping parentheses', category: 'brackets' },
            { name: 'Square Brackets', symbol: '[]', description: 'Square brackets', category: 'brackets' },
            { name: 'Curly Braces', symbol: '{}', description: 'Curly braces', category: 'brackets' },
            { name: 'Open Paren', symbol: '(', description: 'Opening parenthesis', category: 'brackets' },
            { name: 'Close Paren', symbol: ')', description: 'Closing parenthesis', category: 'brackets' }
        ]
    },
    {
        name: 'punctuation',
        label: 'Punctuation',
        symbols: [
            { name: 'Comma', symbol: ',', description: 'Comma separator', category: 'punctuation' },
            { name: 'Semicolon', symbol: ';', description: 'Semicolon', category: 'punctuation' },
            { name: 'Colon', symbol: ':', description: 'Colon', category: 'punctuation' },
            { name: 'Question Mark', symbol: '?', description: 'Question mark', category: 'punctuation' },
            { name: 'Dot', symbol: '.', description: 'Dot/period', category: 'punctuation' }
        ]
    }
];

const DEFAULT_VARIABLES = [
    {
        name: 'temperature',
        value: 25.5,
        type: DataType.REAL,
        explanation: 'Current temperature in Celsius',
        example: 'temperature > 30'
    },
    {
        name: 'status',
        value: 'active',
        type: DataType.STRING,
        explanation: 'Current system status',
        example: 'status == "active"'
    },
    {
        name: 'count',
        value: 42,
        type: DataType.INTEGER,
        explanation: 'Number of items processed',
        example: 'count * 2'
    },
    {
        name: 'isEnabled',
        value: true,
        type: DataType.BOOLEAN,
        explanation: 'Whether the feature is enabled',
        example: 'isEnabled && hasPermission'
    },
    {
        name: 'price',
        value: 99.99,
        type: DataType.REAL,
        explanation: 'Product price in currency units',
        example: 'price * quantity'
    },
    {
        name: 'quantity',
        value: 3,
        type: DataType.INTEGER,
        explanation: 'Number of items in order',
        example: 'price * quantity'
    },
    {
        name: 'fahrenheitToCelsius',
        value: '(f) => (f - 32) * 5 / 9',
        type: DataType.FUNCTION,
        explanation: 'Lambda function to convert Fahrenheit to Celsius',
        example: 'fahrenheitToCelsius(77)'
    }
];

class VariableManagerService {
    variables = [];
    constructor() {
        this.variables = [...DEFAULT_VARIABLES];
    }
    addVariable(variable) {
        const existingIndex = this.variables.findIndex(v => v.name === variable.name);
        if (existingIndex >= 0) {
            this.variables[existingIndex] = variable;
        }
        else {
            this.variables.push(variable);
        }
    }
    removeVariable(name) {
        this.variables = this.variables.filter(v => v.name !== name);
    }
    getVariables() {
        return [...this.variables];
    }
    getVariable(name) {
        return this.variables.find(v => v.name === name);
    }
    extractUsedVariables(expression) {
        const usedVariables = [];
        const variableNames = expression.match(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g) || [];
        for (const name of variableNames) {
            const variable = this.getVariable(name);
            if (variable && !usedVariables.find(v => v.name === name)) {
                usedVariables.push(variable);
            }
        }
        return usedVariables;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: VariableManagerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: VariableManagerService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: VariableManagerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

class ExpressionPatternService {
    isLambdaFunction(expression) {
        const trimmed = expression.trim();
        const lambdaPattern = /^\s*(\([^)]*\)|\w+)\s*=>\s*.+/;
        const isMatch = lambdaPattern.test(trimmed);
        return {
            isMatch,
            confidence: isMatch ? 0.95 : 0,
            details: { pattern: 'lambda', expression: trimmed }
        };
    }
    isFieldAssignment(expression) {
        const trimmed = expression.trim();
        // Updated regex to avoid matching == (equals comparison)
        const assignmentPattern = /^[a-zA-Z_$][a-zA-Z0-9_$]*(\.[a-zA-Z_$][a-zA-Z0-9_$]*)*\s*=(?!=)\s*.+/;
        const isMatch = assignmentPattern.test(trimmed);
        return {
            isMatch,
            confidence: isMatch ? 0.9 : 0,
            details: { pattern: 'assignment', expression: trimmed }
        };
    }
    isTernaryExpression(expression) {
        const trimmed = expression.trim();
        const ternaryPattern = /.*\?.*:.*/;
        const isMatch = ternaryPattern.test(trimmed);
        return {
            isMatch,
            confidence: isMatch ? 0.85 : 0,
            details: { pattern: 'ternary', expression: trimmed }
        };
    }
    isBooleanExpression(expression) {
        const trimmed = expression.trim();
        // Boolean literals
        if (/^(true|false)$/i.test(trimmed)) {
            return {
                isMatch: true,
                confidence: 1.0,
                details: { pattern: 'boolean_literal', subtype: 'literal' }
            };
        }
        // Comparison operators
        if (/[<>=!]=?|[<>]/.test(trimmed)) {
            return {
                isMatch: true,
                confidence: 0.9,
                details: { pattern: 'boolean_expression', subtype: 'comparison' }
            };
        }
        // Logical operators
        if (/&&|\|\||!/.test(trimmed)) {
            return {
                isMatch: true,
                confidence: 0.85,
                details: { pattern: 'boolean_expression', subtype: 'logical' }
            };
        }
        return { isMatch: false, confidence: 0 };
    }
    isStringLiteral(expression) {
        const trimmed = expression.trim();
        const stringPattern = /^(['"`]).*\1$/;
        const isMatch = stringPattern.test(trimmed);
        return {
            isMatch,
            confidence: isMatch ? 1.0 : 0,
            details: { pattern: 'string_literal', expression: trimmed }
        };
    }
    isNumericExpression(expression) {
        const trimmed = expression.trim();
        // Pure number
        if (/^\d+(\.\d+)?$/.test(trimmed)) {
            return {
                isMatch: true,
                confidence: 1.0,
                details: { pattern: 'numeric', subtype: 'literal' }
            };
        }
        // Contains arithmetic operators
        if (/[+\-*/%]/.test(trimmed)) {
            return {
                isMatch: true,
                confidence: 0.8,
                details: { pattern: 'numeric', subtype: 'arithmetic' }
            };
        }
        // Math functions
        if (/Math\.\w+\(/.test(trimmed)) {
            return {
                isMatch: true,
                confidence: 0.9,
                details: { pattern: 'numeric', subtype: 'math_function' }
            };
        }
        return { isMatch: false, confidence: 0 };
    }
    willReturnInteger(expression) {
        const trimmed = expression.trim();
        // Pure integer
        if (/^\d+$/.test(trimmed)) {
            return {
                isMatch: true,
                confidence: 1.0,
                details: { pattern: 'integer', subtype: 'literal' }
            };
        }
        // Contains division or decimal
        if (/[\/.]/.test(trimmed)) {
            return {
                isMatch: false,
                confidence: 0,
                details: { pattern: 'real', reason: 'contains_division_or_decimal' }
            };
        }
        // Integer arithmetic operations
        if (/^[\d\s+\-*()]+$/.test(trimmed)) {
            return {
                isMatch: true,
                confidence: 0.9,
                details: { pattern: 'integer', subtype: 'arithmetic' }
            };
        }
        // Math functions that return integers
        const integerMathFunctions = ['Math.abs', 'Math.ceil', 'Math.floor', 'Math.round', 'Math.trunc'];
        for (const func of integerMathFunctions) {
            if (trimmed.includes(func)) {
                return {
                    isMatch: true,
                    confidence: 0.85,
                    details: { pattern: 'integer', subtype: 'math_function', function: func }
                };
            }
        }
        return { isMatch: false, confidence: 0 };
    }
    containsArithmeticOperators(expression) {
        const trimmed = expression.trim();
        const arithmeticPattern = /[+\-*/%]/;
        const isMatch = arithmeticPattern.test(trimmed);
        const operators = trimmed.match(/[+\-*/%]/g) || [];
        return {
            isMatch,
            confidence: isMatch ? 0.8 : 0,
            details: {
                pattern: 'arithmetic_operators',
                operators: operators,
                count: operators.length
            }
        };
    }
    hasOnlyIntegerArguments(expression) {
        const trimmed = expression.trim();
        // Extract function arguments
        const functionMatch = trimmed.match(/\w+\(([^)]+)\)/);
        if (!functionMatch) {
            return { isMatch: false, confidence: 0 };
        }
        const args = functionMatch[1].split(',').map(arg => arg.trim());
        const allInteger = args.every(arg => /^\d+$/.test(arg));
        return {
            isMatch: allInteger,
            confidence: allInteger ? 0.9 : 0,
            details: {
                pattern: 'integer_arguments',
                arguments: args,
                allInteger
            }
        };
    }
    analyzeComplexity(expression) {
        const trimmed = expression.trim();
        let score = 0;
        const factors = [];
        // Length factor
        if (trimmed.length > 50) {
            score += 2;
            factors.push('long_expression');
        }
        // Nested parentheses
        const parenDepth = this.getMaxParenthesesDepth(trimmed);
        if (parenDepth > 2) {
            score += parenDepth;
            factors.push('deep_nesting');
        }
        // Function calls
        const functionCalls = (trimmed.match(/\w+\(/g) || []).length;
        if (functionCalls > 2) {
            score += functionCalls;
            factors.push('multiple_functions');
        }
        // Operators
        const operators = (trimmed.match(/[+\-*/%=<>!&|]/g) || []).length;
        if (operators > 3) {
            score += Math.floor(operators / 2);
            factors.push('many_operators');
        }
        // Variables
        const variables = (trimmed.match(/[a-zA-Z_$][a-zA-Z0-9_$]*/g) || []).length;
        if (variables > 3) {
            score += Math.floor(variables / 2);
            factors.push('many_variables');
        }
        let level;
        if (score <= 2)
            level = 'simple';
        else if (score <= 5)
            level = 'moderate';
        else if (score <= 10)
            level = 'complex';
        else
            level = 'very_complex';
        return { level, score, factors };
    }
    getMaxParenthesesDepth(expression) {
        let maxDepth = 0;
        let currentDepth = 0;
        for (const char of expression) {
            if (char === '(') {
                currentDepth++;
                maxDepth = Math.max(maxDepth, currentDepth);
            }
            else if (char === ')') {
                currentDepth--;
            }
        }
        return maxDepth;
    }
    extractPatterns(expression) {
        const patterns = [];
        patterns.push(this.isLambdaFunction(expression));
        patterns.push(this.isFieldAssignment(expression));
        patterns.push(this.isTernaryExpression(expression));
        patterns.push(this.isBooleanExpression(expression));
        patterns.push(this.isStringLiteral(expression));
        patterns.push(this.isNumericExpression(expression));
        patterns.push(this.containsArithmeticOperators(expression));
        return patterns.filter(pattern => pattern.isMatch);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ExpressionPatternService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ExpressionPatternService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ExpressionPatternService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class TypeAnalyzerService {
    variableManager;
    patternService;
    constructor(variableManager, patternService) {
        this.variableManager = variableManager;
        this.patternService = patternService;
    }
    analyzeExpressionReturnType(expression) {
        const trimmed = expression.trim();
        const lambdaMatch = this.patternService.isLambdaFunction(trimmed);
        if (lambdaMatch.isMatch) {
            return DataType.FUNCTION;
        }
        const assignmentMatch = this.patternService.isFieldAssignment(trimmed);
        if (assignmentMatch.isMatch) {
            return DataType.ASSIGNMENT;
        }
        const ternaryMatch = this.patternService.isTernaryExpression(trimmed);
        if (ternaryMatch.isMatch) {
            const ternaryType = this.analyzeTernaryReturnType(trimmed);
            if (ternaryType) {
                return ternaryType;
            }
            return DataType.REAL;
        }
        const booleanMatch = this.patternService.isBooleanExpression(trimmed);
        if (booleanMatch.isMatch) {
            return DataType.BOOLEAN;
        }
        const stringMatch = this.patternService.isStringLiteral(trimmed);
        if (stringMatch.isMatch) {
            return DataType.STRING;
        }
        const numericMatch = this.patternService.isNumericExpression(trimmed);
        if (numericMatch.isMatch) {
            const integerMatch = this.patternService.willReturnInteger(trimmed);
            if (integerMatch.isMatch) {
                return DataType.INTEGER;
            }
            else {
                return DataType.REAL;
            }
        }
        const singleVariable = this.variableManager.getVariable(trimmed);
        if (singleVariable) {
            return singleVariable.type;
        }
        return DataType.REAL;
    }
    analyzeTernaryReturnType(expression) {
        const qIndex = expression.indexOf('?');
        const cIndex = expression.lastIndexOf(':');
        if (qIndex < 0 || cIndex < 0 || qIndex < 1 || cIndex <= qIndex + 1) {
            return null;
        }
        const whenTrue = expression.slice(qIndex + 1, cIndex).trim();
        const whenFalse = expression.slice(cIndex + 1).trim();
        const trueType = this.analyzeExpressionReturnType(whenTrue);
        const falseType = this.analyzeExpressionReturnType(whenFalse);
        if (trueType === falseType) {
            return trueType;
        }
        const numericTypes = [DataType.INTEGER, DataType.REAL];
        if (numericTypes.includes(trueType) && numericTypes.includes(falseType)) {
            return (trueType === DataType.INTEGER && falseType === DataType.INTEGER)
                ? DataType.INTEGER
                : DataType.REAL;
        }
        if ((trueType === DataType.STRING && falseType !== DataType.ASSIGNMENT && falseType !== DataType.FUNCTION) ||
            (falseType === DataType.STRING && trueType !== DataType.ASSIGNMENT && trueType !== DataType.FUNCTION)) {
            return DataType.STRING;
        }
        return DataType.REAL;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: TypeAnalyzerService, deps: [{ token: VariableManagerService }, { token: ExpressionPatternService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: TypeAnalyzerService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: TypeAnalyzerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: VariableManagerService }, { type: ExpressionPatternService }] });

class ValidationService {
    validateExpressionType(expression, returnType, config) {
        let result;
        switch (config.contextType) {
            case ContextType.BOOLEAN:
                result = this.validateBooleanContext(expression, returnType, config);
                break;
            case ContextType.ASSIGNMENT:
                result = this.validateAssignmentContext(expression, returnType, config);
                break;
            case ContextType.ARITHMETIC:
                result = this.validateArithmeticContext(expression, returnType, config);
                break;
            case ContextType.LIMITED_CONNECTOR:
                result = this.validateLimitedConnectorContext(expression, returnType, config);
                break;
            case ContextType.GENERAL:
                result = {
                    isValid: true,
                    message: 'Expression is valid',
                    expectedType: config.expectedResultType,
                    actualType: returnType,
                    contextType: config.contextType
                };
                break;
            default:
                result = {
                    isValid: true,
                    message: 'Expression is valid',
                    expectedType: config.expectedResultType,
                    actualType: returnType,
                    contextType: config.contextType
                };
        }
        // Log validation result to console
        console.log(`%c${result.isValid ? '✓' : '✗'} Validation: ${result.message}`, `color: ${result.isValid ? '#4ade80' : '#f87171'}; font-weight: bold;`);
        return result;
    }
    validateBooleanContext(expression, returnType, config) {
        const isLambdaFunction = this.isLambdaFunction(expression);
        if (isLambdaFunction) {
            return {
                isValid: false,
                message: 'Lambda functions are not allowed in boolean context. Use boolean expressions like "status == \'active\'" or "temperature > 25"',
                expectedType: DataType.BOOLEAN,
                actualType: DataType.FUNCTION,
                contextType: config.contextType
            };
        }
        const isBoolean = returnType === DataType.BOOLEAN;
        return {
            isValid: isBoolean,
            message: isBoolean ? 'Valid boolean expression' : 'Expression must return a boolean value',
            expectedType: DataType.BOOLEAN,
            actualType: returnType,
            contextType: config.contextType
        };
    }
    validateAssignmentContext(expression, returnType, config) {
        const isLambdaFunction = this.isLambdaFunction(expression);
        if (isLambdaFunction) {
            return {
                isValid: false,
                message: 'Lambda functions are not allowed in assignment context. Use assignment expressions like "output.value = input.data"',
                expectedType: DataType.ASSIGNMENT,
                actualType: DataType.FUNCTION,
                contextType: config.contextType
            };
        }
        const isAssignment = returnType === DataType.ASSIGNMENT;
        return {
            isValid: isAssignment,
            message: isAssignment ? 'Valid assignment expression' : 'Expression must be an assignment (e.g., field = value)',
            expectedType: DataType.ASSIGNMENT,
            actualType: returnType,
            contextType: config.contextType
        };
    }
    validateArithmeticContext(expression, returnType, config) {
        const isLambdaFunction = this.isLambdaFunction(expression);
        if (isLambdaFunction) {
            return {
                isValid: false,
                message: 'Lambda functions are not allowed in arithmetic context. Use mathematical expressions like "price * quantity"',
                expectedType: DataType.REAL,
                actualType: DataType.FUNCTION,
                contextType: config.contextType
            };
        }
        const isNumeric = returnType === DataType.INTEGER || returnType === DataType.REAL;
        return {
            isValid: isNumeric,
            message: isNumeric ? 'Valid arithmetic expression' : 'Expression must return a numeric value',
            expectedType: DataType.REAL,
            actualType: returnType,
            contextType: config.contextType
        };
    }
    validateLimitedConnectorContext(expression, returnType, config) {
        const isLambdaFunction = this.isLambdaFunction(expression);
        if (isLambdaFunction) {
            return {
                isValid: false,
                message: 'Lambda functions are not allowed in limited connector context. Use simple arithmetic expressions like "a + b"',
                expectedType: DataType.REAL,
                actualType: DataType.FUNCTION,
                contextType: ContextType.LIMITED_CONNECTOR
            };
        }
        const hasOnlyAllowedOperators = this.hasOnlyAllowedArithmeticOperators(expression, config);
        const isNumeric = returnType === DataType.INTEGER || returnType === DataType.REAL;
        const hasDivision = expression.includes('/');
        const divisionAllowed = config.allowDivision !== false;
        return {
            isValid: hasOnlyAllowedOperators && isNumeric && (divisionAllowed || !hasDivision),
            message: !divisionAllowed && hasDivision
                ? 'Division (/) operator is not allowed in this context'
                : hasOnlyAllowedOperators && isNumeric
                    ? 'Valid limited connector expression'
                    : 'Expression must use only allowed operators and return a numeric value',
            expectedType: DataType.REAL,
            actualType: returnType,
            contextType: ContextType.LIMITED_CONNECTOR
        };
    }
    hasOnlyAllowedArithmeticOperators(expression, config) {
        // Check for disallowed function calls like Math.sqrt, Math.pow, etc.
        if (/Math\.|[a-zA-Z_][a-zA-Z0-9_]*\s*\(/.test(expression)) {
            return false;
        }
        const operators = expression.replace(/[\d\w\s().,]/g, '');
        if (config.allowDivision === false) {
            // Only allow +, -, * (no division)
            return /^[+\-*]*$/.test(operators);
        }
        else {
            // Allow +, -, *, /
            return /^[+\-*/]*$/.test(operators);
        }
    }
    isLambdaFunction(expression) {
        // Detect lambda function patterns 
        return /^\s*(\([^)]*\)|\w+)\s*=>\s*.+/.test(expression.trim());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ValidationService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ValidationService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ValidationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class TokenizerService {
    tokenize(expression) {
        const tokens = [];
        let i = 0;
        while (i < expression.length) {
            const char = expression[i];
            // Skip whitespace
            if (/\s/.test(char)) {
                i++;
                continue;
            }
            // Handle operators
            if (this.isOperator(char)) {
                const operator = this.parseOperator(expression, i);
                tokens.push({
                    type: 'operator',
                    value: operator,
                    position: i
                });
                i += operator.length;
                continue;
            }
            // Handle parentheses
            if (char === '(' || char === ')') {
                tokens.push({
                    type: 'parenthesis',
                    value: char,
                    position: i
                });
                i++;
                continue;
            }
            // Handle comma
            if (char === ',') {
                tokens.push({
                    type: 'comma',
                    value: char,
                    position: i
                });
                i++;
                continue;
            }
            // Handle string literals
            if (char === '"' || char === "'") {
                const stringLiteral = this.parseStringLiteral(expression, i);
                tokens.push({
                    type: 'literal',
                    value: stringLiteral.value,
                    position: i
                });
                i = stringLiteral.endIndex;
                continue;
            }
            // Handle numbers
            if (/\d/.test(char) || (char === '.' && /\d/.test(expression[i + 1]))) {
                const number = this.parseNumber(expression, i);
                tokens.push({
                    type: 'literal',
                    value: number.value,
                    position: i
                });
                i = number.endIndex;
                continue;
            }
            // Handle identifiers (variables/functions)
            if (/[a-zA-Z_$]/.test(char)) {
                const identifier = this.parseIdentifier(expression, i);
                const nextChar = expression[identifier.endIndex];
                tokens.push({
                    type: nextChar === '(' ? 'function' : 'variable',
                    value: identifier.value,
                    position: i
                });
                i = identifier.endIndex;
                continue;
            }
            // Unknown character - skip it
            i++;
        }
        return tokens;
    }
    isOperator(char) {
        return /[+\-*/%=!<>&|^~]/.test(char);
    }
    parseOperator(expression, startIndex) {
        const char = expression[startIndex];
        const nextChar = expression[startIndex + 1];
        // Two-character operators
        const twoChar = char + nextChar;
        if (['==', '!=', '<=', '>=', '&&', '||', '=>'].includes(twoChar)) {
            return twoChar;
        }
        return char;
    }
    parseStringLiteral(expression, startIndex) {
        const quote = expression[startIndex];
        let i = startIndex + 1;
        let value = '';
        while (i < expression.length && expression[i] !== quote) {
            if (expression[i] === '\\' && i + 1 < expression.length) {
                // Handle escape sequences
                i++;
                const escaped = expression[i];
                switch (escaped) {
                    case 'n':
                        value += '\n';
                        break;
                    case 't':
                        value += '\t';
                        break;
                    case 'r':
                        value += '\r';
                        break;
                    case '\\':
                        value += '\\';
                        break;
                    case '"':
                        value += '"';
                        break;
                    case "'":
                        value += "'";
                        break;
                    default:
                        value += escaped;
                        break;
                }
            }
            else {
                value += expression[i];
            }
            i++;
        }
        return {
            value: quote + value + quote, // Include quotes in the value
            endIndex: i + 1
        };
    }
    parseNumber(expression, startIndex) {
        let i = startIndex;
        let value = '';
        let hasDecimal = false;
        while (i < expression.length) {
            const char = expression[i];
            if (/\d/.test(char)) {
                value += char;
            }
            else if (char === '.' && !hasDecimal && /\d/.test(expression[i + 1])) {
                hasDecimal = true;
                value += char;
            }
            else {
                break;
            }
            i++;
        }
        return { value, endIndex: i };
    }
    parseIdentifier(expression, startIndex) {
        let i = startIndex;
        let value = '';
        while (i < expression.length && /[a-zA-Z0-9_$.]/.test(expression[i])) {
            value += expression[i];
            i++;
        }
        return { value, endIndex: i };
    }
    validateTokens(tokens) {
        const errors = [];
        // Check for empty token list
        if (tokens.length === 0) {
            errors.push('No tokens found');
            return { isValid: false, errors };
        }
        // Check for balanced parentheses
        let parenthesesCount = 0;
        for (const token of tokens) {
            if (token.type === 'parenthesis') {
                if (token.value === '(') {
                    parenthesesCount++;
                }
                else {
                    parenthesesCount--;
                    if (parenthesesCount < 0) {
                        errors.push('Unmatched closing parenthesis');
                        break;
                    }
                }
            }
        }
        if (parenthesesCount > 0) {
            errors.push('Unmatched opening parenthesis');
        }
        // Check for consecutive operators
        for (let i = 0; i < tokens.length - 1; i++) {
            const current = tokens[i];
            const next = tokens[i + 1];
            if (current.type === 'operator' && next.type === 'operator') {
                errors.push(`Consecutive operators: ${current.value} ${next.value}`);
            }
        }
        return {
            isValid: errors.length === 0,
            errors
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: TokenizerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: TokenizerService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: TokenizerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class BinaryTreeParserService {
    tokenizerService;
    tokens = [];
    currentIndex = 0;
    constructor(tokenizerService) {
        this.tokenizerService = tokenizerService;
    }
    parseExpression(expression) {
        try {
            if (!expression || expression.trim().length === 0) {
                return {
                    success: false,
                    error: 'Expression is empty'
                };
            }
            // Use TokenizerService instead of internal tokenization
            this.tokens = this.tokenizerService.tokenize(expression);
            this.currentIndex = 0;
            // Validate tokens using TokenizerService
            const validation = this.tokenizerService.validateTokens(this.tokens);
            if (!validation.isValid) {
                return {
                    success: false,
                    error: `Tokenization error: ${validation.errors.join(', ')}`
                };
            }
            if (this.tokens.length === 0) {
                return {
                    success: false,
                    error: 'No valid tokens found'
                };
            }
            const tree = this.parseOrExpression();
            if (this.currentIndex < this.tokens.length) {
                return {
                    success: false,
                    error: `Unexpected token: ${this.tokens[this.currentIndex].value}`
                };
            }
            const json = JSON.stringify(tree, null, 2);
            return {
                success: true,
                tree: tree,
                json: json
            };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Parse error'
            };
        }
    }
    parseOrExpression() {
        let left = this.parseAndExpression();
        while (this.currentIndex < this.tokens.length && this.tokens[this.currentIndex].value === '||') {
            const operator = this.tokens[this.currentIndex].value;
            this.currentIndex++;
            const right = this.parseAndExpression();
            left = {
                type: 'operator',
                value: operator,
                left: left,
                right: right
            };
        }
        return left;
    }
    parseAndExpression() {
        let left = this.parseEqualityExpression();
        while (this.currentIndex < this.tokens.length && this.tokens[this.currentIndex].value === '&&') {
            const operator = this.tokens[this.currentIndex].value;
            this.currentIndex++;
            const right = this.parseEqualityExpression();
            left = {
                type: 'operator',
                value: operator,
                left: left,
                right: right
            };
        }
        return left;
    }
    parseEqualityExpression() {
        let left = this.parseRelationalExpression();
        while (this.currentIndex < this.tokens.length && ['==', '!='].includes(this.tokens[this.currentIndex].value)) {
            const operator = this.tokens[this.currentIndex].value;
            this.currentIndex++;
            const right = this.parseRelationalExpression();
            left = {
                type: 'operator',
                value: operator,
                left: left,
                right: right
            };
        }
        return left;
    }
    parseRelationalExpression() {
        let left = this.parseAssignmentExpression();
        while (this.currentIndex < this.tokens.length && ['<', '>', '<=', '>='].includes(this.tokens[this.currentIndex].value)) {
            const operator = this.tokens[this.currentIndex].value;
            this.currentIndex++;
            const right = this.parseAssignmentExpression();
            left = {
                type: 'operator',
                value: operator,
                left: left,
                right: right
            };
        }
        return left;
    }
    parseAssignmentExpression() {
        let left = this.parseAdditiveExpression();
        while (this.currentIndex < this.tokens.length && this.tokens[this.currentIndex].value === '=') {
            const operator = this.tokens[this.currentIndex].value;
            this.currentIndex++;
            const right = this.parseAdditiveExpression();
            left = {
                type: 'operator',
                value: operator,
                left: left,
                right: right
            };
        }
        return left;
    }
    parseAdditiveExpression() {
        let left = this.parseMultiplicativeExpression();
        while (this.currentIndex < this.tokens.length && ['+', '-'].includes(this.tokens[this.currentIndex].value)) {
            const operator = this.tokens[this.currentIndex].value;
            this.currentIndex++;
            const right = this.parseMultiplicativeExpression();
            left = {
                type: 'operator',
                value: operator,
                left: left,
                right: right
            };
        }
        return left;
    }
    parseMultiplicativeExpression() {
        let left = this.parseUnaryExpression();
        while (this.currentIndex < this.tokens.length && ['*', '/'].includes(this.tokens[this.currentIndex].value)) {
            const operator = this.tokens[this.currentIndex].value;
            this.currentIndex++;
            const right = this.parseUnaryExpression();
            left = {
                type: 'operator',
                value: operator,
                left: left,
                right: right
            };
        }
        return left;
    }
    parseUnaryExpression() {
        if (this.currentIndex < this.tokens.length && ['+', '-', '!'].includes(this.tokens[this.currentIndex].value)) {
            const operator = this.tokens[this.currentIndex].value;
            this.currentIndex++;
            const operand = this.parseUnaryExpression();
            return {
                type: 'operator',
                value: operator,
                right: operand
            };
        }
        return this.parsePrimaryExpression();
    }
    parsePrimaryExpression() {
        if (this.currentIndex >= this.tokens.length) {
            throw new Error('Unexpected end of expression');
        }
        const token = this.tokens[this.currentIndex];
        // Parentheses
        if (token.value === '(') {
            this.currentIndex++;
            const expr = this.parseOrExpression();
            if (this.currentIndex >= this.tokens.length || this.tokens[this.currentIndex].value !== ')') {
                throw new Error('Missing closing parenthesis');
            }
            this.currentIndex++;
            return expr;
        }
        // String literals
        if (typeof token.value === 'string' && (token.value.startsWith('"') || token.value.startsWith("'"))) {
            this.currentIndex++;
            return {
                type: 'literal',
                value: token.value.slice(1, -1) // Remove quotes
            };
        }
        // Numbers
        if (typeof token.value === 'string' && /^\d+(\.\d+)?$/.test(token.value)) {
            this.currentIndex++;
            const numValue = parseFloat(token.value);
            return {
                type: 'literal',
                value: numValue
            };
        }
        // Boolean literals
        if (token.value === 'true' || token.value === 'false') {
            this.currentIndex++;
            return {
                type: 'literal',
                value: token.value === 'true'
            };
        }
        // Function calls
        if (this.currentIndex + 1 < this.tokens.length && this.tokens[this.currentIndex + 1].value === '(') {
            const functionName = token.value;
            this.currentIndex += 2; // Skip function name and '('
            const args = [];
            // Parse arguments
            if (this.currentIndex < this.tokens.length && this.tokens[this.currentIndex].value !== ')') {
                args.push(this.parseOrExpression());
                while (this.currentIndex < this.tokens.length && this.tokens[this.currentIndex].value === ',') {
                    this.currentIndex++; // Skip comma
                    args.push(this.parseOrExpression());
                }
            }
            if (this.currentIndex >= this.tokens.length || this.tokens[this.currentIndex].value !== ')') {
                throw new Error('Missing closing parenthesis in function call');
            }
            this.currentIndex++; // Skip ')'
            return {
                type: 'function',
                value: functionName,
                children: args
            };
        }
        // Variables
        this.currentIndex++;
        return {
            type: 'variable',
            value: token.value
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: BinaryTreeParserService, deps: [{ token: TokenizerService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: BinaryTreeParserService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: BinaryTreeParserService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: TokenizerService }] });

class ConfigurationService {
    getAssignmentConfig() {
        return {
            expectedResultType: DataType.ASSIGNMENT,
            contextType: ContextType.ASSIGNMENT,
            strictValidation: true,
            title: 'Assignment Expression Editor',
            description: 'Enter assignment expressions for data mapping',
            placeholder: 'Enter assignment (e.g., output = input * 2)',
            examples: [
                'output.value = input.data',
                'result = transform(source)',
                'target.field = source.value * 2',
                'destination = calculation + offset'
            ]
        };
    }
    getLimitedConnectorConfig(allowDivision = false) {
        return {
            expectedResultType: DataType.REAL,
            contextType: ContextType.LIMITED_CONNECTOR,
            strictValidation: true,
            allowDivision: allowDivision,
            title: 'Limited Connector Expression Editor',
            description: allowDivision
                ? 'Enter arithmetic expressions using +, -, *, / operations'
                : 'Enter arithmetic expressions using +, -, * operations (division disabled)',
            placeholder: allowDivision
                ? 'Enter arithmetic expression (e.g., a + b, x * y / 2)'
                : 'Enter arithmetic expression (e.g., a + b, x * y)',
        };
    }
    getBooleanConfig() {
        return {
            expectedResultType: DataType.BOOLEAN,
            contextType: ContextType.BOOLEAN,
            strictValidation: true,
            title: 'Boolean Expression Editor',
            description: 'Enter boolean expressions for conditions and state machines',
            placeholder: 'Enter boolean condition (e.g., status == "active", value > 10)',
        };
    }
    getArithmeticConfig() {
        return {
            expectedResultType: DataType.REAL,
            contextType: ContextType.ARITHMETIC,
            strictValidation: true,
            title: 'Arithmetic Expression Editor',
            description: 'Enter mathematical expressions for calculations',
            placeholder: 'Enter a mathematical expression (e.g., price * quantity)',
        };
    }
    getConnectorConfig() {
        return this.getAssignmentConfig();
    }
    getGeneralConfig() {
        return {
            expectedResultType: DataType.REAL,
            contextType: ContextType.GENERAL,
            strictValidation: false,
            title: 'General Expression Editor',
            description: 'Enter any type of expression',
            placeholder: 'Enter your expression here...',
        };
    }
    getPlaceholderForType(config) {
        switch (config.contextType) {
            case ContextType.BOOLEAN:
                return 'Enter boolean condition (e.g., status == "active", value > 10)';
            case ContextType.ASSIGNMENT:
                return 'Enter assignment (e.g., output = input * 2)';
            case ContextType.LIMITED_CONNECTOR:
                return 'Enter arithmetic expression (e.g., a + b, price * quantity)';
            case ContextType.ARITHMETIC:
                return 'Enter mathematical expression (e.g., Math.sqrt(x), (a + b) / 2)';
            case ContextType.GENERAL:
                return 'Enter your expression here...';
            default:
                return 'Enter your expression here...';
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ConfigurationService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ConfigurationService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ConfigurationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class ExpressionEvaluatorService {
    typeAnalyzer;
    validator;
    variableManager;
    binaryTreeParser;
    configurationService;
    constructor(typeAnalyzer, validator, variableManager, binaryTreeParser, configurationService) {
        this.typeAnalyzer = typeAnalyzer;
        this.validator = validator;
        this.variableManager = variableManager;
        this.binaryTreeParser = binaryTreeParser;
        this.configurationService = configurationService;
    }
    addVariable(variable) {
        this.variableManager.addVariable(variable);
    }
    removeVariable(name) {
        this.variableManager.removeVariable(name);
    }
    getVariables() {
        return this.variableManager.getVariables();
    }
    getVariable(name) {
        return this.variableManager.getVariable(name);
    }
    identifyExpressionType(expression, config) {
        if (!expression || expression.trim().length === 0) {
            return {
                success: false,
                error: 'Expression is empty'
            };
        }
        try {
            // Check if it's a lambda function or ternary expression first
            const isLambdaExpression = this.isLambdaFunction(expression);
            const isTernaryExpression = this.isTernaryExpression(expression);
            // Parse binary tree only if it's NOT a lambda function or ternary expression
            let parseResult = null;
            if (!isLambdaExpression && !isTernaryExpression) {
                parseResult = this.binaryTreeParser.parseExpression(expression);
                if (!parseResult.success) {
                    return {
                        success: false,
                        error: parseResult.error || 'Parse error'
                    };
                }
            }
            // Analyze return type
            const returnType = this.typeAnalyzer.analyzeExpressionReturnType(expression);
            // Get used variables
            const usedVariables = this.variableManager.extractUsedVariables(expression);
            const result = {
                success: true,
                returnType: returnType,
                binaryTree: parseResult || undefined, // Only include if available
                usedVariables: usedVariables,
                isLambdaExpression: isLambdaExpression
            };
            // Add type validation if config is provided
            if (config) {
                const typeValidation = this.validator.validateExpressionType(expression, returnType, config);
                result.typeValidation = typeValidation;
            }
            return result;
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown analysis error'
            };
        }
    }
    isLambdaFunction(expression) {
        // Detect lambda function
        return /^\s*(\([^)]*\)|\w+)\s*=>\s*.+/.test(expression.trim());
    }
    getAssignmentConfig() {
        return this.configurationService.getAssignmentConfig();
    }
    getLimitedConnectorConfig(allowDivision = false) {
        return this.configurationService.getLimitedConnectorConfig(allowDivision);
    }
    getBooleanConfig() {
        return this.configurationService.getBooleanConfig();
    }
    getArithmeticConfig() {
        return this.configurationService.getArithmeticConfig();
    }
    getConnectorConfig() {
        return this.configurationService.getConnectorConfig();
    }
    getGeneralConfig() {
        return this.configurationService.getGeneralConfig();
    }
    getPlaceholderForType(config) {
        return this.configurationService.getPlaceholderForType(config);
    }
    isTernaryExpression(expression) {
        // Detect ternary/conditional expressions like: condition ? value1 : value2
        return /\?.*:/.test(expression.trim());
    }
    transformToBackend(expression, mappings) {
        let transformed = expression;
        // Replace frontend variable names with backend names
        mappings.forEach(mapping => {
            const regex = new RegExp(this.escapeRegex(mapping.frontendName), 'g');
            transformed = transformed.replace(regex, mapping.backendName);
        });
        return transformed;
    }
    transformToFrontend(expression, mappings) {
        let transformed = expression;
        // Replace backend variable names with frontend names
        mappings.forEach(mapping => {
            const regex = new RegExp(this.escapeRegex(mapping.backendName), 'g');
            transformed = transformed.replace(regex, mapping.frontendName);
        });
        return transformed;
    }
    escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ExpressionEvaluatorService, deps: [{ token: TypeAnalyzerService }, { token: ValidationService }, { token: VariableManagerService }, { token: BinaryTreeParserService }, { token: ConfigurationService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ExpressionEvaluatorService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ExpressionEvaluatorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: TypeAnalyzerService }, { type: ValidationService }, { type: VariableManagerService }, { type: BinaryTreeParserService }, { type: ConfigurationService }] });

class ExpressionEditorComponent {
    evaluatorService;
    extensionManager;
    disabled = false;
    editorConfig;
    simpleMode = false;
    textareaStyle;
    placeholder;
    expressionChange = new EventEmitter();
    validationChange = new EventEmitter();
    configChange = new EventEmitter();
    binaryTreeChange = new EventEmitter();
    fieldMappingChange = new EventEmitter();
    expressionTextarea;
    value = '';
    typeResult = null;
    currentValidation = null;
    showFunctionsMenu = false;
    showSymbolPicker = false;
    showCustomFunctionBuilder = false;
    showVariableManager = false;
    selectedFunction = null;
    selectedSymbol = null;
    selectedFunctionCategory = 'arithmetic';
    selectedSymbolCategory = 'arithmetic';
    onChange = (value) => { };
    onTouched = () => { };
    debounceTimer = null;
    debounceDelay = 1000;
    functionCategories = [];
    symbolCategories = SYMBOL_CATEGORIES;
    constructor(evaluatorService, extensionManager) {
        this.evaluatorService = evaluatorService;
        this.extensionManager = extensionManager;
        this.initializeFunctionCategories();
    }
    initializeFunctionCategories() {
        this.functionCategories = [...FUNCTION_CATEGORIES];
        this.functionCategories.push({
            name: 'custom',
            label: 'Custom Functions',
            functions: []
        });
    }
    get enhancedConfig() {
        return this.editorConfig;
    }
    get variables() {
        const configVariables = this.enhancedConfig?.variables || [];
        const serviceVariables = this.evaluatorService.getVariables();
        const mergedVariables = [...configVariables];
        for (const serviceVar of serviceVariables) {
            const existingIndex = mergedVariables.findIndex(v => v.name === serviceVar.name);
            if (existingIndex >= 0) {
                mergedVariables[existingIndex] = serviceVar;
            }
            else {
                mergedVariables.push(serviceVar);
            }
        }
        return mergedVariables;
    }
    onValueChange(value) {
        this.value = value;
        this.onChange(this.value);
        this.expressionChange.emit(this.value);
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        this.debounceTimer = setTimeout(() => {
            this.analyzeExpression();
        }, this.debounceDelay);
    }
    onTextareaBlur() {
        this.onTouched();
    }
    onToggleEditor() {
        this.disabled = !this.disabled;
    }
    onClearExpression() {
        this.value = '';
        this.onChange(this.value);
        this.expressionChange.emit(this.value);
        this.typeResult = null;
        this.validationChange.emit(null);
        this.binaryTreeChange.emit(null);
    }
    onConfigChange(newConfig) {
        this.editorConfig = newConfig;
        this.configChange.emit(newConfig);
        if (this.value.trim())
            this.analyzeExpression();
    }
    onOpenFunctionsMenu() { this.showFunctionsMenu = true; }
    onCloseFunctionsMenu() {
        this.showFunctionsMenu = false;
        this.selectedFunction = null;
    }
    onFunctionCategorySelected(category) {
        this.selectedFunctionCategory = category;
        this.selectedFunction = null;
    }
    onFunctionSelected(func) { this.selectedFunction = func; }
    onFunctionInserted(func) {
        this.insertTextAtCursor(func.syntax);
        this.onCloseFunctionsMenu();
    }
    onOpenSymbolPicker() { this.showSymbolPicker = true; }
    onCloseSymbolPicker() {
        this.showSymbolPicker = false;
        this.selectedSymbol = null;
    }
    onSymbolCategorySelected(category) {
        this.selectedSymbolCategory = category;
        this.selectedSymbol = null;
    }
    onSymbolSelected(symbol) { this.selectedSymbol = symbol; }
    onSymbolInserted(symbol) {
        this.insertTextAtCursor(symbol.symbol);
        this.onCloseSymbolPicker();
    }
    onOpenCustomFunctionBuilder() { this.showCustomFunctionBuilder = true; }
    onCloseCustomFunctionBuilder() { this.showCustomFunctionBuilder = false; }
    onCustomFunctionCreated(customFunction) {
        this.extensionManager.registerCustomFunction(customFunction);
        this.onCloseCustomFunctionBuilder();
        this.selectedFunctionCategory = 'custom';
        if (customFunction.syntax) {
            this.insertTextAtCursor(customFunction.syntax);
        }
    }
    onOpenVariableManager() { this.showVariableManager = true; }
    onCloseVariableManager() { this.showVariableManager = false; }
    onVariableSelected(variable) {
    }
    onVariableInserted(variable) {
        const textToInsert = variable.type === DataType.FUNCTION
            ? `${variable.name}()`
            : variable.name;
        this.insertTextAtCursor(textToInsert);
        this.onCloseVariableManager(); // Add missing modal close call
    }
    onVariableCreated(variable) {
        this.evaluatorService.addVariable(variable);
    }
    onVariableDeleted(variable) {
        this.evaluatorService.removeVariable(variable.name);
    }
    insertTextAtCursor(text) {
        if (this.expressionTextarea) {
            this.expressionTextarea.insertTextAtCursor(text);
        }
    }
    analyzeExpression() {
        if (!this.value.trim()) {
            this.typeResult = null;
            this.currentValidation = null;
            this.validationChange.emit(null);
            this.binaryTreeChange.emit(null);
            this.fieldMappingChange.emit(null);
            return;
        }
        this.typeResult = this.evaluatorService.identifyExpressionType(this.value, this.editorConfig);
        if (this.typeResult?.typeValidation) {
            this.currentValidation = this.typeResult.typeValidation;
            this.validationChange.emit(this.typeResult.typeValidation);
        }
        else {
            this.currentValidation = null;
            this.validationChange.emit(null);
        }
        if (this.typeResult?.binaryTree) {
            const isValid = this.typeResult?.typeValidation?.isValid !== false;
            if (isValid && this.typeResult.binaryTree.success) {
                this.binaryTreeChange.emit(this.typeResult.binaryTree);
                // ✅ Emit field mapping data
                const enhancedConfig = this.editorConfig;
                if (enhancedConfig?.variableMappings && enhancedConfig.variableMappings.length > 0) {
                    const mapping = enhancedConfig.variableMappings[0];
                    const fieldMappingData = {
                        frontendField: mapping.frontendName,
                        backendField: mapping.backendName,
                        expression: this.value,
                        tree: this.typeResult.binaryTree,
                        timestamp: new Date().toISOString()
                    };
                    this.fieldMappingChange.emit(fieldMappingData);
                    console.log('💾 Field Mapping Data:');
                    console.log('  Frontend Field:', fieldMappingData.frontendField);
                    console.log('  Backend Field:', fieldMappingData.backendField);
                    console.log('  Expression:', fieldMappingData.expression);
                    console.log('  Tree:', fieldMappingData.tree.json);
                }
            }
            else {
                this.binaryTreeChange.emit(null);
                this.fieldMappingChange.emit(null);
            }
        }
    }
    writeValue(value) {
        this.value = value || '';
        if (this.value) {
            this.analyzeExpression();
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    getTextareaStyles() {
        if (!this.textareaStyle)
            return {};
        return {
            '--border-color': this.textareaStyle.borderColor || '#000000',
            '--focus-border-color': this.textareaStyle.focusBorderColor || '#007bff',
            '--valid-border-color': this.textareaStyle.validBorderColor || '#28a745',
            '--error-border-color': this.textareaStyle.errorBorderColor || '#dc3545',
            'border-width': this.textareaStyle.borderWidth || '2px',
            'border-style': this.textareaStyle.borderStyle || 'solid',
            'border-radius': this.textareaStyle.borderRadius || '4px',
            'background-color': this.textareaStyle.backgroundColor || '#ffffff',
            'color': this.textareaStyle.textColor || '#000000',
            'font-size': this.textareaStyle.fontSize || '14px',
            'font-family': this.textareaStyle.fontFamily || 'monospace',
            'padding': this.textareaStyle.padding || '8px',
            'height': this.textareaStyle.height || 'auto',
            'width': this.textareaStyle.width || '100%'
        };
    }
    ngOnDestroy() {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ExpressionEditorComponent, deps: [{ token: ExpressionEvaluatorService }, { token: ExtensionManagerService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.1.3", type: ExpressionEditorComponent, isStandalone: true, selector: "lib-expression-editor", inputs: { disabled: "disabled", editorConfig: "editorConfig", simpleMode: "simpleMode", textareaStyle: "textareaStyle", placeholder: "placeholder" }, outputs: { expressionChange: "expressionChange", validationChange: "validationChange", configChange: "configChange", binaryTreeChange: "binaryTreeChange", fieldMappingChange: "fieldMappingChange" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => ExpressionEditorComponent),
                multi: true
            }
        ], viewQueries: [{ propertyName: "expressionTextarea", first: true, predicate: ExpressionTextareaComponent, descendants: true }], ngImport: i0, template: "<!-- Simple Mode: Just Textarea -->\r\n<div *ngIf=\"simpleMode\" class=\"simple-expression-editor\">\r\n  <textarea\r\n    [(ngModel)]=\"value\"\r\n    (input)=\"onValueChange(value)\"\r\n    (blur)=\"onTextareaBlur()\"\r\n    [disabled]=\"disabled\"\r\n    [placeholder]=\"placeholder || 'Enter expression...'\"\r\n    [ngStyle]=\"getTextareaStyles()\"\r\n    [class.valid]=\"currentValidation && currentValidation.isValid\"\r\n    [class.invalid]=\"currentValidation && !currentValidation.isValid\"\r\n    class=\"simple-textarea\"\r\n    rows=\"1\">\r\n  </textarea>\r\n</div>\r\n\r\n<!-- Full Mode: Complete Expression Editor -->\r\n<div *ngIf=\"!simpleMode\" class=\"expression-editor-container\">\r\n  <lib-expression-header \r\n    [editorConfig]=\"editorConfig\">\r\n  </lib-expression-header>\r\n\r\n  <div class=\"editor-section\">\r\n    <lib-division-toggle \r\n      [editorConfig]=\"editorConfig\"\r\n      (configChange)=\"onConfigChange($event)\">\r\n    </lib-division-toggle>\r\n\r\n    <lib-expression-textarea\r\n      [disabled]=\"disabled\"\r\n      [editorConfig]=\"editorConfig\"\r\n      [currentValidation]=\"currentValidation\"\r\n      [(ngModel)]=\"value\"\r\n      (valueChange)=\"onValueChange($event)\"\r\n      (blur)=\"onTextareaBlur()\">\r\n    </lib-expression-textarea>\r\n    \r\n    <lib-expression-controls\r\n      [disabled]=\"disabled\"\r\n      [showCustomFunctionBuilder]=\"showCustomFunctionBuilder\"\r\n      [hasVariables]=\"variables.length > 0\"\r\n      (toggleEditor)=\"onToggleEditor()\"\r\n      (clearExpression)=\"onClearExpression()\"\r\n      (openFunctionsMenu)=\"onOpenFunctionsMenu()\"\r\n      (openSymbolPicker)=\"onOpenSymbolPicker()\"\r\n      (openCustomFunctionBuilder)=\"onOpenCustomFunctionBuilder()\"\r\n      (closeCustomFunctionBuilder)=\"onCloseCustomFunctionBuilder()\"\r\n      (customFunctionCreated)=\"onCustomFunctionCreated($event)\"\r\n      (openVariableManager)=\"onOpenVariableManager()\">\r\n    </lib-expression-controls>\r\n  </div>\r\n  \r\n  <lib-expression-info\r\n    [value]=\"value\"\r\n    [typeResult]=\"typeResult\"\r\n    [currentValidation]=\"currentValidation\">\r\n  </lib-expression-info>\r\n\r\n  <!-- Modals -->\r\n  <lib-functions-menu\r\n    [showFunctionsMenu]=\"showFunctionsMenu\"\r\n    [functionCategories]=\"functionCategories\"\r\n    [selectedFunctionCategory]=\"selectedFunctionCategory\"\r\n    [selectedFunction]=\"selectedFunction\"\r\n    (closeFunctionsMenu)=\"onCloseFunctionsMenu()\"\r\n    (functionCategorySelected)=\"onFunctionCategorySelected($event)\"\r\n    (functionSelected)=\"onFunctionSelected($event)\"\r\n    (functionInserted)=\"onFunctionInserted($event)\">\r\n  </lib-functions-menu>\r\n\r\n  <lib-symbol-picker\r\n    [showSymbolPicker]=\"showSymbolPicker\"\r\n    [symbolCategories]=\"symbolCategories\"\r\n    [selectedSymbolCategory]=\"selectedSymbolCategory\"\r\n    [selectedSymbol]=\"selectedSymbol\"\r\n    (closeSymbolPicker)=\"onCloseSymbolPicker()\"\r\n    (symbolCategorySelected)=\"onSymbolCategorySelected($event)\"\r\n    (symbolSelected)=\"onSymbolSelected($event)\"\r\n    (symbolInserted)=\"onSymbolInserted($event)\">\r\n  </lib-symbol-picker>\r\n\r\n  <lib-variable-manager\r\n    [showVariableManager]=\"showVariableManager\"\r\n    [variables]=\"variables\"\r\n    [allowVariableCreation]=\"enhancedConfig?.allowVariableCreation !== false\"\r\n    (closeVariableManager)=\"onCloseVariableManager()\"\r\n    (variableSelected)=\"onVariableSelected($event)\"\r\n    (variableInserted)=\"onVariableInserted($event)\"\r\n    (variableCreated)=\"onVariableCreated($event)\"\r\n    (variableDeleted)=\"onVariableDeleted($event)\">\r\n  </lib-variable-manager>\r\n  \r\n</div>", styles: [".expression-editor{max-width:800px;margin:0 auto;padding:20px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;background:#fff;border-radius:12px;box-shadow:0 4px 6px #0000001a;border:1px solid #e1e5e9}.header-section{margin-bottom:20px;text-align:center}.editor-title{margin:0 0 8px;font-size:24px;font-weight:600;color:#2c3e50}.editor-description{margin:0;color:#6c757d;font-size:14px;line-height:1.5}.input-section{margin-bottom:20px}.expression-input{width:100%;padding:12px 16px;border:2px solid #e1e5e9;border-radius:8px;font-size:14px;font-family:Monaco,Menlo,Ubuntu Mono,monospace;line-height:1.5;resize:vertical;transition:border-color .2s ease;box-sizing:border-box}.expression-input:focus{outline:none;border-color:#007bff;box-shadow:0 0 0 3px #007bff1a}.expression-input:disabled{background-color:#f8f9fa;color:#6c757d;cursor:not-allowed}.controls-section{display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap}.btn{padding:10px 16px;border:none;border-radius:6px;font-size:14px;font-weight:500;cursor:pointer;transition:all .2s ease;display:inline-flex;align-items:center;gap:6px}.btn:disabled{opacity:.6;cursor:not-allowed}.btn-test{background:#28a745;color:#fff}.btn-test:hover:not(:disabled){background:#218838;transform:translateY(-1px)}.btn-clear{background:#dc3545;color:#fff}.btn-clear:hover:not(:disabled){background:#c82333;transform:translateY(-1px)}.info-section{margin-bottom:20px;padding:16px;background:#f8f9fa;border-radius:8px;border-left:4px solid #007bff}.type-info{display:flex;align-items:center;gap:8px;margin-bottom:12px}.info-label{font-weight:600;color:#495057}.type-badge{padding:4px 8px;border-radius:4px;font-size:12px;font-weight:600;text-transform:uppercase}.type-boolean{background:#e3f2fd;color:#1976d2}.type-integer{background:#f3e5f5;color:#7b1fa2}.type-real{background:#e8f5e8;color:#388e3c}.type-string{background:#fff3e0;color:#f57c00}.type-assignment{background:#fce4ec;color:#c2185b}.type-function{background:#e1f5fe;color:#0277bd}.type-unknown{background:#f5f5f5;color:#757575}.validation-info{margin-top:8px}.validation-status{display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:6px;font-size:14px}.validation-status.valid{background:#d4edda;color:#155724;border:1px solid #c3e6cb}.validation-status.invalid{background:#f8d7da;color:#721c24;border:1px solid #f5c6cb}.status-icon{font-size:16px}@media (max-width: 768px){.expression-editor{margin:10px;padding:16px}.controls-section{flex-direction:column}.btn{width:100%;justify-content:center}.type-info{flex-direction:column;align-items:flex-start;gap:4px}}.simple-expression-editor{width:100%}.simple-textarea{width:100%;box-sizing:border-box;resize:none;transition:border-color .2s ease;outline:none}.simple-textarea:disabled{background-color:#f8f9fa;cursor:not-allowed;opacity:.6}.simple-textarea:focus{border-color:var(--focus-border-color, #007bff)!important;box-shadow:0 0 0 3px #007bff1a}.simple-textarea.valid{border-color:var(--valid-border-color, #28a745)!important}.simple-textarea.invalid{border-color:var(--error-border-color, #dc3545)!important}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: ExpressionHeaderComponent, selector: "lib-expression-header", inputs: ["editorConfig"] }, { kind: "component", type: DivisionToggleComponent, selector: "lib-division-toggle", inputs: ["editorConfig"], outputs: ["configChange"] }, { kind: "component", type: ExpressionTextareaComponent, selector: "lib-expression-textarea", inputs: ["disabled", "editorConfig", "currentValidation"], outputs: ["valueChange"] }, { kind: "component", type: ExpressionControlsComponent, selector: "lib-expression-controls", inputs: ["disabled", "showCustomFunctionBuilder", "hasVariables"], outputs: ["toggleEditor", "clearExpression", "openFunctionsMenu", "openSymbolPicker", "openCustomFunctionBuilder", "closeCustomFunctionBuilder", "customFunctionCreated", "openVariableManager"] }, { kind: "component", type: ExpressionInfoComponent, selector: "lib-expression-info", inputs: ["value", "typeResult", "currentValidation"] }, { kind: "component", type: FunctionsMenuComponent, selector: "lib-functions-menu", inputs: ["showFunctionsMenu", "functionCategories", "selectedFunctionCategory", "selectedFunction"], outputs: ["closeFunctionsMenu", "functionCategorySelected", "functionSelected", "functionInserted"] }, { kind: "component", type: VariableManagerComponent, selector: "lib-variable-manager", inputs: ["variables", "allowVariableCreation", "showVariableManager"], outputs: ["variableSelected", "variableInserted", "variableCreated", "variableDeleted", "closeVariableManager"] }, { kind: "component", type: SymbolPickerComponent, selector: "lib-symbol-picker", inputs: ["showSymbolPicker", "symbolCategories", "selectedSymbolCategory", "selectedSymbol"], outputs: ["closeSymbolPicker", "symbolCategorySelected", "symbolSelected", "symbolInserted"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: ExpressionEditorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-expression-editor', standalone: true, imports: [
                        CommonModule,
                        FormsModule,
                        ExpressionHeaderComponent,
                        DivisionToggleComponent,
                        ExpressionTextareaComponent,
                        ExpressionControlsComponent,
                        ExpressionInfoComponent,
                        FunctionsMenuComponent,
                        VariableManagerComponent,
                        SymbolPickerComponent
                    ], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => ExpressionEditorComponent),
                            multi: true
                        }
                    ], template: "<!-- Simple Mode: Just Textarea -->\r\n<div *ngIf=\"simpleMode\" class=\"simple-expression-editor\">\r\n  <textarea\r\n    [(ngModel)]=\"value\"\r\n    (input)=\"onValueChange(value)\"\r\n    (blur)=\"onTextareaBlur()\"\r\n    [disabled]=\"disabled\"\r\n    [placeholder]=\"placeholder || 'Enter expression...'\"\r\n    [ngStyle]=\"getTextareaStyles()\"\r\n    [class.valid]=\"currentValidation && currentValidation.isValid\"\r\n    [class.invalid]=\"currentValidation && !currentValidation.isValid\"\r\n    class=\"simple-textarea\"\r\n    rows=\"1\">\r\n  </textarea>\r\n</div>\r\n\r\n<!-- Full Mode: Complete Expression Editor -->\r\n<div *ngIf=\"!simpleMode\" class=\"expression-editor-container\">\r\n  <lib-expression-header \r\n    [editorConfig]=\"editorConfig\">\r\n  </lib-expression-header>\r\n\r\n  <div class=\"editor-section\">\r\n    <lib-division-toggle \r\n      [editorConfig]=\"editorConfig\"\r\n      (configChange)=\"onConfigChange($event)\">\r\n    </lib-division-toggle>\r\n\r\n    <lib-expression-textarea\r\n      [disabled]=\"disabled\"\r\n      [editorConfig]=\"editorConfig\"\r\n      [currentValidation]=\"currentValidation\"\r\n      [(ngModel)]=\"value\"\r\n      (valueChange)=\"onValueChange($event)\"\r\n      (blur)=\"onTextareaBlur()\">\r\n    </lib-expression-textarea>\r\n    \r\n    <lib-expression-controls\r\n      [disabled]=\"disabled\"\r\n      [showCustomFunctionBuilder]=\"showCustomFunctionBuilder\"\r\n      [hasVariables]=\"variables.length > 0\"\r\n      (toggleEditor)=\"onToggleEditor()\"\r\n      (clearExpression)=\"onClearExpression()\"\r\n      (openFunctionsMenu)=\"onOpenFunctionsMenu()\"\r\n      (openSymbolPicker)=\"onOpenSymbolPicker()\"\r\n      (openCustomFunctionBuilder)=\"onOpenCustomFunctionBuilder()\"\r\n      (closeCustomFunctionBuilder)=\"onCloseCustomFunctionBuilder()\"\r\n      (customFunctionCreated)=\"onCustomFunctionCreated($event)\"\r\n      (openVariableManager)=\"onOpenVariableManager()\">\r\n    </lib-expression-controls>\r\n  </div>\r\n  \r\n  <lib-expression-info\r\n    [value]=\"value\"\r\n    [typeResult]=\"typeResult\"\r\n    [currentValidation]=\"currentValidation\">\r\n  </lib-expression-info>\r\n\r\n  <!-- Modals -->\r\n  <lib-functions-menu\r\n    [showFunctionsMenu]=\"showFunctionsMenu\"\r\n    [functionCategories]=\"functionCategories\"\r\n    [selectedFunctionCategory]=\"selectedFunctionCategory\"\r\n    [selectedFunction]=\"selectedFunction\"\r\n    (closeFunctionsMenu)=\"onCloseFunctionsMenu()\"\r\n    (functionCategorySelected)=\"onFunctionCategorySelected($event)\"\r\n    (functionSelected)=\"onFunctionSelected($event)\"\r\n    (functionInserted)=\"onFunctionInserted($event)\">\r\n  </lib-functions-menu>\r\n\r\n  <lib-symbol-picker\r\n    [showSymbolPicker]=\"showSymbolPicker\"\r\n    [symbolCategories]=\"symbolCategories\"\r\n    [selectedSymbolCategory]=\"selectedSymbolCategory\"\r\n    [selectedSymbol]=\"selectedSymbol\"\r\n    (closeSymbolPicker)=\"onCloseSymbolPicker()\"\r\n    (symbolCategorySelected)=\"onSymbolCategorySelected($event)\"\r\n    (symbolSelected)=\"onSymbolSelected($event)\"\r\n    (symbolInserted)=\"onSymbolInserted($event)\">\r\n  </lib-symbol-picker>\r\n\r\n  <lib-variable-manager\r\n    [showVariableManager]=\"showVariableManager\"\r\n    [variables]=\"variables\"\r\n    [allowVariableCreation]=\"enhancedConfig?.allowVariableCreation !== false\"\r\n    (closeVariableManager)=\"onCloseVariableManager()\"\r\n    (variableSelected)=\"onVariableSelected($event)\"\r\n    (variableInserted)=\"onVariableInserted($event)\"\r\n    (variableCreated)=\"onVariableCreated($event)\"\r\n    (variableDeleted)=\"onVariableDeleted($event)\">\r\n  </lib-variable-manager>\r\n  \r\n</div>", styles: [".expression-editor{max-width:800px;margin:0 auto;padding:20px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;background:#fff;border-radius:12px;box-shadow:0 4px 6px #0000001a;border:1px solid #e1e5e9}.header-section{margin-bottom:20px;text-align:center}.editor-title{margin:0 0 8px;font-size:24px;font-weight:600;color:#2c3e50}.editor-description{margin:0;color:#6c757d;font-size:14px;line-height:1.5}.input-section{margin-bottom:20px}.expression-input{width:100%;padding:12px 16px;border:2px solid #e1e5e9;border-radius:8px;font-size:14px;font-family:Monaco,Menlo,Ubuntu Mono,monospace;line-height:1.5;resize:vertical;transition:border-color .2s ease;box-sizing:border-box}.expression-input:focus{outline:none;border-color:#007bff;box-shadow:0 0 0 3px #007bff1a}.expression-input:disabled{background-color:#f8f9fa;color:#6c757d;cursor:not-allowed}.controls-section{display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap}.btn{padding:10px 16px;border:none;border-radius:6px;font-size:14px;font-weight:500;cursor:pointer;transition:all .2s ease;display:inline-flex;align-items:center;gap:6px}.btn:disabled{opacity:.6;cursor:not-allowed}.btn-test{background:#28a745;color:#fff}.btn-test:hover:not(:disabled){background:#218838;transform:translateY(-1px)}.btn-clear{background:#dc3545;color:#fff}.btn-clear:hover:not(:disabled){background:#c82333;transform:translateY(-1px)}.info-section{margin-bottom:20px;padding:16px;background:#f8f9fa;border-radius:8px;border-left:4px solid #007bff}.type-info{display:flex;align-items:center;gap:8px;margin-bottom:12px}.info-label{font-weight:600;color:#495057}.type-badge{padding:4px 8px;border-radius:4px;font-size:12px;font-weight:600;text-transform:uppercase}.type-boolean{background:#e3f2fd;color:#1976d2}.type-integer{background:#f3e5f5;color:#7b1fa2}.type-real{background:#e8f5e8;color:#388e3c}.type-string{background:#fff3e0;color:#f57c00}.type-assignment{background:#fce4ec;color:#c2185b}.type-function{background:#e1f5fe;color:#0277bd}.type-unknown{background:#f5f5f5;color:#757575}.validation-info{margin-top:8px}.validation-status{display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:6px;font-size:14px}.validation-status.valid{background:#d4edda;color:#155724;border:1px solid #c3e6cb}.validation-status.invalid{background:#f8d7da;color:#721c24;border:1px solid #f5c6cb}.status-icon{font-size:16px}@media (max-width: 768px){.expression-editor{margin:10px;padding:16px}.controls-section{flex-direction:column}.btn{width:100%;justify-content:center}.type-info{flex-direction:column;align-items:flex-start;gap:4px}}.simple-expression-editor{width:100%}.simple-textarea{width:100%;box-sizing:border-box;resize:none;transition:border-color .2s ease;outline:none}.simple-textarea:disabled{background-color:#f8f9fa;cursor:not-allowed;opacity:.6}.simple-textarea:focus{border-color:var(--focus-border-color, #007bff)!important;box-shadow:0 0 0 3px #007bff1a}.simple-textarea.valid{border-color:var(--valid-border-color, #28a745)!important}.simple-textarea.invalid{border-color:var(--error-border-color, #dc3545)!important}\n"] }]
        }], ctorParameters: () => [{ type: ExpressionEvaluatorService }, { type: ExtensionManagerService }], propDecorators: { disabled: [{
                type: Input
            }], editorConfig: [{
                type: Input
            }], simpleMode: [{
                type: Input
            }], textareaStyle: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], expressionChange: [{
                type: Output
            }], validationChange: [{
                type: Output
            }], configChange: [{
                type: Output
            }], binaryTreeChange: [{
                type: Output
            }], fieldMappingChange: [{
                type: Output
            }], expressionTextarea: [{
                type: ViewChild,
                args: [ExpressionTextareaComponent]
            }] } });

/*
 * Public API Surface of transex
 */
// Core components

/**
 * Generated bundle index. Do not edit.
 */

export { BinaryTreeParserService, ConfigurationService, ContextType, CustomFunctionBuilderComponent, DataType, DivisionToggleComponent, ExpressionControlsComponent, ExpressionEditorComponent, ExpressionEvaluatorService, ExpressionHeaderComponent, ExpressionInfoComponent, ExpressionPatternService, ExpressionTextareaComponent, ExtensionManagerService, FUNCTION_CATEGORIES, FunctionsMenuComponent, SYMBOL_CATEGORIES, SymbolPickerComponent, TokenizerService, TypeAnalyzerService, ValidationService, VariableManagerComponent, VariableManagerService };
//# sourceMappingURL=oktoflow-transex.mjs.map
