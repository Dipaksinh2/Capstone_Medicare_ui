import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../_model/user.model';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router,
    private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  registerUser(registerForm) {
    if (registerForm.valid) {
      this.userService.registerUser(registerForm.value).subscribe(
        (response) => {
          console.log(response);
          this.snack.open("Registration Successfully Completed", "Close", { duration: 5000 })
          this.router.navigate(['/login'])
        },
        (error) => {
          this.snack.open("Don't worry try again", "Close", { duration: 5000 })
        }
      )
    } else {
      this.snack.open("Please fill all details!", "Close", { duration: 5000 })
    }
  }
}
