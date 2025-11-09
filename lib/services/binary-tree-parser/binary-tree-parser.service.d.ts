import { TokenizerService } from '../tokenizer/tokenizer.service';
import * as i0 from "@angular/core";
export interface BinaryTreeNode {
    type: 'operator' | 'function' | 'variable' | 'literal';
    value: string | number | boolean;
    left?: BinaryTreeNode;
    right?: BinaryTreeNode;
    children?: BinaryTreeNode[];
}
export interface ParseResult {
    success: boolean;
    tree?: BinaryTreeNode;
    error?: string;
    json?: string;
}
export declare class BinaryTreeParserService {
    private tokenizerService;
    private tokens;
    private currentIndex;
    constructor(tokenizerService: TokenizerService);
    parseExpression(expression: string): ParseResult;
    private parseOrExpression;
    private parseAndExpression;
    private parseEqualityExpression;
    private parseRelationalExpression;
    private parseAssignmentExpression;
    private parseAdditiveExpression;
    private parseMultiplicativeExpression;
    private parseUnaryExpression;
    private parsePrimaryExpression;
    static ɵfac: i0.ɵɵFactoryDeclaration<BinaryTreeParserService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BinaryTreeParserService>;
}
