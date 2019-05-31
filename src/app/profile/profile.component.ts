import { Component, OnInit } from '@angular/core';
import {User} from '../User';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../AuthenticationService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }

}
