import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../../services/pages.service';

interface CardItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() editMode: boolean = true;
  items: CardItem[] = [];
  pageId: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private pagesService: PagesService
  ) { }

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      const pageUrl = urlSegments.map(segment => segment.path).join('/');
      this.pagesService.getPageIdByUrl(pageUrl).subscribe(pageId => {
        if (pageId) {
          this.pageId = pageId;
          this.loadData();
        }
      });
    });
  }

  addItem(): void {
    const newItem: CardItem = {
      id: `item${this.items.length + 1}`,
      imageUrl: '',
      title: `Item ${this.items.length + 1}`,
      description: `Description ${this.items.length + 1}`
    };
    this.items.push(newItem);
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  triggerFileInput(index: number): void {
    const fileInput = document.getElementById(`fileInput${index}`) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const filePath = `assets/images/${file.name}`;
      this.items[index].imageUrl = filePath;
    }
  }
  saveData(): void {
    this.pagesService.getPage(this.pageId).subscribe(pageData => {
      const updatedComponents = pageData.components.map((component: any) => {
        if (component.name === 'cards') {
          return { ...component, items: this.items };
        }
        return component;
      });

      this.http.put(`http://localhost:5000/pages/${this.pageId}`, {
        ...pageData,
        components: updatedComponents
      }).subscribe(() => {
        alert('Data saved successfully!');
      });
    });
  }


  loadData(): void {
    this.pagesService.getPage(this.pageId).subscribe(data => {
      const cardsComponent = data.components.find((component: any) => component.name === 'cards');

      if (cardsComponent && cardsComponent.items) {
        this.items = cardsComponent.items;
      }
    });
  }
}
