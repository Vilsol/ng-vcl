import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { ComponentLayerRef, LayerRef, LayerService } from './../layer/layer.module';
import { AlertOptions } from './types';
export declare class AlertInputComponent {
    input: any;
    alert: AlertOptions;
    valueChange: EventEmitter<any>;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    readonly control: string;
    readonly placeholder: string;
    inputValue: string;
    inputValueChange(value: string): void;
}
export declare class AlertComponent {
    private layerService;
    private cdRef;
    constructor(layerRef: LayerRef, layerService: LayerService, cdRef: ChangeDetectorRef);
    layerRef: AlertLayer;
    offClickSub: Subscription;
    alert: AlertOptions;
    value: any;
    validationError: string;
    alertOpts: AlertOptions;
    updateAlertOpts(...opts: AlertOptions[]): void;
    onKeyUp(ev: KeyboardEvent): void;
    readonly alertClass: string;
    readonly iconClass: string;
    readonly titleAlignmentClass: string;
    readonly iconAlignmentClass: string;
    readonly contentAlignmentClass: string;
    readonly buttonAlignmentClass: string;
    confirm(): void;
    dismiss(reason: string): void;
    cancel(reason: string): void;
    offClick(): void;
    close(reason: string): void;
    valueChange(value: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
export declare class AlertLayer extends ComponentLayerRef<AlertComponent> {
    component: typeof AlertComponent;
    modal: boolean;
    transparent: boolean;
    offClick$: Subject<{}>;
    offClick(): void;
}
