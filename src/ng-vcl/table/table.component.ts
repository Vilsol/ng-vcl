import { Component } from '@angular/core';

@Component({
    selector: 'vcl-table',
    templateUrl: './table.component.html',
    host: {
        '[class.vclTable]': 'true',
    }
})
export class TableComponent {


}