import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { TabsPage } from "../tabs/tabs";
import { SignupPage } from "../signup/signup";
import constants from "../../constants";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  form: any = {
    email: null,
    password: null
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthServiceProvider,
    private alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  login() {
    let data = {
      grant_type: "password",
      client_id: 2,
      client_secret: constants.client_secret,
      username: this.form.email,
      password: this.form.password,
      scope: ""
    };

    this.auth
      .login(data)
      .then((result: any) => {
        localStorage.setItem("currentUser", JSON.stringify(result));
        this.navCtrl.push(TabsPage);
      })
      .catch((err: any) => {
        let alert;
        if (err.status === 400 || err.status === 401) {
          alert = this.alertCtrl.create({
            title: "OPSSSS",
            subTitle: "Dados inválidos, favor, informar os dados de acesso",
            buttons: ["Fechar"]
          });
        }

        if (err.status === 422) {
          alert = this.alertCtrl.create({
            title: "OPSSSS",
            subTitle: "Falha de validação, verifique os campos digitados",
            buttons: ["Fechar"]
          });
        }

        if (err.status === 404 || err.status === 500) {
          alert = this.alertCtrl.create({
            title: "OPSSSS",
            subTitle:
              "Impossível se conectar ao servidor, verifique sua conexão ou tente novamente em alguns minutos",
            buttons: ["Fechar"]
          });
        }
        alert.present();
      });
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }
}
