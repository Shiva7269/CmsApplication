import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appEntry]'
})
export class EntryDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
