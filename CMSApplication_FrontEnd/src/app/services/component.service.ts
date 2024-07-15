import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { componentMap } from '../component_map/component-map';


@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  createComponent(componentName: string, container: ViewContainerRef) {
    const componentInfo = componentMap[componentName];
    if (!componentInfo) {
      console.error('Invalid component name:', componentName);
      return;
    }

    const componentType = componentInfo.type;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    container.createComponent(componentFactory);
  }
}
