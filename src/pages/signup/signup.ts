import { Component } from '@angular/core';
import { FirebaseAuthState } from 'angularfire2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../providers/auth/auth.service';
import { AlertController, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';

import { UserService } from './../../providers/user/user.service';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
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
    let loading: Loading = this.showLoading();
    let userForm = this.signupForm.value

    this.authService.createAuthUser({
      email: userForm.email,
      password: userForm.password
    })
      .then((authState: FirebaseAuthState) => {
        delete userForm.password
        userForm.uid = authState.auth.uid

        this.userService.create(userForm)
          .then(() => {
            console.log('Usuário cadastrado!')
            loading.dismiss();
          })
          .catch((error: any) => {
            console.log(error);
            loading.dismiss();
            this.showAlert(error);
          })

      }).catch((error: any) => {
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
      })

  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present();
    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

}
