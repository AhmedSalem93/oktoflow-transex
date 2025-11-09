import { DataType, ExpressionEditorConfig, TypeValidationResult, ExpressionEditorConfigEnhanced } from '../../interfaces/shared.interfaces';
import * as i0 from "@angular/core";
export declare class ValidationService {
    validateExpressionType(expression: string, returnType: DataType, config: ExpressionEditorConfig | ExpressionEditorConfigEnhanced): TypeValidationResult;
    private validateBooleanContext;
    private validateAssignmentContext;
    private validateArithmeticContext;
    private validateLimitedConnectorContext;
    private hasOnlyAllowedArithmeticOperators;
    private isLambdaFunction;
    static ɵfac: i0.ɵɵFactoryDeclaration<ValidationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ValidationService>;
}
