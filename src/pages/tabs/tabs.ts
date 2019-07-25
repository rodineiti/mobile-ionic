import { Component } from '@angular/core';

import { BillpayPage } from './../billpay/billpay';
import { CategoryPage } from '../category/category';
import { BillreceivePage } from '../billreceive/billreceive';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CategoryPage;
  tab3Root = BillreceivePage;
  tab4Root = BillpayPage;

  constructor() {

  }
}
