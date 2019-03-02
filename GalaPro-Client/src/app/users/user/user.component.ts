import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { IUser } from 'src/app/shared/interfaces/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: IUser;
  sliderValue: number;
  id: any;

  constructor(
    private dataService: DataService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params.id;
    this.user = this.dataService.getUserFromLocalStorageById(this.id);
    this.sliderValue = this.user.sliderValue;
  }

  Submit() {
    this.dataService.setUserToLocalStorage(this.sliderValue, this.id);
  }

}
