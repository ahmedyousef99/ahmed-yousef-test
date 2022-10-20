import { Header } from './../../../shared/models/header.model';
import { Details } from './../../../shared/models/details.model';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { AccountService } from 'src/app/shared/services/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropDownLocation } from 'src/app/shared/models/drop-down-location.model';
import { DetailsServiceService } from 'src/app/shared/services/details-service.service';
import { ToastrService } from 'ngx-toastr';

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
  detailsOrders: Details[] = [] as Details[];

  constructor(
    private detailsService: DetailsServiceService,
    private builder: FormBuilder,
    private orderService: OrderService,
    private account: AccountService,
    private activeRout: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.initializeFormGroup();
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
    /////////to get the current order by id
    var sub = this.orderService
      .getOrderById(this.idOfOrder)
      .subscribe((res) => {
        localStorage.setItem(`current-order`, JSON.stringify(res));
        this.currentOrder = JSON.parse(localStorage.getItem(`current-order`));
      });

    this.subscription.push(sub);
    this.getLocations();

    ////////for the first time add workitems the localstorage will be null so will check before////
    if (`details${this.idOfOrder}` in localStorage) {
      this.detailsOrders = this.detailsService.getOrdersFromLocal(
        this.idOfOrder
      );
    } else {
      this.detailsService.setOrdersInLocal(this.detailsOrders, this.idOfOrder);
      this.detailsOrders = this.detailsService.getOrdersFromLocal(
        this.idOfOrder
      );
    }
    ////////for the first time add workitems the localstorage will be null so will check before////
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

    this.detailsOrders = this.detailsService.getOrdersFromLocal(this.idOfOrder);
    this.detailsOrders.push(this.form.value);
    this.detailsService.setOrdersInLocal(this.detailsOrders, this.idOfOrder);
    this.toastr.info(
      `Work Items with name:${this.form.value.workItem} was added successfully`,
      `Added items on details`
    );
    this.form.reset();
    // this.form.value({
    //   location: ``,
    //   description: ``,
    //   workItem: ``,
    // });
  }
  /////delete work item
  deleteItem(i: number) {
    this.detailsOrders = this.detailsService.getOrdersFromLocal(this.idOfOrder);
    this.toastr.show(
      `${this.detailsOrders[i].workItem} was deleted successfully`,
      `Delete items`
    );
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

  /////////storage the progress to localstorage then diplay it in header
  saveProgress(): void {
    let x = this.orderService.getOrdersFromLocal();
    x.forEach((e) =>
      e.id == this.idOfOrder ? (e.progress = this.currentOrder.progress) : null
    );
    this.orderService.setOrdersInLocal(x);
    this.showInputProgress = false;
  }

  /////////// to initializeFormGroup the Form
  initializeFormGroup(): void {
    this.form = this.builder.group({
      location: [``],
      description: [``, Validators.required],
      workItem: [``, Validators.required],
    });
  }
}
