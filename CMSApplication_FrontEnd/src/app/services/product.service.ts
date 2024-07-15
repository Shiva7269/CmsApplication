import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

  @Injectable({
    providedIn: 'root'
  })
  export class ProductService {
     products: Product[] = [
    ];

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>('http://localhost:5000/products');
    }
    // getProducts(): Product[] {
    //   return this.products;
    // }

    // getProductById(id: number): Product | undefined {
    //   return this.products.find(product => product.id === id);
    // }

  getProductById(id: number): Observable<Product> {
    const url = `http://localhost:5000/products/${id}`;
    return this.http.get<Product>(url);
  }
  }
