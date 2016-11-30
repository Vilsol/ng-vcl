import { OnInit, ElementRef } from '@angular/core';
export declare class InputControlGroup implements OnInit {
    private elRef;
    type: 'error' | 'warning' | 'success';
    label: string;
    constructor(elRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ucfirst(str: string): string;
}
