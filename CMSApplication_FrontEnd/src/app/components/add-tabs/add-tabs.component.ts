import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PagesService } from '../../services/pages.service';
import { ToastrService } from 'ngx-toastr';

interface TabContent {
  id: string;
  title: string;
  content: string;
}

interface PageComponent {
  name: string;
  tabs?: TabContent[];
}

@Component({
  selector: 'app-add-tabs',
  templateUrl: './add-tabs.component.html',
  styleUrls: ['./add-tabs.component.css']
})
export class AddTabsComponent implements OnInit {
  pageId: any;
  tabContents: TabContent[] = [];
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

  addTab() {
    const newTab: TabContent = {
      id: `tab${this.tabContents.length + 1}`,
      title: `Tab ${this.tabContents.length + 1}`,
      content: `This is some placeholder content for Tab ${this.tabContents.length + 1}.`
    };
    this.tabContents.push(newTab);
  }

  saveData() {
    this.pagesService.getPage(this.pageId).subscribe(pageData => {
      const updatedComponents = pageData.components.map((component: PageComponent) => {
        if (component.name === 'tabs') {
          return { ...component, tabs: this.tabContents };
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
      const tabsComponent = data.components.find((component: PageComponent) => component.name === 'tabs');

      if (tabsComponent && tabsComponent.tabs) {
        this.tabContents = tabsComponent.tabs;
      }
    });
  }
}

