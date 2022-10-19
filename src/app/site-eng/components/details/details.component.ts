import { Header } from './../../../shared/models/header.model';
import { Details } from './../../../shared/models/details.model';
import { Order } from './../../../shared/models/orders.model';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { AccountService } from 'src/app/shared/services/account.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DropDownLocation } from 'src/app/shared/models/drop-down-location.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  showAddBtn: Boolean = false;
  listOfLocations: DropDownLocation[] = [];
  subscription: Subscription[] = [];
  form: FormGroup;
  locationId: number;
  idOfOrder: number;
  currentOrder: Header;
  canAdd: boolean;
  currentProgress: number;
  showInputProgress: boolean = false;
  detailsOrders: Details[] = [];
  constructor(
    private builder: FormBuilder,

    private orderService: OrderService,
    private account: AccountService,
    private activeRout: ActivatedRoute,
    private router: Router
  ) {
    this.initializeFormGroup();
  }

  initializeFormGroup(): void {
    this.form = this.builder.group({
      location: [``],
      description: [``, Validators.required],
      workItem: [``, Validators.required],
    });
  }
  ngOnInit(): void {
    console.log(this.listOfLocations);
    if (this.account.isSiteengineerRole()) {
      this.canAdd = true;
    } else {
      this.canAdd = false;
    }
    if (this.activeRout.snapshot.paramMap.has(`id`)) {
      this.idOfOrder = +this.activeRout.snapshot.paramMap.get(`id`);
    }

    var sub = this.activeRout.params.subscribe((params: Params) => {
      this.idOfOrder = params[`id`];
      this.orderService.getOrderById(this.idOfOrder).subscribe((res) => {
        this.currentOrder = res;
        console.log(this.currentOrder);
      });
      console.log(this.currentOrder);
      console.log(this.idOfOrder);
    });
    this.subscription.push(sub);
    this.getLocations();
  }
  getOrder(id: number) {
    this.orderService.getOrderById(id).subscribe((res) => {
      this.currentOrder = res;
    });
  }
  getLocations(): void {
    var sub = this.orderService.getLocations().subscribe(
      (res) => {
        console.log(res);
        this.listOfLocations = res;
      },
      (error) => {
        alert(error);
      }
    );
    this.subscription.push(sub);
  }

  getSelect(event: any): void {
    this.locationId = event.target.value;
  }

  ngOnDestroy(): void {
    if (this.subscription.length > 0) {
      this.subscription.forEach((e) => e.unsubscribe());
    }
  }
  onClickBackToHome(): void {
    this.router.navigate([`orders/orders-list`]);
  }
  onClickadd(): void {
    let selectedLocation: DropDownLocation = this.listOfLocations.find(
      (e) => e.id == this.locationId
    );
    this.form.get(`location`).setValue(selectedLocation);
    console.log(this.form.value);
    this.detailsOrders.push(this.form.value);
  }
  deleteItem(i: number) {
    this.detailsOrders.splice(i, 1);
  }
  onClickAdd() {
    this.showAddBtn = true;
  }
}
