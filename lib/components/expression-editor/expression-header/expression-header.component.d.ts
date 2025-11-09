import { ExpressionEditorConfig, ContextType } from '../../../interfaces/shared.interfaces';
import * as i0 from "@angular/core";
export declare class ExpressionHeaderComponent {
    editorConfig?: ExpressionEditorConfig;
    ContextType: typeof ContextType;
    getContextDescription(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExpressionHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ExpressionHeaderComponent, "lib-expression-header", never, { "editorConfig": { "alias": "editorConfig"; "required": false; }; }, {}, never, never, true, never>;
}
