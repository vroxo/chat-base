import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable,  } from 'angularfire2';

import { BaseService } from '../base.service';

import { User } from './../../models/user';

@Injectable()
export class UserService extends BaseService{

  users: FirebaseListObservable<User[]>

  constructor(public af: AngularFire) {
    
    super()
    this.users = this.af.database.list('/users');

  }
  
  create(user: User): firebase.Promise<void>{
    return this.af.database.object(`/users/${user.uid}`)
      .set(user)
      .catch(this.handlePromiseError)
  }

}
