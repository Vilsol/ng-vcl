import { Type, ModuleWithProviders } from '@angular/core';
import { DirectiveLayerRef } from './layer.directive';
import { ComponentLayerRef } from './layer.component';
import { LayerBaseComponent } from './layer-base.component';
import { LayerService } from './layer.service';
import { LayerRef, LayerData } from './layer.references';
export { LayerBaseComponent, DirectiveLayerRef, ComponentLayerRef, LayerRef, LayerData, LayerService };
export interface VCLLayerConfig {
    layers?: Type<ComponentLayerRef<any>>[];
}
export declare class VCLLayerModule {
    static withConfig(config: VCLLayerConfig): ModuleWithProviders;
}
