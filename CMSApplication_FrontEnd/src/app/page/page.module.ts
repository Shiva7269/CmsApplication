import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
 import { DynamicComponentDirective } from '../directives/dynamic-component.directive';
import { Layout1Component } from '../layouts/layout1/layout1.component';
import { Layout2Component } from '../layouts/layout2/layout2.component';
import { Layout3Component } from '../layouts/layout3/layout3.component';



@NgModule({
  declarations: [
    PageComponent,
    DynamicComponentDirective,
    Layout1Component,
    Layout2Component,
    Layout3Component
  ],
  imports: [
    CommonModule
  ]
})
export class PageModule { }
