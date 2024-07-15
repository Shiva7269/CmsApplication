import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './template.component';
import { ComponentsModule } from '../components/components.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TemplateComponent,
  ],
  imports: [
    CommonModule, 
    ComponentsModule,
    DragDropModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
})
export class TemplateModule { }
