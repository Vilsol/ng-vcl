"use strict";
var core_1 = require('@angular/core');
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
    InputControlGroup.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vcl-input-control-group',
                    host: {
                        '[class.vclInputControlGroup]': 'true',
                    },
                    templateUrl: 'input-control-group.component.html'
                },] },
    ];
    /** @nocollapse */
    InputControlGroup.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    InputControlGroup.propDecorators = {
        'type': [{ type: core_1.Input, args: ['type',] },],
        'label': [{ type: core_1.Input, args: ['label',] },],
    };
    return InputControlGroup;
}());
exports.InputControlGroup = InputControlGroup;
