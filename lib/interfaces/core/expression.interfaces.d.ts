export declare enum DataType {
    BOOLEAN = "Boolean",
    INTEGER = "Integer",
    REAL = "Real",
    STRING = "String",
    ASSIGNMENT = "Assignment",
    FUNCTION = "Function",
    ANY = "Any"
}
export declare enum ContextType {
    BOOLEAN = "boolean",
    ASSIGNMENT = "assignment",
    ARITHMETIC = "arithmetic",
    LIMITED_CONNECTOR = "limited_connector",
    GENERAL = "general"
}
export interface Variable {
    name: string;
    value: any;
    type: DataType;
    explanation: string;
    example?: string;
}
export interface FunctionCategory {
    name: string;
    label: string;
    functions: FunctionItem[];
}
export interface FunctionItem {
    name: string;
    syntax: string;
    description: string;
    example?: string;
    category: string;
}
export interface SymbolCategory {
    name: string;
    label: string;
    symbols: SymbolItem[];
}
export interface SymbolItem {
    name: string;
    symbol: string;
    description: string;
    category: string;
}
export interface ExpressionTypeResult {
    success: boolean;
    returnType?: DataType;
    error?: string;
    typeValidation?: any;
    usedVariables?: Variable[];
    isLambdaExpression?: boolean;
}
export interface EvaluationResult {
    success: boolean;
    result?: any;
    type?: string;
    error?: string;
    typeValidation?: any;
}
export interface EvaluationResultEnhanced extends EvaluationResult {
    usedVariables?: Variable[];
    isLambdaExpression?: boolean;
}
