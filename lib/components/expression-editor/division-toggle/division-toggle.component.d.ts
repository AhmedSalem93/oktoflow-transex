import { EventEmitter } from '@angular/core';
import { ExpressionEditorConfig, ContextType } from '../../../interfaces/shared.interfaces';
import * as i0 from "@angular/core";
export declare class DivisionToggleComponent {
    editorConfig?: ExpressionEditorConfig;
    configChange: EventEmitter<ExpressionEditorConfig>;
    ContextType: typeof ContextType;
    isLimitedConnectorContext(): boolean;
    toggleDivision(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DivisionToggleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DivisionToggleComponent, "lib-division-toggle", never, { "editorConfig": { "alias": "editorConfig"; "required": false; }; }, { "configChange": "configChange"; }, never, never, true, never>;
}
