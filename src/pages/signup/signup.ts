import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  form: any = {
    name: null,
    email: null,
    password: null,
    password_confirmation: null
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {
    //this.navCtrl.push(TabsPage);
    this.auth.register(this.form)
      .then((result: any) => {
        alert(result.message);
        this.login();
      });
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

}
