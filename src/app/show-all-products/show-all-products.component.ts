import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from '../image-processing.service';
import { ShowProductImagesDialogueComponent } from '../show-product-images-dialogue/show-product-images-dialogue.component';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-show-all-products',
  templateUrl: './show-all-products.component.html',
  styleUrls: ['./show-all-products.component.css']
})
export class ShowAllProductsComponent implements OnInit {

  // productDetails: Product[] = [];
  productDetails:MatTableDataSource<any>;

  displayedColumns: string[] = ['Id', 'MedicineName', 'Description',
    'DiscountedPrice', 'ActualPrice','Manufacturer','Category','Brand', 'Operations'];

    @ViewChild('paginator')paginator:MatPaginator

  constructor(private productService: ProductService,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router) { }


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
          this.productDetails = new MatTableDataSource(resp);
          this.productDetails.paginator=this.paginator
        },
        (error: HttpErrorResponse) => { console.log(error) }

      );
  }

  public deleteProduct(productId: any) {
    this.productService.deleteProduct(productId).subscribe(
      (resp) => { this.getAllProducts() },
      (error: HttpErrorResponse) => { console.log(error) }
    );
  }

  showImages(product: Product) {
    console.log(product)
    this.imagesDialog.open(ShowProductImagesDialogueComponent, {
      data: {
        images: product.productImages
      },
      height: '500px',
      width: '800px'
    })
  }

  editProduct(productId) {    
    this.router.navigate(['/addNewProduct', { productId: productId }])
  }
}
