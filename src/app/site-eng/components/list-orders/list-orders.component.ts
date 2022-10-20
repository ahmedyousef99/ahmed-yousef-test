import { Header } from './../../../shared/models/header.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';
import { AccountService } from 'src/app/shared/services/account.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService,
    private ordersService: OrderService,
    private account: AccountService
  ) {}

  ngOnInit(): void {
    this.getAllOrders();

    /////////////authorization on buttons
    if (this.account.isSiteengineerRole()) {
      this.canAdd = true;
    } else {
      this.canAdd = false;
    }

    //////// to avoid null in localStorage in the firts use
    if (`orders` in localStorage) {
      this.listOfOrders = this.ordersService.getOrdersFromLocal();
    } else {
      this.ordersService.setOrdersInLocal(this.listOfOrders);
      this.listOfOrders = this.ordersService.getOrdersFromLocal();
    }
  }

  //////// to get all orders from backend
  getAllOrders(): void {
    var sub = this.ordersService.getOrders().subscribe(
      (res: Header[]) => {
        this.listOfOrders = res;
      },
      (error) => {}
    );
    this.subscription.push(sub);
  }
  ngOnDestroy(): void {
    if (this.subscription.length > 0) {
      this.subscription.forEach((e) => e.unsubscribe());
    }
  }

  //////Delete orders from header
  onDelete(index: number) {
    this.ordersService.getDelete(index);
    this.getAllOrders();
    this.toastr.show(
      `${this.listOfOrders[index].operationDescription} was deleted successfully`,
      `Delete items`
    );
  }
  onEditOrder(i: number) {}
}
