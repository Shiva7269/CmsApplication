import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../../services/pages.service';
import { ToastrService } from 'ngx-toastr';

interface CarouselItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  interval?: number;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @Input() editMode: boolean = true;
  items: CarouselItem[] = [];
  currentItemIndex: number = 0;
  pageId: any;
  isModalOpen: boolean = false;
  newItem: CarouselItem = { id: '', imageUrl: '', title: '', description: '' };
  selectedItem: CarouselItem = { id: '', imageUrl: '', title: '', description: '' };
  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private pagesService: PagesService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
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

  prev(): void {
    this.currentItemIndex = (this.currentItemIndex - 1 + this.items.length) % this.items.length;
  }

  next(): void {
    this.currentItemIndex = (this.currentItemIndex + 1) % this.items.length;
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  saveData(): void {
    this.pagesService.getPage(this.pageId).subscribe(pageData => {
      const updatedComponents = pageData.components.map((component: any) => {
        if (component.name === 'carousel') {
          return { ...component, items: this.items };
        }
        return component;
      });

      this.http.put(`http://localhost:5000/pages/${this.pageId}`, {
        ...pageData,
        components: updatedComponents
      }).subscribe(() => {
        // alert('Data saved successfully!');
        this.toastr.success('Data saved successfully!', 'Success', {
          positionClass: 'toast-top-right',
          closeButton: true
        });
      });
    });
  }

  loadData(): void {
    this.pagesService.getPage(this.pageId).subscribe(data => {
      const carouselComponent = data.components.find((component: any) => component.name === 'carousel');

      if (carouselComponent && carouselComponent.items) {
        this.items = carouselComponent.items;
      }
    });
  }

  openAddItemModal() {
    this.isEditMode = false;
    this.selectedItem = { id: '', imageUrl: '', title: '', description: '' }; // Reset selectedItem
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveItem() {
    if (this.isEditMode && this.selectedItem.id) {
      const index = this.items.findIndex(item => item.id === this.selectedItem.id);
      if (index !== -1) {
        this.items[index] = { ...this.selectedItem };
      }
    } else {
      this.selectedItem.id = `item${this.items.length + 1}`;
      this.items.push({ ...this.selectedItem });
    }
    this.saveData();
    this.closeModal();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const filePath = `assets/images/${file.name}`;
      this.selectedItem.imageUrl = filePath;
    }
  }

  showItemDetails(item: CarouselItem) {
    this.isEditMode = true;
    this.selectedItem = { ...item };
    this.isModalOpen = true;
  }

  deleteItem(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
    this.saveData();
  }
}