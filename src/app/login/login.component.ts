import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private snack: MatSnackBar
  ) { }


  ngOnInit(): void { }

  login(loginForm: NgForm) {
    if (loginForm.valid) {
      this.userService.login(loginForm.value).subscribe(
        (response: any) => {
          console.log(response)
          this.userAuthService.setRoles(response.user.role);
          this.userAuthService.setToken(response.jwtToken);

          const role = response.user.role[0].roleName;
          const userName=response.user.userFirstName+response.user.userLastName

          console.log(userName);
          
          if (role === 'Admin') {
            this.router.navigate(['/admin'],userName);
          } else {
            this.router.navigate(['/user'],userName);
          }
        },
        (error) => {
          this.snack.open("Please Enter Valid E-mail Id and Password", "Close", { duration: 5000 })
        }
      );
    } else {
      this.snack.open("Please Enter E-mail Id and Password to Login", "Close", { duration: 5000 })
    }
  }
}
