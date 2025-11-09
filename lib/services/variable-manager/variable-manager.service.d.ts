import { Variable } from '../../interfaces/shared.interfaces';
import * as i0 from "@angular/core";
export declare class VariableManagerService {
    private variables;
    constructor();
    addVariable(variable: Variable): void;
    removeVariable(name: string): void;
    getVariables(): Variable[];
    getVariable(name: string): Variable | undefined;
    extractUsedVariables(expression: string): Variable[];
    static ɵfac: i0.ɵɵFactoryDeclaration<VariableManagerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<VariableManagerService>;
}
