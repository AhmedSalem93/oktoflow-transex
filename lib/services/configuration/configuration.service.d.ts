import { ExpressionEditorConfig, ExpressionEditorConfigEnhanced } from '../../interfaces/shared.interfaces';
import * as i0 from "@angular/core";
export declare class ConfigurationService {
    getAssignmentConfig(): ExpressionEditorConfig;
    getLimitedConnectorConfig(allowDivision?: boolean): ExpressionEditorConfig;
    getBooleanConfig(): ExpressionEditorConfig;
    getArithmeticConfig(): ExpressionEditorConfig;
    getConnectorConfig(): ExpressionEditorConfig;
    getGeneralConfig(): ExpressionEditorConfig;
    getPlaceholderForType(config: ExpressionEditorConfig | ExpressionEditorConfigEnhanced): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfigurationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfigurationService>;
}
