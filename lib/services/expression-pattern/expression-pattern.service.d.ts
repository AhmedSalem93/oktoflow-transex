import * as i0 from "@angular/core";
export interface PatternMatch {
    isMatch: boolean;
    confidence: number;
    details?: any;
}
export declare class ExpressionPatternService {
    isLambdaFunction(expression: string): PatternMatch;
    isFieldAssignment(expression: string): PatternMatch;
    isTernaryExpression(expression: string): PatternMatch;
    isBooleanExpression(expression: string): PatternMatch;
    isStringLiteral(expression: string): PatternMatch;
    isNumericExpression(expression: string): PatternMatch;
    willReturnInteger(expression: string): PatternMatch;
    containsArithmeticOperators(expression: string): PatternMatch;
    hasOnlyIntegerArguments(expression: string): PatternMatch;
    analyzeComplexity(expression: string): {
        level: 'simple' | 'moderate' | 'complex' | 'very_complex';
        score: number;
        factors: string[];
    };
    private getMaxParenthesesDepth;
    extractPatterns(expression: string): PatternMatch[];
    static ɵfac: i0.ɵɵFactoryDeclaration<ExpressionPatternService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ExpressionPatternService>;
}
