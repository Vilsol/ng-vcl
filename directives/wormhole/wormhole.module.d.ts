import { ModuleWithProviders } from '@angular/core';
import { TemplateWormhole, ComponentWormhole, ConnectWormholeDirective, Wormhole } from './wormhole';
import { WormholeService } from './wormhole.service';
import { ComponentType } from './../../core/index';
export { Wormhole, ConnectWormholeDirective, WormholeService, TemplateWormhole, ComponentWormhole };
export declare class VCLWormholeModule {
    static withRootComponents(...components: ComponentType<any>[]): ModuleWithProviders;
}
