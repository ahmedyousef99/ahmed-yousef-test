import { Order } from './../../../shared/models/orders.model';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  idOfOrder: number;
  subscription: Subscription;
  currentOrder: Order;
  canAdd: boolean;

  constructor(
    private orderService: OrderService,
    private account: AccountService,
    private activeRout: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.account.isSiteengineerRole()) {
      this.canAdd = true;
    } else {
      this.canAdd = false;
    }
    if (this.activeRout.snapshot.paramMap.has(`id`)) {
      this.idOfOrder = +this.activeRout.snapshot.paramMap.get(`id`);
    }

    this.subscription = this.activeRout.params.subscribe((params: Params) => {
      this.idOfOrder = params[`id`];
      this.orderService.getOrderById(this.idOfOrder).subscribe((res) => {
        this.currentOrder = res;
        console.log(this.currentOrder);
      });
      console.log(this.currentOrder);
      console.log(this.idOfOrder);
    });
  }
  getOrder(id: number) {
    this.orderService.getOrderById(id).subscribe((res) => {
      this.currentOrder = res;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  onClickBackToHome(): void {
    this.router.navigate([`orders/orders-list`]);
  }
}
