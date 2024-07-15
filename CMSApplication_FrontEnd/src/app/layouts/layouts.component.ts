import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LayoutsDialogComponent } from './layouts-dialog/layouts-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.css'
})
export class LayoutsComponent{
  constructor(private dialog: MatDialog,private router: Router) {}

  openLayout(layout: string): void {
    const dialogRef = this.dialog.open(LayoutsDialogComponent, {
      width: '80%',
      data: { layout: layout }
    });

    dialogRef.afterClosed().subscribe(result => {
   //   console.log('The dialog was closed');
    });
  }
  homeNavigation(){
    this.router.navigate(['/home'])
  }
}
