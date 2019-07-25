import { CategoriesServiceProvider } from '../../providers/categories-service/categories-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {

  form: any = { name: null };

  categories: any;

  idAlt: Number = null;

  editable: boolean = false;

  constructor(public navCtrl: NavController, public service: CategoriesServiceProvider) {

  }

  ngOnInit() {
    this.index();
  }

  index() {
    this.service.index()
      .then((res: any) => {
        this.categories = res.data;
      });
  }

  save() {
    if (this.form.name !== null) {
      this.service.store(this.form)
        .then((res) => {
          this.reset();
          this.editable = false;
          this.index();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  edit(id: Number) {
    this.service.show(id)
      .then((res: any) => {
        this.idAlt = res.data.id;
        this.form.name = res.data.name;
        this.editable = true;
      })
      .catch((err) => {
        console.log(err);
        this.editable = false;
      });
  }

  update() {
    if (this.form.name !== null && this.idAlt !== null) {
      this.service.update(this.form, this.idAlt)
        .then((res) => {
          this.reset();
          this.editable = false;
          this.index();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  del(id: Number) {
    this.service.destroy(id)
      .then((res) => {
        this.reset();
        this.editable = false;
        this.index();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  reset() {
    this.form.name = null;
    this.idAlt = null
  }

}
