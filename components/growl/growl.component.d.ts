import { ChangeDetectorRef } from '@angular/core';
export declare class GrowlComponent {
    private cdRef;
    growls: any[];
    constructor(cdRef: ChangeDetectorRef);
    markForCheck(): void;
}
