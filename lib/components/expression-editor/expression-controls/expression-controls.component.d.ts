import { EventEmitter } from '@angular/core';
import { CustomFunction } from '../../../interfaces/core/extensibility.interfaces';
import * as i0 from "@angular/core";
export declare class ExpressionControlsComponent {
    disabled: boolean;
    showCustomFunctionBuilder: boolean;
    hasVariables: boolean;
    toggleEditor: EventEmitter<void>;
    clearExpression: EventEmitter<void>;
    openFunctionsMenu: EventEmitter<void>;
    openSymbolPicker: EventEmitter<void>;
    openCustomFunctionBuilder: EventEmitter<void>;
    closeCustomFunctionBuilder: EventEmitter<void>;
    customFunctionCreated: EventEmitter<CustomFunction>;
    openVariableManager: EventEmitter<void>;
    onToggleEditor(): void;
    onClearExpression(): void;
    onOpenFunctionsMenu(): void;
    onOpenSymbolPicker(): void;
    onOpenCustomFunctionBuilder(): void;
    onCloseCustomFunctionBuilder(): void;
    onCustomFunctionCreated(customFunction: CustomFunction): void;
    onOpenVariableManager(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExpressionControlsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ExpressionControlsComponent, "lib-expression-controls", never, { "disabled": { "alias": "disabled"; "required": false; }; "showCustomFunctionBuilder": { "alias": "showCustomFunctionBuilder"; "required": false; }; "hasVariables": { "alias": "hasVariables"; "required": false; }; }, { "toggleEditor": "toggleEditor"; "clearExpression": "clearExpression"; "openFunctionsMenu": "openFunctionsMenu"; "openSymbolPicker": "openSymbolPicker"; "openCustomFunctionBuilder": "openCustomFunctionBuilder"; "closeCustomFunctionBuilder": "closeCustomFunctionBuilder"; "customFunctionCreated": "customFunctionCreated"; "openVariableManager": "openVariableManager"; }, never, never, true, never>;
}
