import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PagesService } from '../../services/pages.service';

interface PageComponent {
  name: string;
  content?: string;
}

@Component({
  selector: 'app-texteditor',
  templateUrl: './texteditor.component.html',
  styleUrls: ['./texteditor.component.css']
})
export class TexteditorComponent implements OnInit {
  @Input() editMode: boolean = true;
  pageId: any;
  storefrontContent: string = '';
  

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private pagesService: PagesService
  ) {}

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

  saveData() {
    this.http.get<any>(`http://localhost:5000/pages/${this.pageId}`).subscribe(pageData => {
      const updatedComponents = pageData.components.map((component: PageComponent) => {
        if (component.name === 'texteditor') {
          return { ...component, content: this.storefrontContent };
        }
        return component;
      });

      this.http.put(`http://localhost:5000/pages/${this.pageId}`, {
        ...pageData,
        components: updatedComponents
      }).subscribe(() => {
        alert('Data saved successfully!');
      }, error => {
        console.error('Error saving data:', error);
      });
    });
  }

  loadData() {
    this.http.get<any>(`http://localhost:5000/pages/${this.pageId}`).subscribe(data => {
      const textEditorComponent = data.components.find((component: PageComponent) => component.name === 'texteditor');

      if (textEditorComponent && textEditorComponent.content) {
        this.storefrontContent = textEditorComponent.content;
      }
    }, error => {
      console.error('Error loading data:', error);
    });
  }
}