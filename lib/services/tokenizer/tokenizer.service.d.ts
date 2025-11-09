import * as i0 from "@angular/core";
export interface Token {
    type: 'operator' | 'function' | 'variable' | 'literal' | 'parenthesis' | 'comma' | 'bracket' | 'semicolon' | 'colon' | 'question';
    value: string;
    position: number;
}
export declare class TokenizerService {
    tokenize(expression: string): Token[];
    private isOperator;
    private parseOperator;
    private parseStringLiteral;
    private parseNumber;
    private parseIdentifier;
    validateTokens(tokens: Token[]): {
        isValid: boolean;
        errors: string[];
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<TokenizerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TokenizerService>;
}
