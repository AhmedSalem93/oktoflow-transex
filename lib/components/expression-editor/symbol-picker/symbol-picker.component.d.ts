import { EventEmitter } from '@angular/core';
import { SymbolCategory, SymbolItem } from '../../../interfaces/shared.interfaces';
import * as i0 from "@angular/core";
export declare class SymbolPickerComponent {
    showSymbolPicker: boolean;
    symbolCategories: SymbolCategory[];
    selectedSymbolCategory: string;
    selectedSymbol: SymbolItem | null;
    closeSymbolPicker: EventEmitter<void>;
    symbolCategorySelected: EventEmitter<string>;
    symbolSelected: EventEmitter<SymbolItem>;
    symbolInserted: EventEmitter<SymbolItem>;
    onCloseSymbolPicker(): void;
    onSelectSymbolCategory(category: string): void;
    onSelectSymbol(symbol: SymbolItem): void;
    onInsertSymbol(symbol: SymbolItem): void;
    getSelectedCategorySymbols(): SymbolItem[];
    static ɵfac: i0.ɵɵFactoryDeclaration<SymbolPickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SymbolPickerComponent, "lib-symbol-picker", never, { "showSymbolPicker": { "alias": "showSymbolPicker"; "required": false; }; "symbolCategories": { "alias": "symbolCategories"; "required": false; }; "selectedSymbolCategory": { "alias": "selectedSymbolCategory"; "required": false; }; "selectedSymbol": { "alias": "selectedSymbol"; "required": false; }; }, { "closeSymbolPicker": "closeSymbolPicker"; "symbolCategorySelected": "symbolCategorySelected"; "symbolSelected": "symbolSelected"; "symbolInserted": "symbolInserted"; }, never, never, true, never>;
}
