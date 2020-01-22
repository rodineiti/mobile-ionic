import { CategoriesServiceProvider } from "./../../providers/categories-service/categories-service";
import { BillpaysProvider } from "./../../providers/billpays/billpays";
import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";

@Component({
  selector: "page-billpay",
  templateUrl: "billpay.html"
})
export class BillpayPage {
  form: any = {
    category_id: null,
    date_launch: null,
    name: null,
    value: null,
    status: "1"
  };

  bill_pays: any;
  categories: any;

  idAlt: Number = null;

  editable: boolean = false;

  constructor(
    public navCtrl: NavController,
    public service: BillpaysProvider,
    public category: CategoriesServiceProvider,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.getCategories();
    this.index();
  }

  getCategories() {
    this.category
      .index()
      .then((res: any) => {
        this.categories = res.data;
      })
      .catch(err => {
        this.categories = [];
        this.error(err);
      });
  }

  index() {
    this.service
      .index()
      .then((res: any) => {
        this.bill_pays = res.data;
      })
      .catch(err => {
        this.bill_pays = [];
        this.error(err);
      });
  }

  save() {
    if (
      this.form.category_id !== null &&
      this.form.date_launch !== null &&
      this.form.name !== null &&
      this.form.value !== null
    ) {
      this.service
        .store(this.form)
        .then(res => {
          this.reset();
          this.editable = false;
          this.index();
        })
        .catch(err => {
          this.error(err);
        });
    }
  }

  edit(id: Number) {
    this.service
      .show(id)
      .then((res: any) => {
        this.idAlt = res.data.id;
        this.form.category_id = res.data.category_id;
        this.form.date_launch = res.data.date_launch;
        this.form.name = res.data.name;
        this.form.value = res.data.value;
        this.form.status = res.data.status ? "1" : "0";
        this.editable = true;
      })
      .catch(err => {
        this.error(err);
        this.editable = false;
      });
  }

  update() {
    if (
      this.form.category_id !== null &&
      this.form.date_launch !== null &&
      this.form.name !== null &&
      this.form.value !== null &&
      this.idAlt !== null
    ) {
      this.service
        .update(this.form, this.idAlt)
        .then(res => {
          this.reset();
          this.editable = false;
          this.index();
        })
        .catch(err => {
          this.error(err);
        });
    }
  }

  del(id: Number) {
    this.service
      .destroy(id)
      .then(res => {
        this.reset();
        this.editable = false;
        this.index();
      })
      .catch(err => {
        this.error(err);
      });
  }

  reset() {
    this.form = {
      category_id: null,
      date_launch: null,
      name: null,
      value: null,
      status: "1"
    };
    this.idAlt = null;
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

  presentConfirm(id: any) {
    let alert = this.alertCtrl.create({
      title: "Deletar",
      message: "Confirmar a exclusão do item?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Confirmar",
          handler: () => {
            this.del(id);
          }
        }
      ]
    });
    alert.present();
  }
}
