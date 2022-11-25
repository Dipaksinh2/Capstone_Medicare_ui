import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { element } from 'protractor';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from '../image-processing.service';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productDetails: Product[];

  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router) { }

  totalLength: any
  page: number = 1;
  ProductName = '';
  sortByParam = 'Select to sort'
  sortDirection='asc';
  ProductBrand=''

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAllProducts()
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImage(product)))
      )
      .subscribe(
        (resp: Product[]) => {
          console.log(resp);
          this.productDetails = resp;
          this.totalLength = resp.length;
        },
        (error: HttpErrorResponse) => { console.log(error) }
      );
  }

  showProduct(productId) {
    this.router.navigate(['/productView', { productId: productId }]);
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }


  setDirection() {    
    if(this.sortDirection==='desc'){
      this.sortDirection='asc'
    }else{
      this.sortDirection='desc'
    }
  }
}
