import { Component, Directive, ContentChildren, QueryList, Input, Output, EventEmitter, Inject, forwardRef, Optional, SkipSelf, AfterContentInit, OnDestroy } from '@angular/core';
import { Router, UrlTree, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

export interface NavigationItem {
  label: string;
  selected?: boolean;
  opened?: boolean;
  heading: boolean;
  prepIcon?: string;
  appIcon?: string;
  class?: string;
  items: NavigationItem[] | undefined;
  href?: string;
  route?: any[];
}

@Directive({
  selector: 'vcl-navitem'
})
export class NavigationItemDirective implements NavigationItem, AfterContentInit, OnDestroy {

  private _route: any[] | undefined;
  private _urlTree: UrlTree | undefined;
  private _subscription: Subscription | undefined;

  @Input()
  label: string;

  @Input()
  name: string;

  get items() {
    return <NavigationItem[]> (this.contentItems && this.contentItems.filter(item => item !== this)) || undefined;
  }

  selected = false;

  @Input()
  selectable = true;

  @Input()
  opened = false;

  @Input()
  heading = false;

  @Input()
  prepIcon: string | undefined;

  @Input()
  appIcon: string | undefined;

  @Input()
  class: string | undefined;

  @Input()
  href: string | undefined;

  @Input()
  exactRoute = true;

  @Input()
  showActive = false;

  @Output()
  hover = new EventEmitter<NavigationItem>();

  @Output()
  leave = new EventEmitter<NavigationItem>();

  @Input()
  set route(route: any[] | undefined) {
    this._route = Array.isArray(route) ? route : [route];
    this._urlTree = this.router.createUrlTree(this._route);
  }

  get route() {
    return this._route;
  }

  @ContentChildren(NavigationItemDirective)
  contentItems: QueryList<NavigationItemDirective>;

  constructor(
    private router: Router,
    @Inject(forwardRef(() => NavigationComponent))
    private nav,
    @Optional() @SkipSelf() @Inject(NavigationItemDirective)
    public parent: NavigationItemDirective | undefined) { }

  private updateSelectedState(): void {
    this.selected = !!this._urlTree && this.router.isActive(this._urlTree, this.exactRoute);
    if (this.selected) {
      this.openParents();
    }
  }

  openParents() {
    const openParents = (item: NavigationItemDirective) => {
      if (item.parent) {
        item.parent.opened = true;
        openParents(item.parent);
      }
    };
    openParents(this);
  }

  ngAfterContentInit() {
    if (this.nav.useRouter) {
      if (this.router.navigated) {
        this.updateSelectedState();
      }

      this._subscription = this.router.events.subscribe(s => {
        if (s instanceof NavigationEnd) {
          this.updateSelectedState();
        }
      });
    }
  }

  ngOnDestroy() {
    this._subscription && this._subscription.unsubscribe();
  }

  get calcPrepIcon(): string | undefined {
    return this.items && this.items.length > 0  && this.nav.subLevelHintIconSide === 'left' ? (
      this.opened ? this.nav.subLevelHintIconOpened : this.nav.subLevelHintIconClosed
    ) : this.prepIcon;
  }

  get calcAppIcon(): string | undefined {
    return this.items && this.items.length > 0  && this.nav.subLevelHintIconSide === 'right' ? (
      this.opened ? this.nav.subLevelHintIconOpened : this.nav.subLevelHintIconClosed
    ) : this.appIcon;
  }

  mouseOver() {
    this.hover.emit(this);
  }

  mouseLeave() {
    this.leave.emit(this);
  }
}

@Component({
  selector: 'nav[vcl-navigation]',
  host: {
    '[class.vclNavigation]': 'true'
  },
  templateUrl: 'navigation.component.html',
})
export class NavigationComponent {

  @Input()
  ident: string;

  @Input()
  ariaRole = 'presentation';

  @Input()
  tabindex = 0;

  @Input()
  type = 'vertical';

  @Input()
  useRouter = false;

  @Input()
  subLevelHintIconClosed = 'fa:chevron-right';

  @Input()
  subLevelHintIconOpened = 'fa:chevron-down';

  @Input()
  subLevelHintIconSide: 'left' | 'right' = 'right';

  @Input()
  inputItems?: QueryList<NavigationItem> | undefined;

  @Output()
  select = new EventEmitter<NavigationItem>();

  @Output()
  navigate = new EventEmitter();

  @ContentChildren(NavigationItemDirective)
  contentItems?: QueryList<NavigationItem>;

  private selectedItem: NavigationItem | undefined;

  constructor(private router: Router) { }

  get navigationItems() {
    return this.inputItems || this.contentItems || [];
  }

  private runItems(cb: (item: NavigationItemDirective) => void) {
    const runItems = (items) => {
      items.forEach(item => {
        cb(item);
        if (item.items) {
          runItems(item.items);
        }
      });
    };
    runItems(this.navigationItems);
  }

  selectRoute(route: any[], openParents = true) {
    this.runItems((item) => {
      if (item.route) {

        // TODO should use containsTree from @angular/router for comparison
        // currently not exposed as public api
        item.selected = item.route.length === route.length && item.route.every((v, i) => v === route[i]);
        if (item.selected) {
          this.selectedItem = item;
          if (openParents) {
            item.openParents();
          }
        }
      }
    });
  }


  selectItem(item: NavigationItemDirective) {
    if (item.items && item.items.length > 0) {
      item.opened = !item.opened;
      return;
    }

    if (!item.selectable) {
      return;
    }

    if (this.selectedItem) {
      this.selectedItem.selected = false;
    }

    item.selected = true;
    this.selectedItem = item;

    if (item.href) {
      window.location.href = item.href;
    } else if (item.route) {
      if (this.useRouter) {
        this.router.navigate(item.route);
      } else {
        this.navigate.emit(item.route);
      }
    }
    this.select.emit(item);
  }

  onSubItemSelect(item) {
    this.selectItem(item);
  }

  mouseOver(item: NavigationItemDirective) {
    item.mouseOver();
  }

  mouseLeave(item: NavigationItemDirective) {
    item.mouseLeave();
  }
}
