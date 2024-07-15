import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [ HomePageComponent, ConfirmationDialogComponent],
  imports: [
      CommonModule,
      MatDialogModule,
      FormsModule,
      MatIconModule
  ],
  exports:[
    HomePageComponent
  ]
})
export class HomePageModule { }
