import { Type, ModuleWithProviders } from '@angular/core';
import { ErrorHandlingStrategy } from './adv-http.service';
export * from './adv-http.service';
export interface AdvHttpConfig {
    errorHandlerService?: Type<any>;
    defaultErrorHandlingStrategy: ErrorHandlingStrategy;
}
export declare class AdvHttpModule {
    static forRoot(config: AdvHttpConfig): ModuleWithProviders;
}
