import { ViewContainerRef } from '@angular/core';
import { WormholeHost } from '../wormhole/index';
export declare class VCLNotificationContentComponent {
    wormholeComponentDetails: any;
    target: ViewContainerRef;
    host: WormholeHost;
    ngAfterViewInit(): void;
}
