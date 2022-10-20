import { Header } from './../../../shared/models/header.model';
import { Details } from './../../../shared/models/details.model';
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
import { DetailsServiceService } from 'src/app/shared/services/details-service.service';

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
  showInputProgress: boolean = false;
  detailsOrders: Details[] = [];

  constructor(
    private detailsService: DetailsServiceService,
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
    /////////////authorization on buttons
    if (this.account.isSiteengineerRole()) {
      this.canAdd = true;
    } else {
      this.canAdd = false;
    }

    ////////// get the id form URL
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
  //////// to get location from backend
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
  ////////// to get the value from select
  getSelect(event: any): void {
    this.locationId = event.target.value;
  }

  onClickBackToHome(): void {
    this.router.navigate([`orders/orders-list`]);
  }
  //////////to submit new work item to table from form
  onClickaddOrder(): void {
    let selectedLocation: DropDownLocation = this.listOfLocations.find(
      (e) => e.id == this.locationId
    );
    this.form.get(`location`).setValue(selectedLocation);
    console.log(this.form.value);
    this.detailsService.getOrdersFromLocal(this.idOfOrder);
    this.detailsOrders.push(this.form.value);
    this.detailsService.setOrdersInLocal(this.detailsOrders, this.idOfOrder);
  }
  /////delete work item
  deleteItem(i: number) {
    this.detailsService.getOrdersFromLocal(this.idOfOrder);
    this.detailsOrders.splice(i, 1);
    this.detailsService.setOrdersInLocal(this.detailsOrders, this.idOfOrder);
  }
  ////////to add new work item and open the form
  onClickAdd() {
    this.showAddBtn = true;
  }

  ngOnDestroy(): void {
    if (this.subscription.length > 0) {
      this.subscription.forEach((e) => e.unsubscribe());
    }
  }
  displayData(): void {
    this.detailsService.setOrdersInLocal(this.detailsOrders, this.idOfOrder);
    this.detailsOrders = this.detailsService.getOrdersFromLocal(this.idOfOrder);
  }
}
