import { CategoriesServiceProvider } from "../../providers/categories-service/categories-service";
import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";

@Component({
  selector: "page-category",
  templateUrl: "category.html"
})
export class CategoryPage {
  form: any = { name: null };

  categories: any;

  idAlt: Number = null;

  editable: boolean = false;

  constructor(
    public navCtrl: NavController,
    public service: CategoriesServiceProvider,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.index();
  }

  index() {
    this.service
      .index()
      .then((res: any) => {
        this.categories = res.data;
      })
      .catch(err => {
        this.categories = [];
        this.error(err);
      });
  }

  save() {
    if (this.form.name !== null) {
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
        this.form.name = res.data.name;
        this.editable = true;
      })
      .catch(err => {
        this.editable = false;
        this.error(err);
      });
  }

  update() {
    if (this.form.name !== null && this.idAlt !== null) {
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
    this.form.name = null;
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
