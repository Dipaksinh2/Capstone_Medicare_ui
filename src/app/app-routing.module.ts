import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { AdminComponent } from './admin/admin.component';
import { BuyProductResolverService } from './buy-product-resolver.service';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductResolverService } from './product-resolver.service';
import { ProductviewComponent } from './productview/productview.component';
import { RegisterComponent } from './register/register.component';
import { ShowAllProductsComponent } from './show-all-products/show-all-products.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'product', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  {
    path: 'addNewProduct', component: AddNewProductComponent, canActivate: [AuthGuard],
    data: { roles: ['Admin'] }, resolve: { product: ProductResolverService }
  },
  {
    path: 'showAllProducts', component: ShowAllProductsComponent,
    canActivate: [AuthGuard], data: { roles: ['Admin'] }
  },
  { path: 'productView', component: ProductviewComponent, resolve: { product: ProductResolverService } },
  {
    path: 'buyProduct', component: BuyProductComponent, canActivate: [AuthGuard], data: { roles: ['User'] },
    resolve: { productDetails: BuyProductResolverService }
  },
  {
    path: 'register', component: RegisterComponent, pathMatch: 'full'
  },
  {
    path: 'userlist', component: UserListComponent,
    canActivate: [AuthGuard], data: { roles: ['Admin'] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
