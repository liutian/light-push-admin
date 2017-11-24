import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

const scriptPath = 'assets/lib/clipboard/';

@Directive({
  selector: '[pCopy]'
})
export class CopyDirective implements OnInit, OnDestroy {

  @Input() copyText: string;
  clipboard: any;

  constructor(private eleRef: ElementRef) { }

  ngOnInit() {
    if (!window.ClipboardL) {
      window.LazyLoad.js(scriptPath + 'clipboard.min.js', this.init, null, this);
    } else {
      this.init();
    }
  }

  init() {
    const ele = this.eleRef.nativeElement;
    this.clipboard = new window.ClipboardL(ele, {
      text: () => {
        return this.copyText;
      }
    });
  }

  ngOnDestroy() {
    this.clipboard.destroy();
  }
}
