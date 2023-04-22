import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-nav-list',
  templateUrl: './user-nav-list.component.html',
  styleUrls: ['./user-nav-list.component.scss'],

})
export class UserNavListComponent {

  constructor(
    public user: UserService
  ){}

  onLogout() {
    this.user.logout();
  }

}
