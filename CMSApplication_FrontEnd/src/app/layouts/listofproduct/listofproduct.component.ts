import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-listofproduct',
  templateUrl: './listofproduct.component.html',
  styleUrls: ['./listofproduct.component.css']
})
export class ListofproductComponent implements OnInit {
  products: Product[] = [];
  view: 'grid' | 'list' = 'grid'; // Default view
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 0;
  paginatedProducts: Product[] = [];
  pages: number[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
        this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.updatePaginatedProducts();
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
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
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  sortProducts(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const criteria = selectElement.value;

    switch(criteria) {
      case 'relevance':
        // Sort by relevance logic
        this.products.sort((a, b) => a.id - b.id); // Replace with actual relevance logic
        break;
      case 'top-rated':
        // Sort by top-rated logic
        // Placeholder logic, adjust as needed
        this.products.sort((a, b) => a.id - b.id); // Replace with actual top-rated logic
        break;
      case 'name-asc':
        // Sort by name ascending logic
        this.products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        // Sort by name descending logic
        this.products.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-low':
        // Sort by price lower logic
        this.products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        // Sort by price higher logic
        this.products.sort((a, b) => b.price - a.price);
        break;
      default:
        // Default sort logic
        this.products.sort((a, b) => a.id - b.id);
    }
    this.updatePaginatedProducts();
  }

  addToCart(product: Product) {
    console.log(`Added to cart: ${product.name}`);
    // Implement actual add to cart functionality here
  }

  goToProductDetail(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}
