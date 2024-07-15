import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../../services/pages.service';
import { ToastrService } from 'ngx-toastr';

interface NavbarItem {
  title: string;
  url: string;
}

interface PageComponent {
  name: string;
  navbarItems?: NavbarItem[];
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarItems: NavbarItem[] = [];
  newItem: NavbarItem = { title: '', url: '' };
  pageId: any;
  @Input() editMode: boolean = true;
  navImageUrl: string = '';


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private toastr: ToastrService

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
      this.navbarItems.push({ ...this.newItem });
      this.newItem = { title: '', url: '' };
    }
  }
  triggerFileInput(): void {
    const fileInput = document.getElementById('headerFileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
  onNavImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const filePath = `assets/images/${file.name}`;
      this.navImageUrl = filePath;
    }
  }
  saveData() {
    this.pagesService.getPage(this.pageId).subscribe(pageData => {
      const updatedComponents = pageData.components.map((component: PageComponent) => {
        if (component.name === 'navbar') {
          return { ...component, navbarItems: this.navbarItems, navImageUrl: this.navImageUrl };
        }
        return component;
      });

      this.http.put(`http://localhost:5000/pages/${this.pageId}`, {
        ...pageData,
        components: updatedComponents
      }).subscribe(() => {
        this.toastr.success('Navbar data saved successfully!', 'Success', {
          positionClass: 'toast-top-right',
          closeButton: true
        });
      });
    });
  }

  loadData() {
    this.pagesService.getPage(this.pageId).subscribe(data => {
      const navbarComponent = data.components.find((component: PageComponent) => component.name === 'navbar');

      if (navbarComponent && navbarComponent.navbarItems) {
        this.navbarItems = navbarComponent.navbarItems;
      }
      if (navbarComponent && navbarComponent.navImageUrl) {
        this.navImageUrl = navbarComponent.navImageUrl;
      }
    });
  }
}