import { EventEmitter, ElementRef, NgZone } from '@angular/core';
import { OverlayManagerService, OverlayManagedComponent } from './overlayManager.service';
export declare class PopoverComponent implements OverlayManagedComponent {
    protected overlayManger: OverlayManagerService;
    protected myElement: ElementRef;
    private zone;
    target: string;
    style: string;
    class: string;
    zIndex: number;
    protected coverZIndex: number;
    targetAttachment: string;
    attachment: string;
    open: boolean;
    visible: boolean;
    layer: boolean;
    openChange: EventEmitter<boolean>;
    zIndexManaged: boolean;
    expandManaged: boolean;
    timeout: number;
    state: string;
    constructor(overlayManger: OverlayManagerService, myElement: ElementRef, zone: NgZone);
    close(): void;
    offClick(): void;
    ngOnChanges(changes: any): void;
}
