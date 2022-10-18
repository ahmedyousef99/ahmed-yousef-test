import { Order } from './../../../shared/models/orders.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss'],
})
export class ListOrdersComponent implements OnInit, OnDestroy {
  listOfOrders: Order[] = [];
  subscription: Subscription[] = [];
  form: FormGroup;
  showMsg: boolean;
  constructor(private ordersService: OrderService) {}

  ngOnInit(): void {
    this.getAllOrders();
    this.showMsg = this.ordersService.showMsg;
    setTimeout(() => {
      this.showMsg = false;
    }, 2000);
  }

  getAllOrders(): void {
    var sub = this.ordersService.getOrders().subscribe(
      (res: Order[]) => {
        localStorage.setItem('orders', JSON.stringify(res));
        this.listOfOrders = JSON.parse(localStorage.getItem(`orders`));
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
