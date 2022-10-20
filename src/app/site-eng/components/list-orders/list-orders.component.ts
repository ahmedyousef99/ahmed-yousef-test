import { Header } from './../../../shared/models/header.model';
import { Order } from './../../../shared/models/orders.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss'],
})
export class ListOrdersComponent implements OnInit, OnDestroy {
  listOfOrders: Header[] = [];
  subscription: Subscription[] = [];
  form: FormGroup;
  showMsg: boolean;
  canAdd: boolean = false;

  constructor(
    private ordersService: OrderService,
    private account: AccountService
  ) {}

  ngOnInit(): void {
    this.getAllOrders();

    if (this.account.isSiteengineerRole()) {
      this.canAdd = true;
    } else {
      this.canAdd = false;
    }
  }

  getAllOrders(): void {
    var sub = this.ordersService.getOrders().subscribe(
      (res: Header[]) => {
        this.listOfOrders = res;
      },
      (error) => {
        console.log(error, `from getallorders`);
      }
    );
    this.subscription.push(sub);
  }
  ngOnDestroy(): void {
    if (this.subscription.length > 0) {
      this.subscription.forEach((e) => e.unsubscribe());
    }
  }
  onDelete(index: number) {
    console.log(index);
    this.ordersService.getDelete(index);
    this.getAllOrders();
  }
}
