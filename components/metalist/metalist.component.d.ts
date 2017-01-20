import { EventEmitter, OnInit } from '@angular/core';
export declare class MetalistComponent implements OnInit {
    items: any[];
    meta: any;
    minSelectableItems: number;
    maxSelectableItems: number;
    select: EventEmitter<any[]>;
    constructor();
    next(): void;
    prev(): void;
    ngOnInit(): void;
    metaFromItem(item: any): any;
    selectItem(item: any): boolean;
    deSelectItem(item: any): void;
    getSelectedItems(): any;
    setSelectedItems(): void;
    ngAfterContentInit(): void;
    getMarkedItemIndex(): number;
    getMarkedItemMeta(): any;
    setMarkedIndex(index: number): void;
    setMarkedItem(item: any): void;
    template1: any;
    getMeta(item: any): any;
}
