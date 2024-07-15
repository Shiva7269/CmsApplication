import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PagesService } from "../../services/pages.service";
import { Router } from "@angular/router";
import { Component, Inject, OnInit } from "@angular/core";

@Component({
  selector: 'app-page-creation-popup',
  templateUrl: './page-creation-popup.component.html',
  styleUrls: ['./page-creation-popup.component.css']
})
export class PageCreationPopupComponent implements OnInit {
  createForm!: FormGroup;
  layout!: string;
  components:any;
  // Define default components
  defaultLayout1Components = [
    { name: 'navbar', data: {} },
    { name: 'carousel', data: {} },
    { name: 'accordion', data: {} },
    { name: 'tabs', data: {} },
    { name: 'banner', data: {} },
    { name: 'footer', data: {} },
  ];
  defaultLayout2Components = [
    { name: 'header', data: {} },
    { name: 'carousel', data: {} },
    { name: 'accordion', data: {} },
    { name: 'tabs', data: {} },
    { name: 'banner', data: {} },
    { name: 'footer', data: {} },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<PageCreationPopupComponent>,
    private pageService: PagesService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.layout = this.data.layout;
    this.createForm = this.formBuilder.group({
      pageName: ['', Validators.required],
      pageUrl: ['', Validators.required],
      pageLayout: [this.layout, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.createForm.invalid) {
      return;
    }

    // Include default components
    if(this.layout==='layout1'){
      this.components = [...this.defaultLayout1Components];
    }
    else
    {
      this.components = [...this.defaultLayout2Components];
    }

    const pageData = {
      pageName: this.createForm.value.pageName,
      pageUrl: this.createForm.value.pageUrl,
      pageLayout: this.layout,
     // components: this.components
    };

    // Send data to the MongoDB server via the PagesService
    this.pageService.createPage(pageData).subscribe(
      response => {
        console.log('Page created successfully:', response);
        this.dialogRef.close();
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Error creating page:', error);
      }
    );
  }
}
