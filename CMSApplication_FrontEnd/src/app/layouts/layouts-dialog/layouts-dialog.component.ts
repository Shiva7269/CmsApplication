import { Component, ComponentFactoryResolver, Inject, OnInit, ViewChild } from '@angular/core';
import { EntryDirective } from '../../directives/entry.directive';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HomepageLayout1Component } from '../homepage-layout1/homepage-layout1.component';
import { HomepageLayout2Component } from '../homepage-layout2/homepage-layout2.component';
import { HomepageLayout3Component } from '../homepage-layout3/homepage-layout3.component';
import { PageCreationPopupComponent } from '../../pop-up/page-creation-popup/page-creation-popup.component';
import { PagesService } from '../../services/pages.service';


@Component({
  selector: 'app-layouts-dialog',
  templateUrl: './layouts-dialog.component.html',
  styleUrls: ['./layouts-dialog.component.css']
})
export class LayoutsDialogComponent implements OnInit {
  @ViewChild(EntryDirective, { static: true }) entry!: EntryDirective;
  pages: any[] = [];

  constructor(
    private dialog: MatDialog,
    private componentFactoryResolver: ComponentFactoryResolver,
    private dialogRef: MatDialogRef<LayoutsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pageService: PagesService
  ) {}

  ngOnInit() {
    this.loadComponent();
  //  console.log('layout', this.data.layout);
  }

  loadComponent() {
    let componentFactory;

    switch (this.data.layout) {
      case 'layout1':
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(HomepageLayout1Component);
        break;
      case 'layout2':
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(HomepageLayout2Component);
        break;
      case 'layout3':
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(HomepageLayout3Component);
        break;

        break;
      default:
        return;
    }

    const viewContainerRef = this.entry.viewContainerRef;
    viewContainerRef.clear();

    viewContainerRef.createComponent(componentFactory);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  createLayOut(layout: string): void {
    const dialogRef = this.dialog.open(PageCreationPopupComponent, {
      width: '400px',
      data: { layout: layout } // Pass the selected layout to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchPages();
    });
  }

  fetchPages() {
    this.pageService.getPages().subscribe(data => {
      this.pages = data;
     // console.log(this.pages);
    });
  }
}
