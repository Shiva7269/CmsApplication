

import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../../services/pages.service';

interface NavbarItem {
  title: string;
  url: string;
}

interface PageComponent {
  name: string;
  headerItems?: NavbarItem[];
  headerImageUrl?: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  headerItems: NavbarItem[] = [];
  newItem: NavbarItem = { title: '', url: '' };
  headerImageUrl: string = '';
  pageId: any;
  @Input() editMode: boolean = true;
  showAddItemModal: boolean = false;
  showEditItemModal: boolean = false;
  editIndex: number | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private pagesService: PagesService
  ) { }

  ngOnInit() {
    this.route.url.subscribe(urlSegments => {
      const pageUrl = urlSegments.map(segment => segment.path).join('/');
      if (pageUrl.includes('template')) {
        this.editMode = true;
      }
      else{
        this.editMode = false;
      }
      this.pagesService.getPageIdByUrl(pageUrl).subscribe(pageId => {
        if (pageId) {
          this.pageId = pageId;
          this.loadData();
        }
      });
    });
  }

  addItem() {
    if (this.newItem.title && this.newItem.url) {
      this.headerItems.push({ ...this.newItem });
      this.newItem = { title: '', url: '' };
      this.closeModal();
    }
  }

  saveItem() {
    if (this.editIndex !== null && this.headerItems[this.editIndex]) {
      this.closeModal();
    }
  }

  removeItem() {
    if (this.editIndex !== null && this.headerItems[this.editIndex]) {
      this.headerItems.splice(this.editIndex, 1);
      this.closeModal();
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('headerFileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const filePath = `assets/images/${file.name}`;
      this.headerImageUrl = filePath;
    }
  }

  saveData(): void {
    this.pagesService.getPage(this.pageId).subscribe(pageData => {
      const updatedComponents = pageData.components.map((component: PageComponent) => {
        if (component.name === 'header') {
          return { ...component, headerItems: this.headerItems, headerImageUrl: this.headerImageUrl };
        }
        return component;
      });

      this.http.put(`http://localhost:5000/pages/${this.pageId}`, {
        ...pageData,
        components: updatedComponents
      }).subscribe(() => {
        alert('Header data saved successfully!');
      });
    });
  }

  loadData(): void {
    this.pagesService.getPage(this.pageId).subscribe(data => {
      const headerComponent = data.components.find((component: PageComponent) => component.name === 'header');
      if (headerComponent) {
        if (headerComponent.headerItems) {
          this.headerItems = headerComponent.headerItems;
        }
        if (headerComponent.headerImageUrl) {
          this.headerImageUrl = headerComponent.headerImageUrl;
        }
      }
    });
  }

  openAddItemModal(): void {
    this.showAddItemModal = true;
    this.newItem = { title: '', url: '' };
    this.editIndex = null;
  }

  openEditItemModal(index: number): void {
    this.showEditItemModal = true;
    this.editIndex = index;
  }

  closeModal(): void {
    this.showAddItemModal = false;
    this.showEditItemModal = false;
    this.editIndex = null;
  }
  closeAddItemModal(){
    this.showAddItemModal = false;
  }

  isValidItem(): boolean {
    if (this.editIndex !== null && this.headerItems[this.editIndex]) {
      const item = this.headerItems[this.editIndex];
      return !!(item.title && item.url); // Use !! to convert truthy/falsy values to boolean
    }
    return false;
  }

}
