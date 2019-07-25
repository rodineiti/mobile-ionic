import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  form: any = {
    email: null,
    password: null
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let data = {
      grant_type: 'password',
      client_id: 2,
      client_secret: 'juJiyg84xcNJJrWhCz76YiXj6xw3OPGXLH08ZLty',
      username: this.form.email,
      password: this.form.password,
      scope: ''
    };

    this.auth.login(data)
      .then((result: any) => {
        localStorage.setItem('currentUser', JSON.stringify(result));
        this.navCtrl.push(TabsPage);
      });
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

}
