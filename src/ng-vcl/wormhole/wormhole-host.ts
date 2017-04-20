import { ViewContainerRef, Type, TemplateRef, ApplicationRef, Injector } from "@angular/core";
import { DomComponentWormhole, ComponentWormhole, TemplateWormhole, Wormhole, WormholeOptions } from "./wormhole";

export abstract class WormholeHostBase {

  protected _wormholes: Wormhole[] = [];

  get wormholes() {
    return this._wormholes.filter(w => w.isConnected).length;
  }

  get connectedWormholes() {
    return this._wormholes.filter(w => w.isConnected).length;
  }

  getWormhole(index: number): Wormhole | undefined {
    return this._wormholes[index];
  }

  abstract createWormhole<T>(component: Type<T>): Wormhole;
  abstract createWormhole<T>(templateRef: TemplateRef<T>): Wormhole;
  abstract createWormhole<T>(arg2: Type<T> | TemplateRef<T>): Wormhole;

  connectWormhole<T>(component: Type<T>, opts?: WormholeOptions): Wormhole;
  connectWormhole<T>(templateRef: TemplateRef<T>, opts?: WormholeOptions): Wormhole;
  connectWormhole(target, opts?: WormholeOptions): Wormhole {
    const wormhole = this.createWormhole(target);
    wormhole.connect(opts);
    return wormhole;
  }

  disconnectWormhole(index: number) {
    let w = this.getWormhole(index);
    if (w) {
      w.disconnect();
    }
  }

  disconnectWormholes() {
    this._wormholes.forEach(w => w.disconnect());
  }

  clearWormholes() {
    this.disconnectWormholes();
    this._wormholes = [];
  }

  removeWormhole(wormhole: Wormhole | number) {
    let w = typeof wormhole === 'number' ? this.getWormhole(wormhole) : wormhole;
    if (w) {
      w.disconnect();
      this._wormholes = this._wormholes.filter(cw => cw !== w);
    }
  }
}


export class WormholeHost extends WormholeHostBase {

  constructor(private _host: ViewContainerRef, private _injector?: Injector) {
    super();
    if (!_host) {
      throw 'missing host ViewContainerRef';
    }
  }

  createWormhole<T>(component: Type<T>): Wormhole;
  createWormhole<T>(templateRef: TemplateRef<T>): Wormhole;
  createWormhole<T>(arg2: Type<T> | TemplateRef<T>): Wormhole {
    let wormhole: Wormhole;
    if (typeof arg2 === 'function' && this._host) {
      wormhole = new ComponentWormhole(arg2, this._host, this._injector);
    } else if (arg2 instanceof TemplateRef && this._host) {
      wormhole = new TemplateWormhole(arg2, this._host);
    } else {
      throw 'Parameter must be component class or templateRef';
    }
    this._wormholes.push(wormhole);
    return wormhole;
  }
}

export class DomWormholeHost extends WormholeHostBase {

  constructor(private _host: ApplicationRef, private _node?: HTMLElement, private _injector?: Injector) {
    super();
    if (!_host) {
      throw 'missing host ApplicationRef';
    }
  }

  createWormhole<T>(component: Type<T>): Wormhole;
  createWormhole<T>(templateRef: TemplateRef<T>): Wormhole;
  createWormhole<T>(arg2: Type<T> | TemplateRef<T>): Wormhole {
    let wormhole: Wormhole;
    if (typeof arg2 === 'function' && this._host instanceof ApplicationRef) {
      wormhole = new DomComponentWormhole(arg2, this._host, this._node, this._injector);
    } else if (arg2 instanceof TemplateRef && this._host) {
      throw 'templateRef not supported in DomWormholeHost';
    } else {
      throw 'Parameter must be component class or templateRef';
    }
    this._wormholes.push(wormhole);
    return wormhole;
  }
}
