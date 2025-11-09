import { DataType } from '../../interfaces/shared.interfaces';
import { VariableManagerService } from '../variable-manager/variable-manager.service';
import { ExpressionPatternService } from '../expression-pattern/expression-pattern.service';
import * as i0 from "@angular/core";
export declare class TypeAnalyzerService {
    private variableManager;
    private patternService;
    constructor(variableManager: VariableManagerService, patternService: ExpressionPatternService);
    analyzeExpressionReturnType(expression: string): DataType;
    private analyzeTernaryReturnType;
    static ɵfac: i0.ɵɵFactoryDeclaration<TypeAnalyzerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TypeAnalyzerService>;
}
