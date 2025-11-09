import { CustomFunction } from '../../interfaces/core/extensibility.interfaces';
import * as i0 from "@angular/core";
export declare class ExtensionManagerService {
    private customFunctions;
    constructor();
    getCustomFunctions(): CustomFunction[];
    registerCustomFunction(customFunction: CustomFunction): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExtensionManagerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ExtensionManagerService>;
}
