import { UserService } from './../../providers/user/user.service';
import { User } from './../../models/user';
import { FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SignupPage } from './../signup/signup';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: FirebaseListObservable<User[]>

  constructor(
    public navCtrl: NavController,
    public userService: UserService
    ) {

  }

  ionViewDidLoad(){
    this.users = this.userService.users;
  }

  onChatCreate(user: User){
    console.log(user);
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage)
  }
}
