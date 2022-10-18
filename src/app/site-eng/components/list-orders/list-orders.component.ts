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

  constructor(private ordersService: OrderService) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    var sub = this.ordersService.getOrders().subscribe(
      (res: Order[]) => {
        console.log(res, `from getallorders`);
        this.listOfOrders = res;
        console.log(this.listOfOrders);
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
}
