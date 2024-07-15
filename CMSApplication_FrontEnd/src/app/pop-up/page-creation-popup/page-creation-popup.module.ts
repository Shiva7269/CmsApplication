import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageCreationPopupComponent } from './page-creation-popup.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PageCreationPopupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    PageCreationPopupComponent
  ]
})
export class PageCreationPopupModule { }
