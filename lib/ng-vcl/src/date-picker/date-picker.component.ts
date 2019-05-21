import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  SimpleChanges,
  HostBinding
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CalendarDate } from './calendar-date';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-use-before-declare
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true
};

export interface DatePickerConfig {
  closeOnSelect?: boolean;
  disabled?: boolean;
  highlightToday?: boolean;
  highlightSelected?: boolean;
  displayWeekNumbers?: boolean;
  displayWeekdays?: boolean;
  displayDate?: boolean;
  displayTime?: boolean;
  displayHours24?: boolean;
  displayHours?: boolean;
  displayMinutes?: boolean;
  displaySeconds?: boolean;
  prevYearBtnIcon?: string;
  nextYearBtnIcon?: string;
  displayJumpToday?: boolean;
  displayJumpSelected?: boolean;
  selectedDate?: Date | undefined;
  selectRange?: boolean;
  selectedRangeEnd?: Date | undefined;
  maxRangeLength?: number;
  minDate?: Date | undefined;
  maxDate?: Date | undefined;
}

@Component({
  selector: 'vcl-date-picker',
  templateUrl: 'date-picker.component.html',
  styles: [
    `.hidden{display:none;}
     .date-picker-pointer{cursor: pointer;}
    `
  ],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent implements OnInit, OnChanges, ControlValueAccessor {

  constructor(private cdRef: ChangeDetectorRef) { }

  @HostBinding('class.vclDatePicker')
  _hostClasses = true;

  @HostBinding('attr.role')
  _hostAttrRole = 'listbox';

  @HostBinding('attr.aria-multiselectable')
  _hostAttrAriaMultiselectable = false;

  // behavior
  @Input()
  closeOnSelect = false;

  @HostBinding('class.vclDisabled')
  @Input()
  disabled = false;

  // styling
  @Input()
  highlightToday = true;

  @Input()
  highlightSelected = true;

  @Input()
  displayWeekNumbers = true;

  @Input()
  displayWeekdays = true;

  @Input()
  displayDate = true;

  @Input()
  displayTime = false;

  @Input()
  displayHours24 = true;

  @Input()
  displayHours = true;

  @Input()
  displayMinutes = true;

  @Input()
  displaySeconds = false;

  @Input()
  prevYearBtnIcon = 'fas:chevron-left';

  @Input()
  nextYearBtnIcon = 'fas:chevron-right';

  @Input()
  displayJumpToday = true;

  @Input()
  displayJumpSelected = true;

  // values
  @Input()
  selectedDate: Date | undefined;

  @Input()
  selectRange = false;

  @Input()
  selectedRangeEnd: Date | undefined;

  @Input()
  maxRangeLength = Infinity;

  @Input()
  minDate: Date | undefined;

  @Input()
  maxDate: Date | undefined;

  @Input()
  config: DatePickerConfig | undefined;

  @Output()
  dateChange = new EventEmitter<Date | Array<Date | undefined>>();

  currentDate: CalendarDate | undefined;
  currentRangeEnd: CalendarDate | undefined;
  viewDate: CalendarDate;
  today: CalendarDate = new CalendarDate();

  showYearPick = false;

  ngOnInit() {
    if (this.config) {
      Object.keys(this.config).forEach(key => {
        this[key] = this.config[key];
      });
    }

    this.setDate(this.selectedDate);

    if (this.selectedRangeEnd) {
      this.selectRange = true;
      this.select(new CalendarDate(this.selectedRangeEnd));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedDate) {
      this.setDate(changes.selectedDate.currentValue);
    }
  }

  setDate(date?: Date) {
    if (date) {
      this.currentDate = new CalendarDate(date);
      this.viewDate = this.currentDate.clone();
    } else {
      this.viewDate = new CalendarDate();
    }
  }

  showYear() {
    if (this.disabled) {
      return;
    }

    this.showYearPick = true;
  }

  onDateTap(date: CalendarDate) {
    const isDayDisabled: boolean = this.isDayDisabled(date);
    if (this.disabled || isDayDisabled) { return; }

    this.select(date);

    if (!this.selectRange) {

      if (this.currentDate && !this.currentDate.isSameMonthAndYear(this.viewDate)) {
        this.gotoSelected();
      }

      const currentDate = this.currentDate ? this.currentDate.date : undefined;
      this.onChange && this.onChange(currentDate);
      this.dateChange.emit(currentDate);
      this.selectedDate = currentDate;
    } else {
      const currentDate = this.currentDate ? this.currentDate.date : undefined;
      if (currentDate) {
        this.onChange && this.onChange(currentDate);
      }
      this.dateChange.emit([currentDate, this.currentRangeEnd ? this.currentRangeEnd.date : undefined]);
    }
  }

  /**
   * activate the given date
   */
  select(date: CalendarDate) {
    if (!this.selectRange) {
      this.currentDate = date;
    } else {

      if (this.currentDate && this.currentRangeEnd) {
        this.currentDate = date;
        this.currentRangeEnd = undefined;
      } else if (this.currentDate && !this.currentRangeEnd) {
        this.currentRangeEnd = date;
      } else if (!this.currentDate) {
        this.currentDate = date;
      }

      // swap values if currentDate > currentRangeEnd
      if (
        this.currentRangeEnd &&
        this.currentDate &&
        this.currentRangeEnd.date < this.currentDate.date
      ) {
        this.currentRangeEnd.date = [this.currentDate.date, this.currentDate.date = this.currentRangeEnd.date][0]; // swap values
      }

      // if more days selected than maxRangeLength, strip days
      if (
        this.selectRange &&
        this.currentRangeEnd &&
        this.currentDate &&
        this.currentDate.daysInRange(this.currentRangeEnd) > this.maxRangeLength
      ) {
        const diffDays = this.currentDate.daysInRange(this.currentRangeEnd) - this.maxRangeLength;
        this.currentRangeEnd.moveDays(diffDays * (-1));
      }
    }
  }

  /**
   * ui-markers
   */
  isMarked(date: CalendarDate): boolean {
    if (!this.selectRange && this.currentDate && this.currentDate.isSameDay(date)) { return true; }

    return !!this.currentDate && !!this.currentRangeEnd && date.inRange(this.currentDate, this.currentRangeEnd);
  }

  isBeginning(date: CalendarDate): boolean {
    return this.selectRange && !!this.currentDate && this.currentDate.isSameDay(date);
  }

  isEnd(date: CalendarDate): boolean {
    return this.selectRange && !!this.currentRangeEnd && this.currentRangeEnd.isSameDay(date);
  }

  isDayDisabled(day: CalendarDate): boolean {
    const minDate = this.minDate || new Date(0, 0, 1);
    const maxDate = this.maxDate || new Date(10000, 0, 1);
    return day.gt(maxDate) || day.lt(minDate);
  }

  /**
   * functions to move viewDate
   */
  nextMonth() {
    const viewDate = this.viewDate || new CalendarDate();
    if (this.showYearPick) {
      this.viewDate = viewDate.addYears(1);
    } else {
      this.viewDate = viewDate.incrementMonths(1);
    }
  }

  prevMonth() {
    const viewDate = this.viewDate || new CalendarDate();
    if (this.showYearPick) {
      this.viewDate = viewDate.addYears(-1);
    } else {
      this.viewDate = viewDate.incrementMonths(-1);
    }
  }

  gotoToday() {
    this.viewDate = new CalendarDate();
  }

  gotoSelected() {
    this.viewDate = this.currentDate || new CalendarDate();
  }

  yearPickSelect(year: number) {
    if (this.disabled) {
      return;
    }
    const viewDate = this.viewDate || new CalendarDate();
    this.viewDate = viewDate.moveToYear(year);
    this.showYearPick = false;
  }

  writeValue(value: Date): void {
    this.selectedDate = value;
    this.currentDate = value ? new CalendarDate(value) : undefined;
    this.viewDate = this.currentDate ? this.currentDate : new CalendarDate();
    this.cdRef.markForCheck();
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.cdRef.markForCheck();
  }

  timeChange(date: Date) {
    this.selectedDate = date;
    this.currentDate = date ? new CalendarDate(date) : undefined;
    if (this.currentDate) {
      this.onDateTap(this.currentDate);
    }
    this.viewDate = this.currentDate ? this.currentDate : new CalendarDate();
    this.cdRef.markForCheck();
  }

  /**
   * things needed for ControlValueAccessor-Interface
   */
  private onChange: (_: any) => void = () => {};
  private onTouched: () => any = () => {};

}
