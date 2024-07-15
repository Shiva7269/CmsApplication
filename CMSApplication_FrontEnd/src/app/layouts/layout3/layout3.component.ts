import { Component, OnDestroy, OnInit } from '@angular/core';
import { componentMap } from '../../component_map/component-map';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'app-layout3',
  templateUrl: './layout3.component.html',
  styleUrl: './layout3.component.css'
})
export class Layout3Component  implements OnInit{
  pageUrl!: any;
  pageData: any;
  componentMap = componentMap;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private pagesService: PagesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pageUrl = params.get('pageUrl');
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
}
