import { FirebaseAuthState } from 'angularfire2';
import { AuthService } from './../../providers/auth/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { UserService } from './../../providers/user/user.service';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;

  constructor(
    public authService: AuthService,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userService: UserService) {

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit(): void {
    let userForm = this.signupForm.value

    this.authService.createAuthUser({
      email: userForm.email,
      password: userForm.password
    })
    .then((authState: FirebaseAuthState) => {
      delete userForm.password
      userForm.uid = authState.auth.uid
      
      this.userService.create(userForm)
        .then(()=> console.log('Usuário cadastrado!'))
        .catch(err => console.log(err, 'Erro ao Cadastrar Usuaário.'))
    
  })

  } 

}
