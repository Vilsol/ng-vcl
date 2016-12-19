import { EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class DropdownComponent implements ControlValueAccessor, OnInit {
    private static readonly TAG;
    change$: EventEmitter<any[]>;
    items: any[];
    tabindex: number;
    expanded: boolean;
    maxSelectableItems: number;
    minSelectableItems: number;
    ariaRole: string;
    value: any;
    ngOnInit(): void;
    selectedItems(): any[];
    selectItem(item: any): void;
    onChange(): void;
    /**
     * things needed for ControlValueAccessor-Interface
     */
    private onTouchedCallback;
    private onChangeCallback;
    writeValue(v: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
