import { Component, Input, OnInit } from '@angular/core';
import { PagesService } from '../../services/pages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { componentMap } from '../../component_map/component-map';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-layout1',
  templateUrl: './layout1.component.html',
  styleUrls: ['./layout1.component.css']
})
export class Layout1Component implements OnInit {
  pageUrl!: any;
  // pageData: any;
  componentMap = componentMap;
  editMode!:boolean;
  @Input() pageData: any;
pageName:any;
  constructor(
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private http: HttpClient,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pageUrl = params.get('pageUrl');
   
      if (this.router.url.includes('template')) {
        this.editMode = true;
      }
      else{
        this.editMode = false;
      }
      this.getPageData();

    });
    // this.pageUrl = "demo";
    // this.getPageData();
  }

  getPageData(): void {
    if (this.pageUrl) {
      this.pagesService.getPageComponents(this.pageUrl).subscribe(
        (data) => {
          this.pagesService.getPage(data).subscribe(
            (page) => {
              if (page && page.pageUrl) {
               // console.log('Page is', page);
                this.pageData = page;
                // console.log('Page Data:', this.pageData);
                // console.log('Page components:', this.pageData.components);
                this.pageData.components.forEach((component: any) => {
                  if (component.name === 'accordion' && this.componentMap[component.name]) {
                    // Check if the accordion component should be editable
                    component.readonly = !this.componentMap[component.name].editable;
                  }
                });
              } else {
                console.error('Page not found');
              }
            },
            (error) => {
              console.error('Error fetching page:', error);
            }
          );
        },
        (error) => {
          console.error('Error fetching page components:', error);
        }
      );
    } else {
      console.error('Page URL is not defined.');
    }
  }

  removeComponent(componentName: string): void {
    this.pageData.components = this.pageData.components.filter(
      (component: any) => component.name !== componentName
    );
    const url = `http://localhost:5000/pages/${this.pageData._id}`;

    const body = {
      pageName: this.pageData.pageName,
      pageUrl: this.pageUrl,
      components: this.pageData.components
    };

    this.http.put(url, body).subscribe(
      (response) => {
       console.log('Page updated successfully:', response);
      },
      (error) => {
        console.error('Error updating page:', error);
      }
    );
  }
}
