import { Component } from '@angular/core';
import { PagesService } from '../../services/pages.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  formData = {
    name: '',
    email: ''
  };
  componentName!: string;

  constructor(private http: HttpClient) {}

  generateComponent() {
    if (this.componentName) {
      const payload = { componentName: this.componentName };
      this.http.post('http://localhost:5000/generate-component', payload).subscribe(
        response => console.log('Component generated successfully', response),
        error => console.error('Error generating component', error)
      );
    } else {
      alert('Component name is required');
    }
  }
  dynamicStyles: { [key: string]: string } = {};

  updateStyles(styles: { property: string, value: string }[]) {
    styles.forEach(style => {
      this.dynamicStyles[style.property] = style.value;
    });
  }
  applyStyles(stylesInput: string) {
    const stylesArray = stylesInput.split('\n').map(style => {
      const [property, value] = style.split(':').map(part => part.trim());
      return { property, value };
    });
    this.updateStyles(stylesArray);
  }
  submitForm() {
    // You can handle form submission logic here
    // console.log('Form submitted!', this.formData);
    // Reset form data after submission
    this.formData = { name: '', email: '' };
  }
  
}