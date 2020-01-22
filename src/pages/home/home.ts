import { Component } from "@angular/core";
import { NavController, App, AlertController } from "ionic-angular";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { Highcharts } from "angular-highcharts";
import { ReportProvider } from "../../providers/report/report";
import { LoginPage } from "../login/login";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  categoriesPay: any;
  categoriesReceive: any;

  form: any = {
    dateStart: null,
    dateEnd: null
  };

  isResults: boolean = false;

  constructor(
    public navCtrl: NavController,
    public app: App,
    public auth: AuthServiceProvider,
    public service: ReportProvider,
    private alertCtrl: AlertController
  ) {}

  submit() {
    if (this.form.dateStart !== null && this.form.dateEnd !== null) {
      this.service
        .sumChartsByPeriod(this.form)
        .then((res: any) => {
          const { categoriesPay, categoriesReceive } = res.data;
          this.categoriesPay = categoriesPay;
          this.categoriesReceive = categoriesReceive;
          this.getChart("categoriesPay", "Pagos", this.categoriesPay);
          this.getChart(
            "categoriesReceive",
            "Recebidos",
            this.categoriesReceive
          );
          this.isResults = true;
        })
        .catch(err => {
          this.error(err);
        });
    }
  }

  logout() {
    this.auth.logout();
    setTimeout(() => this.back(), 3000);
  }

  back() {
    this.app.getRootNav().setRoot(LoginPage);
  }

  getChart(container: any, type: any, data: any) {
    // Build the chart
    Highcharts.chart(container, <any>{
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie"
      },
      title: {
        text: "Gráfico por período - " + type
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.y:.2f}</b>"
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [
        {
          name: "Brands",
          colorByPoint: true,
          data: data
        }
      ]
    });
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

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: "LOGOUT",
      message: "Deseja realmente sair?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Confirmar",
          handler: () => {
            this.logout();
          }
        }
      ]
    });
    alert.present();
  }
}
