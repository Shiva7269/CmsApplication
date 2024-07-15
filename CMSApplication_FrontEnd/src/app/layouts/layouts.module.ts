import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsComponent } from './layouts.component';
import { HomepageLayout1Component } from './homepage-layout1/homepage-layout1.component';
import { FormsModule } from '@angular/forms';
import { HomepageLayout2Component } from './homepage-layout2/homepage-layout2.component';
import { HomepageLayout3Component } from './homepage-layout3/homepage-layout3.component';
import { LayoutsDialogComponent } from './layouts-dialog/layouts-dialog.component';
import { EntryDirective } from '../directives/entry.directive';
import { Layout1Component } from './layout1/layout1.component';
import { PageModule } from '../page/page.module';
import { ListofproductComponent } from './listofproduct/listofproduct.component';
import { Listofproduct2Component } from './listofproduct2/listofproduct2.component';
import { Productdescription1Component } from './productdescription1/productdescription1.component';
import { Productdescription2Component } from './productdescription2/productdescription2.component';




@NgModule({
  declarations: [
    LayoutsComponent,
    HomepageLayout1Component,
    HomepageLayout2Component,
    HomepageLayout3Component,
    LayoutsDialogComponent,
    EntryDirective,
    ListofproductComponent,
    Listofproduct2Component,
    Productdescription1Component,
    Productdescription2Component


 
  ],
  imports: [
    CommonModule,
    FormsModule,
    PageModule
  ]
})
export class LayoutsModule { }
