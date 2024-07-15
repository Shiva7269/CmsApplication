import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';

@Component({
  selector: 'app-listofproduct2',
  templateUrl: './listofproduct2.component.html',
  styleUrls: ['./listofproduct2.component.css']
})
export class Listofproduct2Component implements OnInit {
  products$!: Observable<Product[]>;
  view: 'grid' | 'list' = 'grid'; // Default view
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 0;
  paginatedProducts: Product[] = [];
  pages: number[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
    this.products$.subscribe(products => {
      this.totalPages = Math.ceil(products.length / this.itemsPerPage);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.updatePaginatedProducts();
    });
  }

  setView(view: 'grid' | 'list') {
    this.view = view;
  }

  setPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedProducts();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedProducts();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedProducts();
    }
  }

  updatePaginatedProducts() {
    this.products$.subscribe(products => {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedProducts = products.slice(startIndex, endIndex);
    });
  }

  sortProducts(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const criteria = selectElement.value;

    this.products$.subscribe(products => {
      switch(criteria) {
        case 'relevance':
          // Sort by relevance logic
          products.sort((a, b) => a.id - b.id); // Replace with actual relevance logic
          break;
        case 'top-rated':
          // Sort by top-rated logic
          // Placeholder logic, adjust as needed
          products.sort((a, b) => a.id - b.id); // Replace with actual top-rated logic
          break;
        case 'name-asc':
          // Sort by name ascending logic
          products.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          // Sort by name descending logic
          products.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'price-low':
          // Sort by price lower logic
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          // Sort by price higher logic
          products.sort((a, b) => b.price - a.price);
          break;
        default:
          // Default sort logic
          products.sort((a, b) => a.id - b.id);
      }
      this.updatePaginatedProducts();
    });
  }

  addToCart(product: Product) {
    console.log(`Added to cart: ${product.name}`);
    // Implement actual add to cart functionality here
  }

  goToProductDetail(productId: number) {
    this.router.navigate(['/product2', productId]);
  }
}
