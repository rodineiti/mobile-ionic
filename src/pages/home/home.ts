import { WelcomePage } from './../welcome/welcome';
import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Highcharts  } from 'angular-highcharts'; 
import { ReportProvider } from '../../providers/report/report';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  categories: any;
  
  form: any = {
    dateStart: null,
    dateEnd: null
  };

  isResults: boolean = false;

  constructor(public navCtrl: NavController, public app: App, public auth: AuthServiceProvider, public service: ReportProvider) {

  }

  submit() {
    if (this.form.dateStart !== null && this.form.dateEnd !== null){
      this.service.sumChartsByPeriod(this.form)
          .then((res:any) => {
            this.categories = res.data;
            this.getChart(this.categories);
            this.isResults = true;
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }

  logout(){
    this.auth.logout();
    setTimeout(() => this.back(), 3000);
  }

  back(){
    this.navCtrl.setRoot(WelcomePage);
  }

  getChart(dados: any){
    // Build the chart
    Highcharts.chart('container', <any> {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
      title: {
          text: 'Gráfico por período'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.y:.2f}</b>'
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: false
              },
              showInLegend: true
          }
      },
      series: [{
          name: 'Brands',
          colorByPoint: true,
          data: dados
      }]
    });
  }

}
