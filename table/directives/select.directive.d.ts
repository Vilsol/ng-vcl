import { ElementRef, Renderer2, SimpleChanges, OnChanges } from '@angular/core';
import { TableService } from '../services/table.service';
export declare class SelectDirective implements OnChanges {
    private renderer;
    private el;
    selected: boolean | '';
    tableService: TableService;
    constructor(renderer: Renderer2, el: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
}