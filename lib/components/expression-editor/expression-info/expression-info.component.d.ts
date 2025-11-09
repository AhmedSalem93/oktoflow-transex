import { ExpressionTypeResult, TypeValidationResult } from '../../../interfaces/shared.interfaces';
import * as i0 from "@angular/core";
export declare class ExpressionInfoComponent {
    value: string;
    typeResult: ExpressionTypeResult | null;
    currentValidation: TypeValidationResult | null;
    getReturnTypeDisplay(): string;
    shouldShowTypeInfo(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExpressionInfoComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ExpressionInfoComponent, "lib-expression-info", never, { "value": { "alias": "value"; "required": false; }; "typeResult": { "alias": "typeResult"; "required": false; }; "currentValidation": { "alias": "currentValidation"; "required": false; }; }, {}, never, never, true, never>;
}
