import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PagesService } from '../../services/pages.service';
import { ToastrService } from 'ngx-toastr';

interface PageComponent {
  name: string;
  items?: any[]; // Assuming items can be of any type, adjust this as per your data structure
}

interface AccordionItem {
  title: string;
  content: string;
}

@Component({
  selector: 'app-add-accordion',
  templateUrl: './add-accordion.component.html',
  styleUrls: ['./add-accordion.component.css']
})
export class AddAccordionComponent implements OnInit {
  pageId: any;
  accordionItems: AccordionItem[] = [];
  @Input() editMode: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
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
    const newItem: AccordionItem = {
      title: `Accordion Item #${this.accordionItems.length + 1}`,
      content: `This is the ${this.accordionItems.length + 1} item's accordion body.`
    };
    this.accordionItems.push(newItem);
  }

  saveData() {
    this.pagesService.getPage(this.pageId).subscribe(pageData => {
      const updatedComponents = pageData.components.map((component: PageComponent) => {
        if (component.name === 'accordion') {
          return { ...component, items: this.accordionItems };
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

  loadData() {
    this.pagesService.getPage(this.pageId).subscribe(data => {
      const accordionComponent  = data.components.find((component: PageComponent) => component.name === 'accordion' );

      if (accordionComponent && accordionComponent.items) {
        this.accordionItems = accordionComponent.items;
      }
    });
  }
}

