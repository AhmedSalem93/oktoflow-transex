import { EventEmitter, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ExpressionEditorConfig, TypeValidationResult } from '../../../interfaces/shared.interfaces';
import * as i0 from "@angular/core";
export declare class ExpressionTextareaComponent implements ControlValueAccessor {
    disabled: boolean;
    editorConfig?: ExpressionEditorConfig;
    currentValidation: TypeValidationResult | null;
    valueChange: EventEmitter<string>;
    expressionTextarea: ElementRef<HTMLTextAreaElement>;
    value: string;
    private onChange;
    private onTouched;
    onInput(event: any): void;
    getPlaceholder(): string;
    insertTextAtCursor(text: string): void;
    writeValue(value: string | null): void;
    registerOnChange(fn: (value: string) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExpressionTextareaComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ExpressionTextareaComponent, "lib-expression-textarea", never, { "disabled": { "alias": "disabled"; "required": false; }; "editorConfig": { "alias": "editorConfig"; "required": false; }; "currentValidation": { "alias": "currentValidation"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}
