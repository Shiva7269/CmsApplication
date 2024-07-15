import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { TemplateComponent } from './template/template.component';
import { TexteditorComponent } from './components/texteditor/texteditor.component';
import { PageComponent } from './page/page.component';
import { BannerComponent } from './components/banner/banner.component';
import { Layout1Component } from './layouts/layout1/layout1.component';
import { Layout2Component } from './layouts/layout2/layout2.component';
import { Layout3Component } from './layouts/layout3/layout3.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { ListofproductComponent } from './layouts/listofproduct/listofproduct.component';
import { Listofproduct2Component } from './layouts/listofproduct2/listofproduct2.component';
import { Productdescription1Component } from './layouts/productdescription1/productdescription1.component';
import { Productdescription2Component } from './layouts/productdescription2/productdescription2.component';


const routes: Routes = [
  {path:'layouts',component:LayoutsComponent},
  {
    path:'home', component:HomePageComponent
  },
  {
    path:'text-editor', component:TexteditorComponent
  },
  
  { path: 'listtofprp', component: ListofproductComponent},
  { path: 'listtofprp2', component: Listofproduct2Component},
  { path: 'product/:id', component: Productdescription1Component},
  { path: 'product2/:id', component: Productdescription2Component},
  { path: 'layout1/:pageUrl', component: Layout1Component },
  { path: 'layout2/:pageUrl', component: Layout2Component },
  { path: 'layout3/:pageUrl', component: Layout3Component},

  { path: 'banner', component: BannerComponent },
  { path: 'template/:pageUrl', component: TemplateComponent },
  { path: ':pageUrl', component: PageComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
