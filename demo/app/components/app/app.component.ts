import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MediaMatcher, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, RouteConfigLoadEnd, RouteConfigLoadStart, RouterEvent } from '@angular/router';
import { routes } from './../../app-routing.module';
import Fuse from 'fuse.js';
import { map, distinctUntilChanged, scan } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DrawerComponent } from '@vcl/ng-vcl';

declare var gitBranch: string;

@Component({
  selector: 'demo-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) { }

  @ViewChild('drawer', {
    static: true,
    read: DrawerComponent
  })
  drawer: DrawerComponent;

  breakpointSub: Subscription;

  xsmall = true;
  left = true;

  busy$ = this.router.events.pipe(
    scan<RouterEvent, number>((cur, event) => {
      if ( event instanceof RouteConfigLoadStart ) {
        return cur + 1;
      } else if ( event instanceof RouteConfigLoadEnd ) {
        return cur - 1;
      }
      return cur;
    }, 0),
    map(cnt => cnt > 0),
    distinctUntilChanged(),
  );

  version = require('./../../../../package.json').version;
  gitBranch = window['gitBranch'] ?? undefined;

  GROUPED_DEMOS = (() => {
    const itemsMap = {};
    routes.forEach(r => {
      if (r.data && r.data.demo) {
        const demo = r.data.demo;
        if (!itemsMap[demo.category]) { itemsMap[demo.category] = []; }

        itemsMap[demo.category].push({
          label: demo.label,
          route: ['/' + r.path]
        });
      }
    });

    return Object.keys(itemsMap).map(category => ({
      label: category,
      items: itemsMap[category]
    }));
  })();

  searchResults = [];

  onNavItemClick() {
    if (this.xsmall) {
      this.drawer.close();
    }
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      window.scrollTo(0, 0);
    });

    this.breakpointObserver.observe([
      Breakpoints.XSmall,
    ]).subscribe(state => {
      this.xsmall = state.breakpoints[Breakpoints.XSmall];
    });
  }

  ngOnDestroy() {
    this.breakpointSub && this.breakpointSub.unsubscribe();
  }

  async search(text) {
    this.searchResults = new Fuse(this.GROUPED_DEMOS, {
      keys: ['items.label']
    }).search(text)
      .reduce<any[]>((p: any[], demoGroup: any) => {
        return p.concat(new Fuse(demoGroup.items, { keys: ['label'] }).search(text));
      }, []);
  }
}
