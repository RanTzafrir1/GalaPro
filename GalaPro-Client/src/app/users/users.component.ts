import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/services/data.service';
import { IUser } from '../shared/interfaces/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: IUser[];
  counter: number = 1;
  displayedColumns: string[] = ['First Name', 'Last Name', 'Slider Value', 'Edit'];

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    (this.dataService.dataLoaded) ? 
      (this.users = this.dataService.getAllUsersFromLocalStorage()) :
        this.dataService.getUsersData().subscribe(users => {
          this.users = users;
        }
      );
  }

  routeToPage(id) {
    this.router.navigate(['./user', id]);
  }

  SyncData() {
    this.dataService.setUsersData(this.dataService.getAllUsersFromLocalStorage()).subscribe(user => {
      console.log(user);
    });
  }
}
