import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../../services/pages.service';
import { ToastrService } from 'ngx-toastr';
import { FooterItem } from '../../models/footer-item';
import { ContactInfo } from '../../models/contact-info';
import { PageComponent } from '../../models/page-component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  footerItems: FooterItem[] = [];
  contactInfo: ContactInfo = { phone: '', email: '', address: '' };
  newItem: FooterItem = { title: '', url: '' };
  pageId: any;
 editMode!: boolean;
  showAddItemModal: boolean = false;
  editContactInfo: boolean = false;

  titles = {
    contactUs: 'Contact Us',
    quickLinks: 'Quick Links',
    followUs: 'Follow Us',
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.url.subscribe((urlSegments) => {
      const pageUrl = urlSegments.map((segment) => segment.path).join('/');
      if (pageUrl.includes('template')) {
        this.editMode = true;
      }
      else{
        this.editMode = false;
      }
      this.pagesService.getPageIdByUrl(pageUrl).subscribe((pageId) => {
        
        if (pageId) {
          this.pageId = pageId;
          this.loadData();
        }
      });
    });
  }

  addItem() {
    if (this.newItem.title && this.newItem.url) {
      this.footerItems.push({ ...this.newItem });
      this.newItem = { title: '', url: '' };
      this.closeAddItemModal();
    }
  }

  saveData() {
    this.pagesService.getPage(this.pageId).subscribe((pageData) => {
      const updatedComponents = pageData.components.map(
        (component: PageComponent) => {
          if (component.name === 'footer') {
            return {
              ...component,
              footerItems: this.footerItems,
              contactInfo: this.contactInfo,
              titles: this.titles,
            };
          }
          return component;
        }
      );

      this.http
        .put(`http://localhost:5000/pages/${this.pageId}`, {
          ...pageData,
          components: updatedComponents,
        })
        .subscribe(() => {
          this.toastr.success('Footer data saved successfully!', 'Success', {
            positionClass: 'toast-top-right',
            closeButton: true,
          });
        });
    });
  }

  loadData() {
    this.pagesService.getPage(this.pageId).subscribe((data) => {
      const footerComponent = data.components.find(
        (component: PageComponent) => component.name === 'footer'
      );
      if (footerComponent) {
        if (footerComponent.footerItems) {
          this.footerItems = footerComponent.footerItems;
        }
        if (footerComponent.contactInfo) {
          this.contactInfo = { ...footerComponent.contactInfo };
        }
        if (footerComponent.titles) {
          this.titles = { ...footerComponent.titles };
        }
      }
    });
  }

  removeItem(index: number) {
    this.footerItems.splice(index, 1);
  }

  openAddItemModal(): void {
    this.showAddItemModal = true;
  }

  closeAddItemModal(): void {
    this.showAddItemModal = false;
  }

  toggleEditContactInfo(): void {
    this.editContactInfo = !this.editContactInfo;
  }

  saveContactInfo(): void {
    this.saveData();
    this.toggleEditContactInfo();
  }
}
