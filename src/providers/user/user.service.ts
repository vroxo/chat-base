import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AngularFireModule } from 'angularfire2';

import 'rxjs/add/operator/map';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {

  constructor(
    public af: AngularFireModule,
    public http: Http) {
    console.log('Hello UserProvider Provider');
  }

  create(user: any){
    
  }

}
