import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { LoginPage } from "../login/login";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  form: any = {
    name: null,
    email: null,
    password: null,
    password_confirmation: null
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthServiceProvider,
    private alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SignupPage");
  }

  signup() {
    this.auth
      .register(this.form)
      .then((result: any) => {
        let alert = this.alertCtrl.create({
          title: "SUCESSO",
          subTitle: result.message,
          buttons: ["Fechar"]
        });
        alert.present();
        this.login();
      })
      .catch(err => {
        this.error(err);
      });
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  error(error: any) {
    let alert;
    if (error.status === 400 || error.status === 401) {
      alert = this.alertCtrl.create({
        title: "OPSSSS",
        subTitle: "Dados inválidos, favor, informar os dados de acesso",
        buttons: ["Fechar"]
      });
    }

    if (error.status === 422) {
      alert = this.alertCtrl.create({
        title: "OPSSSS",
        subTitle: "Falha de validação, verifique os campos digitados",
        buttons: ["Fechar"]
      });
    }

    if (error.status === 404 || error.status === 500) {
      alert = this.alertCtrl.create({
        title: "OPSSSS",
        subTitle:
          "Impossível se conectar ao servidor, verifique sua conexão ou tente novamente em alguns minutos",
        buttons: ["Fechar"]
      });
    }
    alert.present();
  }
}
