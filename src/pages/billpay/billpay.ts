import { CategoriesServiceProvider } from './../../providers/categories-service/categories-service';
import { BillpaysProvider } from './../../providers/billpays/billpays';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-billpay',
  templateUrl: 'billpay.html'
})
export class BillpayPage {

  form: any = { category_id: null, date_launch: null, name: null, value: null };

  bill_pays: any;
  categories: any;

  idAlt: Number = null;

  editable: boolean = false;

  constructor(public navCtrl: NavController, public service: BillpaysProvider, public category: CategoriesServiceProvider) {

  }

  ngOnInit(){
    this.getCategories();
    this.index();
  }

  getCategories() {
    this.category.index()
        .then((res:any) => {
          console.log(res.data);
          this.categories = res.data;
        });
  }

  index() {
    this.service.index()
        .then((res:any) => {
          this.bill_pays = res.data;
        });
  }

  save() {
    if (this.form.category_id !== null && this.form.date_launch !== null && this.form.name !== null && this.form.value !== null){
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

  edit(id : Number) {
    this.service.show(id)
          .then((res:any) => {
            this.idAlt = res.data.id;
            this.form.category_id = res.data.category_id;
            this.form.date_launch = res.data.date_launch;
            this.form.name = res.data.name;
            this.form.value = res.data.value;
            this.editable = true;
          })
          .catch((err) => {
            console.log(err);
            this.editable = false;
          });
  }

  update() {
    if (this.form.category_id !== null && this.form.date_launch !== null && this.form.name !== null && this.form.value !== null && this.idAlt !== null){
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
  
  del(id : Number) {
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
    this.form = { category_id: null, date_launch: null, name: null, value: null };
    this.idAlt = null
  }

}
