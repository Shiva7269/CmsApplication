import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../../services/pages.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @Input() editMode: boolean = true;
  bannerImageUrl: string = '';
  pageId: any;

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
          this.loadBannerImage();
        }
      });
    });
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('bannerFileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onBannerSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const filePath = `assets/images/${file.name}`;
      this.bannerImageUrl = filePath;
    }
  }

  saveBannerImage(): void {
    this.pagesService.getPage(this.pageId).subscribe(pageData => {
      const updatedComponents = pageData.components.map((component: any) => {
        if (component.name === 'banner') {
          return { ...component, imageUrl: this.bannerImageUrl };
        }
        return component;
      });

      this.http.put(`http://localhost:5000/pages/${this.pageId}`, {
        ...pageData,
        components: updatedComponents
      }).subscribe(() => {
        // alert('Banner image saved successfully!');
        this.toastr.success('Banner image saved successfully!', 'Success', {
          positionClass: 'toast-top-right',
          closeButton: true
        });
      });
    });
  }

  loadBannerImage(): void {
    this.pagesService.getPage(this.pageId).subscribe(data => {
      const bannerComponent = data.components.find((component: any) => component.name === 'banner');
      if (bannerComponent && bannerComponent.imageUrl) {
        this.bannerImageUrl = bannerComponent.imageUrl;
      }
    });
  }
}
