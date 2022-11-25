import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OrderDetails } from '../_model/order-details.model';
import { Product } from '../_model/product.model';
import { User } from '../_model/user.model';
import { ProductService } from '../_services/product.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {

  productDetails: Product[] = []
  userDetails: User[] = []

  orderDetails: OrderDetails = {
    userFullName: '',
    userFullAddress: '',
    userContactNumber: '',
    userAlternateContactNumber: '',
    orderProductQties: []
  }

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private snack:MatSnackBar,
    private router:Router) { }

  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.userDetails = this.activatedRoute.snapshot.data['userDetails']

    this.productDetails.forEach(
      x => this.orderDetails.orderProductQties.push(
        { productId: x.productId, productQty: 1 }
      )
    );

    this.userService.getAllUsers().subscribe((response) => {
      this.userDetails = response;
      console.log(response, 'user Data')
    });
  }

  public placeOrder(orderForm: NgForm) {
    if (orderForm.valid) {
      this.productService.placeOrder(this.orderDetails).subscribe(
        (response) => {
          orderForm.reset();
          this.router.navigate(["/"]),
          this.snack.open("Order has been Successfully Placed","Close",{duration:3000})
          
        }, (err) => {
          this.snack.open("Order has not been Placed","Close",{duration:3000})
        }
      );
    } else {
      this.snack.open("Please fill the form to place the order","Close",{duration:3000})
    }
  }

  getQtyForProduct(productId) {
    const newProduct = this.orderDetails.orderProductQties.filter(
      (productQty) => productQty.productId === productId
    )
    return newProduct[0].productQty;
  }

  getTotal(productId, productDiscountedPrice) {
    const newProduct: any = this.orderDetails.orderProductQties.filter(
      (productQty) => productQty.productId === productId
    )

    return newProduct[0].productQty * productDiscountedPrice;
  }

  onQtyChanged(qty, productId) {
    this.orderDetails.orderProductQties.filter(
      (productOrder) => productOrder.productId === productId
    )[0].productQty = qty;
  }

}
