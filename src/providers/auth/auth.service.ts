import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFireAuth, FirebaseAuthState } from 'angularfire2'


@Injectable()
export class AuthService {

  constructor(public auth: AngularFireAuth) {}

  createAuthUser(user:{email: string, password: string}): firebase.Promise<FirebaseAuthState>{
    return this.auth.createUser(user);
  }
}
