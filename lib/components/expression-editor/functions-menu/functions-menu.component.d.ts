import { EventEmitter } from '@angular/core';
import { FunctionCategory, FunctionItem } from '../../../interfaces/shared.interfaces';
import { ExtensionManagerService } from '../../../services/extension-manager/extension-manager.service';
import * as i0 from "@angular/core";
export declare class FunctionsMenuComponent {
    private extensionManager;
    showFunctionsMenu: boolean;
    functionCategories: FunctionCategory[];
    selectedFunctionCategory: string;
    selectedFunction: FunctionItem | null;
    closeFunctionsMenu: EventEmitter<void>;
    functionCategorySelected: EventEmitter<string>;
    functionSelected: EventEmitter<FunctionItem>;
    functionInserted: EventEmitter<FunctionItem>;
    constructor(extensionManager: ExtensionManagerService);
    onCloseFunctionsMenu(): void;
    onSelectFunctionCategory(category: string): void;
    onSelectFunction(func: FunctionItem): void;
    onInsertFunction(func: FunctionItem): void;
    getSelectedCategoryFunctions(): FunctionItem[];
    static ɵfac: i0.ɵɵFactoryDeclaration<FunctionsMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FunctionsMenuComponent, "lib-functions-menu", never, { "showFunctionsMenu": { "alias": "showFunctionsMenu"; "required": false; }; "functionCategories": { "alias": "functionCategories"; "required": false; }; "selectedFunctionCategory": { "alias": "selectedFunctionCategory"; "required": false; }; "selectedFunction": { "alias": "selectedFunction"; "required": false; }; }, { "closeFunctionsMenu": "closeFunctionsMenu"; "functionCategorySelected": "functionCategorySelected"; "functionSelected": "functionSelected"; "functionInserted": "functionInserted"; }, never, never, true, never>;
}
