import { Directive, Input, ViewContainerRef, ComponentFactoryResolver, Injector, Type, ComponentRef } from '@angular/core';

@Directive({
  selector: '[dynamicComponent]'
})
export class DynamicComponentDirective {
  @Input() set dynamicComponent(config: { component: Type<any>, data: any }) {
    const { component, data } = config;
    const factory = this.resolver.resolveComponentFactory(component);
    const injector = Injector.create({
      providers: [{ provide: 'data', useValue: data }],
      parent: this.injector
    });
    this.viewContainerRef.clear();
    const componentRef: ComponentRef<any> = this.viewContainerRef.createComponent(factory, 0, injector);
    Object.assign(componentRef.instance, data);
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) { }
}
