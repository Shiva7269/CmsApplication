import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageCreationPopupModule } from '../pop-up/page-creation-popup/page-creation-popup.module';
import { PageCreationPopupComponent } from '../pop-up/page-creation-popup/page-creation-popup.component';
import { PagesService } from '../services/pages.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  
  pages: any[] = [];
  constructor(private dialog: MatDialog,private pageService: PagesService,private router: Router,private pagesService: PagesService) {}
  ngOnInit(): void {
    this.fetchPages()
    this.pageService.getPages().subscribe(data => {
      this.pages = data;
      // console.log(this.pages);  
    });
  }
  openCreatePageModal(): void {
    const dialogRef = this.dialog.open(PageCreationPopupComponent, {
      width: '400px' 
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchPages()
    });
  }
  redirectToTemplate(pageUrl: string) {
    const cleanPageUrl = pageUrl.startsWith('/') ? pageUrl.substring(1) : pageUrl; // Remove leading slash if present
    this.router.navigate(['/template', cleanPageUrl]);
  }
  preview(pageId: string): void {
    this.pagesService.getPage(pageId).subscribe(
      (page) => {
        if (page && page.components && page.components.length > 0) {
          // Redirect only if there are components in the response
          // console.log(page.layout/page.pageUrl);
          this.router.navigate(['/',page.layout , page.pageUrl]);
        } else {
          console.error('Page does not contain components.');
          // Handle the case where there are no components
          // For example, display an error message or take other action
        }
      },
      (error) => {
        console.error('Error fetching page:', error);
      }
    );
  }

  deletePage(pageId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pageService.deletePage(pageId).subscribe(
          () => {
            // Handle successful deletion, such as removing the page from the local list of pages
            this.fetchPages(); // Optionally, fetch pages again to reflect changes
          },
          error => {
            // Handle error
            console.error('Error deleting page:', error);
          }
        );
      }
    });
  }
  fetchPages(){
    this.pageService.getPages().subscribe(data => {
      this.pages = data;
      // console.log(this.pages);  
    });
  }

  pageContainsComponents(page: any): boolean {
    return page && page.components && page.components.length > 0;
  }
  openLayoutsModal(){
    this.router.navigate(['/layouts'])
  }
}
