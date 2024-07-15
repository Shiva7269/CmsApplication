import { ActivatedRoute, Router } from '@angular/router';
import { PagesService } from '../services/pages.service';
import { componentMap } from '../component_map/component-map';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { Layout1Component } from '../layouts/layout1/layout1.component'; // Import your layout components
import { Layout2Component } from '../layouts/layout2/layout2.component'; // Import other layout components as needed
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer!: ViewContainerRef;
  components: any[] = [];
  pageId: any;
  private componentMap = componentMap;
  pageUrl: any;
  footerAdded: boolean | undefined;
  pageName!: string;
  layout!: string;
  layoutComponentRef!: ComponentRef<any>;
  isDragging: boolean = false;
  draggedComponent: string | null = null;

  constructor(
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.url.subscribe(urlSegments => {
      const pageUrl = urlSegments.map(segment => segment.path).join('/');
      this.pagesService.getPageIdByUrl(pageUrl).subscribe(pageId => {
        if (pageId) {
          this.pageId = pageId;
          this.pagesService.getPage(pageId).subscribe(page => {
            this.layout = page.layout;
            this.components = page.components || [];
            this.ensureComponentIds();
            this.loadLayout();
          });
        }
      });
    });
  }

  ensureComponentIds() {
    this.components = this.components.map(component => {
      if (!component.id) {
        component.id = uuidv4();
      }
      return component;
    });
    this.onSubmit();
  }

  loadLayout() {
    // Define mapping for different layout types to corresponding component types
    const layoutMapping: { [key: string]: any } = {
      'layout1': Layout1Component,
      'layout2': Layout2Component,
    };

    // Retrieve the component type based on the current layout
    const componentType = layoutMapping[this.layout];
    if (componentType) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
      this.dynamicComponentContainer.clear(); // Clear any existing components
      this.layoutComponentRef = this.dynamicComponentContainer.createComponent(componentFactory);
      this.layoutComponentRef.instance.pageData = { components: this.components }; // Pass data to the layout component
    } else {
      console.error(`Layout '${this.layout}' not supported.`);
    }
  }

  addComponent(componentName: string, index?: number, addToComponentsArray = true, componentData?: any, componentId?: string) {
    const componentInfo = this.componentMap[componentName];
    if (!componentInfo) return;

    // Ensure header and footer are only added once
    if ((componentName === 'header' || componentName === 'footer' || componentName === 'navbar') && this.components.some(component => component.name === componentName)) {
      return;
    }

    const componentType = componentInfo.type;

    if (componentType) {
      const newComponentId = componentId || uuidv4();
      const componentInstance = { id: newComponentId, name: componentName, data: componentData };

      if (addToComponentsArray) {
        this.components.push(componentInstance);
      }

      // Update the layout with the new component data
      if (this.layoutComponentRef) {
        this.layoutComponentRef.instance.pageData.components = [...this.components];
      }
    }
  }

  dragStart(componentType: string) {
    this.draggedComponent = componentType;
    this.isDragging = true;
  }

  onDropSidebar(event: CdkDragDrop<any>) {
    if (this.draggedComponent) {
      this.addComponent(this.draggedComponent);
      this.draggedComponent = null;
      this.isDragging = false;
    }
  }

  onDropLayout(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      // Rearrange components within the same container
      moveItemInArray(this.components, event.previousIndex, event.currentIndex);
    } else {
      // Move component from sidebar to layout
      const componentName = event.previousContainer.data[event.previousIndex];
      this.addComponent(componentName);
    }
  }

  previewPage() {
    this.pagesService.getPage(this.pageId).subscribe(
      (page) => {
        if (page && page.components && page.components.length > 0) {
          if (page.layout && page.pageUrl) {
            this.router.navigate([page.layout, page.pageUrl]);
          } else {
            alert('Error: Page layout or URL is not defined.');
          }
        } else {
          alert('Error: Page does not contain components.');
        }
      },
      (error) => {
        alert('Error fetching page data.');
      }
    );
  }

  onSubmit() {
    const headerIndex = this.components.findIndex(component => component.name === 'header');
    const sortedComponents = [...this.components];
    if (headerIndex !== -1) {
      const [header] = sortedComponents.splice(headerIndex, 1);
      sortedComponents.unshift(header);
    }
    this.components = sortedComponents;

    const footerIndex = this.components.findIndex(component => component.name === 'footer');
    if (footerIndex !== -1 && footerIndex !== sortedComponents.length - 1) {
      const [footer] = sortedComponents.splice(footerIndex, 1);
      sortedComponents.push(footer);
    }

    const url = `http://localhost:5000/pages/${this.pageId}`;

    const body = {
      pageName: this.pageName,
      pageUrl: this.pageUrl,
      components: sortedComponents
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
