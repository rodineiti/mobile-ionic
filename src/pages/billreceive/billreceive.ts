import { BillreceivesProvider } from '../../providers/billreceives/billreceives';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-billreceive',
  templateUrl: 'billreceive.html'
})
export class BillreceivePage {

  form: any = { date_launch: null, name: null, value: null };

  billreceives: any;

  idAlt: Number = null;

  editable: boolean = false;

  constructor(public navCtrl: NavController, public service: BillreceivesProvider) {

  }

  ngOnInit() {
    this.index();
  }

  index() {
    this.service.index()
      .then((res: any) => {
        this.billreceives = res.data;
      });
  }

  save() {
    if (this.form.date_launch !== null && this.form.name !== null && this.form.value !== null) {
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
    if (this.form.date_launch !== null && this.form.name !== null && this.form.value !== null && this.idAlt !== null) {
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
    this.form = { date_launch: null, name: null, value: null };
    this.idAlt = null
  }

}
