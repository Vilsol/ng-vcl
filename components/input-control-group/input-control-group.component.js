"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var InputControlGroup = (function () {
    /*  @Input('message')
      message: Observable<{
        type: 'error' | 'warning' | 'success', value: string
      }>;
      type$; value$; classname$; classes$;
      sub;
    */
    function InputControlGroup(elRef) {
        this.elRef = elRef;
        this.type = null;
        this.elRef = elRef;
    }
    InputControlGroup.prototype.ngOnInit = function () {
        // TODO(dmeyer) this is commented out because i will switch from passing streams to the default 2-way-binding
        /*
            if (!this.message) return;
    
            this.type$ = this.message.map(msg => msg.type || null);
            this.value$ = this.message.map(msg => msg.value || null);
            this.classname$ = this.type$.map(t => {
              if (!t) return '';
              return 'vcl' + this.ucfirst(t);
            });
            this.classes$ = this.classname$.map(name => 'vclFormControlHint ' + name);
    
            this.sub = this.classname$.subscribe(newClassname => {
              let els: any[] = Array.from(this.elRef.nativeElement.children)
                .slice(0, -1); // remove last el because it is the message-box
              els = els.filter(el => el.classList.contains('vclInput')); // TODO add more
              els.forEach(el => {
                el.classList.remove('vclError');
                el.classList.remove('vclWarning');
                el.classList.remove('vclSuccess');
                if (newClassname != '') el.classList.add(newClassname);
              });
            });
        */
    };
    InputControlGroup.prototype.ngOnDestroy = function () {
        // if (this.sub) this.sub.unsubscribe();
    };
    InputControlGroup.prototype.ucfirst = function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    return InputControlGroup;
}());
__decorate([
    core_1.Input('type'),
    __metadata("design:type", String)
], InputControlGroup.prototype, "type", void 0);
__decorate([
    core_1.Input('label'),
    __metadata("design:type", String)
], InputControlGroup.prototype, "label", void 0);
InputControlGroup = __decorate([
    core_1.Component({
        selector: 'vcl-input-control-group',
        host: {
            '[class.vclInputControlGroup]': 'true',
        },
        templateUrl: 'input-control-group.component.html'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], InputControlGroup);
exports.InputControlGroup = InputControlGroup;
