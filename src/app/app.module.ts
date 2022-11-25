import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { DragDirective } from './drag.directive';
import { ShowAllProductsComponent } from './show-all-products/show-all-products.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ShowProductImagesDialogueComponent } from './show-product-images-dialogue/show-product-images-dialogue.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { ProductviewComponent } from './productview/productview.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import {MatSliderModule} from '@angular/material/slider';
import { RegisterComponent } from './register/register.component';
import { MatSelectModule } from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import { FooterComponent } from './footer/footer.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UserListComponent } from './user-list/user-list.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchPipe } from './search.pipe';
import { SortPipe } from './sort.pipe';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    AddNewProductComponent,
    DragDirective,
    ShowAllProductsComponent,
    ShowProductImagesDialogueComponent,
    ProductviewComponent,
    BuyProductComponent,
    RegisterComponent,
    FooterComponent,
    MainPageComponent,
    UserListComponent,
    SearchPipe,
    SortPipe,   
  ],
  
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatSliderModule,
    MatSelectModule,
    MatExpansionModule,
    MatBadgeModule,
    MatChipsModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule    
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
