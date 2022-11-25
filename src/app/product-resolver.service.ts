import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from './image-processing.service';
import { Product } from './_model/product.model';
import { ProductService } from './_services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product>{

  constructor(private productService: ProductService,
    private imageProccessingService: ImageProcessingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const productId = route.paramMap.get("productId");

    if (productId) {
      //fetch data 
      return this.productService.getProductDetailsById(productId)
        .pipe(
          map(p => this.imageProccessingService.createImage(p))
        );
    } else {
      //return data
      return of(this.getProductDetails());
    }
  }

  getProductDetails() {
    return {
      productId: null,
      productName: "",
      productDesc: "",
      productActualPrice: 0,
      productDiscountedPrice: 0,
      productImages: [],
      productManufacturer: "",
      productCategory: "",
      productBrand: ""

    }
  }
}
