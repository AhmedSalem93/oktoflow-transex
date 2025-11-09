import { EventEmitter } from '@angular/core';
import { CustomFunction } from '../../../interfaces/core/extensibility.interfaces';
import * as i0 from "@angular/core";
export declare class CustomFunctionBuilderComponent {
    isVisible: boolean;
    functionCreated: EventEmitter<CustomFunction>;
    closeModal: EventEmitter<void>;
    newFunction: CustomFunction;
    isValidFunctionName(): boolean;
    isValidFunctionSyntax(): boolean;
    isValidFunctionDescription(): boolean;
    isFormValid(): boolean;
    onFunctionNameChange(): void;
    closeBuilder(): void;
    createFunction(): void;
    private resetForm;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomFunctionBuilderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomFunctionBuilderComponent, "lib-custom-function-builder", never, { "isVisible": { "alias": "isVisible"; "required": false; }; }, { "functionCreated": "functionCreated"; "closeModal": "closeModal"; }, never, never, true, never>;
}
