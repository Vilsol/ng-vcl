import { Component } from '@angular/core';
import { DateAdapter } from '@vcl/ng-vcl';

@Component({
  templateUrl: 'demo.component.html',
  styles: [`
    .100px{
      width: 100px;
    }
  `]
})
export class DatePickerDemoComponent {

  constructor(private da: DateAdapter) { }

  date = new Date();
  month = new Date();
  time = new Date();

  datePattern = this.da.pattern('date');
  monthPattern = this.da.pattern('month');
  timePattern = this.da.pattern('time');

  onChange(date) {
    console.log('onChange', date);
  }
}
