import { ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';
export declare class TextareaDirective {
    private elRef;
    private ngModel;
    constructor(elRef: ElementRef, ngModel: NgModel);
    selectAllOnFocus: boolean;
    autogrow: boolean;
    maxRows: number;
    minRows: number;
    onModelChange(value: any): void;
    onFocus(value: any): void;
    rows: number;
    ngOnInit(): void;
    setRowsByValue(value: string): void;
}
