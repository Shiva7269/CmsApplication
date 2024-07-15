import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { HomePageModule } from './home-page/home-page.module';
import { PageCreationPopupModule } from './pop-up/page-creation-popup/page-creation-popup.module';
import { HtmlEditorService, ImageService, LinkService, RichTextEditorModule, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { ComponentsModule } from './components/components.module';
import { TemplateModule } from './template/template.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageModule } from './page/page.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BannerComponent } from './components/banner/banner.component';
import { LayoutsModule } from './layouts/layouts.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomePageModule,
    PageCreationPopupModule,
    RichTextEditorModule,
    ComponentsModule,
    TemplateModule,
    PageModule,        
    ReactiveFormsModule,
    FormsModule,
    LayoutsModule,
    ToastrModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()  
  ],
  providers: [
    provideAnimationsAsync(),
    ToolbarService,LinkService,ImageService,HtmlEditorService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
