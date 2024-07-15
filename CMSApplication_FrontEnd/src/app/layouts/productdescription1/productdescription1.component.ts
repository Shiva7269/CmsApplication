import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-productdescription1',
  templateUrl: './productdescription1.component.html',
  styleUrls: ['./productdescription1.component.css']
})
export class Productdescription1Component implements OnInit {
  product$!: Observable<Product | undefined>; // Observable of Product or undefined
  quantity = 1;
  product: Product | undefined; // Define product property

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product$ = this.productService.getProductById(productId);
    this.product$.subscribe(product => {
      console.log(product); // Log the product received from the service
      this.product = product; // Assign the product to your component property
    });
  }
}
