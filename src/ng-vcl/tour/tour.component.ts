import { Component, Input, OnInit, HostBinding, ElementRef, ViewChild } from '@angular/core';
import { AttachmentX, AttachmentY, PopoverComponent } from '@ng-vcl/ng-vcl';
import { TourService } from './tour.service';
import { HintConfig } from './types';

@Component({
  selector: HintConfig.HINT_TAG,
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {
  private static readonly Tag: string = 'TourComponent';
  private tag: string;

  @Input() private readonly debug: boolean = false;
  @Input() public readonly debugPopover: boolean = false;

  @ViewChild('popover') public readonly popover: PopoverComponent;

  @HostBinding('class') public get classes(): string {
    return `vclTourContainer step${this.order}`;
  }

  @Input() public title: string;
  @Input() public order: number;

  @Input() public target: string | ElementRef | Element;
  @Input() public targetX: AttachmentX = AttachmentX.Center;
  @Input() public attachmentX: AttachmentX = AttachmentX.Center;
  @Input() public targetY: AttachmentY = AttachmentY.Bottom;
  @Input() public attachmentY: AttachmentY = AttachmentY.Top;

  public visible: boolean = false;

  public hasNext: boolean = false;
  public hasPrevious: boolean = false;

  constructor(public tour: TourService) {
    const tag: string = `${this.tag}.constructor()`;
    const debug: boolean = this.debug || false;
    if (debug) console.log(tag, 'tour.options:', tour.options);
  }

  public ngOnInit(): void {
    this.tag = `${TourComponent.Tag}.${this.target}`;

    const tag: string = `${this.tag}.ngOnInit()`;
    const debug: boolean = this.debug || false;
    this.tour.register(this);
  }

  public show(): void {
    const tag: string = `${this.tag}.show()`;
    const debug: boolean = this.debug || false;

    const el: HTMLElement = this.popover.targetElement as HTMLElement;
    if (debug) console.log(tag, 'el:', el);
    if (el) {

      el.style.zIndex = HintConfig.Z_INDEX;

      if (debug) console.log(tag, 'tour.options.elementsDisabled:', this.tour.options.elementsDisabled);
      if (this.tour.options.elementsDisabled) {
        this.disableClick(el);
      }

      if (debug) console.log(tag, 'tour.options.applyRelative:', this.tour.options.applyRelative);
      if (this.tour.options.applyRelative) {
        this.enableHighlight(el);
      }
    }

    this.visible = true;
    this.hasNext = this.tour.hasNext;
    this.hasPrevious = this.tour.hasPrevious;
    if (debug) console.log(tag, 'this:', this);
  }

  public exit(): void {
    const tag: string = `${this.tag}.exit()`;
    const debug: boolean = this.debug || false;
    if (debug) console.log(tag);
    this.tour.end();
  }

  public next(): void {
    const tag: string = `${this.tag}.next()`;
    const debug: boolean = this.debug || false;
    if (debug) console.log(tag);
    this.tour.showNext();
  }

  public previous(): void {
    const tag: string = `${this.tag}.previous()`;
    const debug: boolean = this.debug || false;
    if (debug) console.log(tag);
    this.tour.showPrevious();
  }

  public hide(): void {
    const tag: string = `${this.tag}.hide()`;
    const debug: boolean = this.debug || false;

    const highlightedElement: HTMLElement = this.popover.targetElement as HTMLElement;
    if (debug) console.log(tag, 'highlightedElement:', highlightedElement);

    if (highlightedElement) {
      highlightedElement.style.zIndex = null;
      this.enableClick(highlightedElement);
      this.disableHighlight(highlightedElement);
    }

    this.visible = false;
    if (debug) console.log(tag, 'this:', this);
  }

  private disableClick(element: HTMLElement): void {
    element.style.cursor = 'default';
    element.style.pointerEvents = 'none';
  }
  private enableClick(element: HTMLElement): void {
    element.style.cursor = null;
    element.style.pointerEvents = null;
  }

  private enableHighlight(element: HTMLElement): void {
    element.style.position = 'relative';
  }

  private disableHighlight(element: HTMLElement): void {
    element.style.position = null;
  }
}