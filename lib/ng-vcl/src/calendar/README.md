# vcl-calendar

A calendar to display and select dates

## Usage

```js
import { VCLCalendarModule } from '@ng-vcl/ng-vcl';

@NgModule({
  imports: [ VCLCalendarModule ],
  ...
})
export class AppComponent {}
```

```html
<vcl-calendar [date]="date"></vcl-calendar>
```

### Date representation

The calendar uses the `VCLDateAdapter` for date representation.
Check the [`VCLDateAdapter` docs](#/dateadapter) for further information.

### vcl-calendar selectionMode

The calendar supports a variety of selection modes. The default `selectionMode` is `date`

- `date` Can select a single dates
- `range` Can select a date range with a starting and ending date (see `VCLDateRange` interface)
- `month` Can a single month
- `month-multiple` Can select a single dates
- `month-multiple` Can select multiple months 
- `month-range` Can a month range with a starting and ending month (see `VCLDateRange` interface)


### API

#### vcl-calendar attributes

Name                | Type                                            | Default | Description
---------------     | -------                                         | ------- | -----------------------------------------------
`value`             | VCLDate \| VCLDate[] \| VCLDateRange<VCLDate>   |         | Selected date(s)/date range in the calendar
`viewDate`          | VCLDate                                         | today   | The currently shown date in the calendar 
`minDate`           | VCLDate                                         |         | Minimum selectable date
`maxDate`           | VCLDate                                         |         | Maximum selectable date
`disabled`          | boolean                                         | false   | Disables the calendar when true
`available`         | VCLDate \| VCLDate[] \| VCLDateRange<VCLDate>   |         | Marks dates as available
`unavailable`       | VCLDate \| VCLDate[] \| VCLDateRange<VCLDate>   |         | Marks dates as unavailable
`selectionMode`     | VCLCalendarSelectionMode                        |         | See selectionMode description
`showWeekOfTheYear` | boolean                                         | false   | Show of the year when true

#### vcl-calendar events
Name                | Type                                              | Description
---------------     | -------                                           | -----------------------------------------------
`valueChange`       | VCLDate \| VCLDate[] \| VCLDateRange<VCLDate>     | Triggered when a new date is selected
`viewDateChange`    | VCLDate                                           | Triggered when the viewDate changes

#### vcl-calendar interfaces

```ts
export type VCLCalendarSelectionMode = 'date' | 'multiple' | 'range' | 'month' | 'month-multiple' | 'month-range';

interface VCLDateRange<VCLDate> {
  start: VCLDate;
  end: VCLDate;
}
```