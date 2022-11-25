import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../_model/user.model';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  // userDetails: User[] = [];

  userDetails: MatTableDataSource<any>

  displayedColumns: string[] = ['FirstName', 'LastName', 'EmailId', 'MobileNo',
    'Address', 'City', 'State', 'Role'];


  @ViewChild('paginator') paginator: MatPaginator


  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (response: any) => {
        console.log(response);
        // this.userDetails = response
        this.userDetails = new MatTableDataSource(response);
        this.userDetails.paginator = this.paginator;
      }, (error: HttpErrorResponse) => { console.log(error) }
    )
  }

}
