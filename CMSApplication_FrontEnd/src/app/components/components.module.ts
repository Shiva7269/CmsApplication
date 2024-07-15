import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TexteditorComponent } from './texteditor/texteditor.component';
import { HtmlEditorService, ImageService, LinkService, RichTextEditorModule, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { CarouselComponent } from './carousel/carousel.component';
import { AddAccordionComponent } from './add-accordion/add-accordion.component';
import { RouterModule } from '@angular/router';
import { AddTabsComponent } from './add-tabs/add-tabs.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CardsComponent } from './cards/cards.component';



@NgModule({
  declarations: [
    TexteditorComponent,
    FormComponent,
    CarouselComponent,
    AddAccordionComponent,
    AddTabsComponent,
    NavbarComponent,
    CardsComponent
],
  imports: [
    CommonModule,
    RichTextEditorModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[
    TexteditorComponent,
    FormComponent,
    CarouselComponent,
AddAccordionComponent
  ],
  providers: [
    provideAnimationsAsync(),
    ToolbarService,LinkService,ImageService,HtmlEditorService
  ],
  
})
export class ComponentsModule { }
