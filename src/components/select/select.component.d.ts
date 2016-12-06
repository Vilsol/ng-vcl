/// <reference types="core-js" />
import { EventEmitter, QueryList } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class SelectOptionComponent {
    value: string;
    label: string;
    sublabel: string;
    class: string;
    constructor();
    /**
     * transforms this NavigationItemComponent into an object,
     * so it can be handled the same way as an inputList
     * @return {Object}
     */
    toObject(): Object;
}
export declare const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class SelectComponent implements ControlValueAccessor {
    popoverTarget: string;
    dropdown: any;
    value: string | string[];
    expanded: boolean;
    items: any[];
    templateItems: QueryList<SelectOptionComponent>;
    minSelectableItems: number;
    maxSelectableItems: number;
    expandedIcon: string;
    collapsedIcon: string;
    displayValue: string;
    changeEE: EventEmitter<string | string[]>;
    constructor();
    expand: () => boolean;
    onOutsideClick: () => false;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    reDisplayValue(newValue: any): void;
    selectItem(item: any): void;
    onSelect(newItems: any[]): void;
    /**
     * Things needed for ControlValueAccessor-Interface.
     */
    private onTouchedCallback;
    private onChangeCallback;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
