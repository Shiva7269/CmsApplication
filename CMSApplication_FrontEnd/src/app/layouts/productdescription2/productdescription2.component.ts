import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-productdescription2',
  templateUrl: './productdescription2.component.html',
  styleUrls: ['./productdescription2.component.css']
})
export class Productdescription2Component implements OnInit {
  product$!: Observable<Product >; // Observable of Product or undefined
  quantity = 1;
  product: Product | undefined;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product$ = this.productService.getProductById(productId);
    this.product$.subscribe(product => {
      console.log(product);
      this.product = product; // Log the product received from the service
    });
  }
}
