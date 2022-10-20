import { DropDownLocation } from './../../../shared/models/drop-down-location.model';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { pipe, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Header } from 'src/app/shared/models/header.model';

class CustomValidator {
  // Number only validation
  static numeric(control: AbstractControl) {
    let val = control.value;

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/))
      return { invalidNumber: true };

    return null;
  }
}
@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
})
export class AddOrderComponent implements OnInit, OnDestroy {
  listOfLocations: DropDownLocation[] = [];
  subscription: Subscription[] = [];
  form: FormGroup;
  locationId: number;
  idOfOrder: number;
  currentOrder: Header;
  showEditMsg: Boolean = false;

  constructor(
    private activeRout: ActivatedRoute,
    private toastr: ToastrService,
    private builder: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) {
    this.initializeFormGroup();
  }

  ngOnInit(): void {
    ////Building this components to Edit Order and Add Order in the same time so first will check
    // if the URL have an id to edit or not
    if (this.activeRout.snapshot.paramMap.has(`id`)) {
      this.idOfOrder = +this.activeRout.snapshot.paramMap.get(`id`);
      this.showEditMsg = true;
      this.getOrderById(this.idOfOrder);
      // console.log(this.currentOrder.startDate);
      // this.form.get(`startDate`).setValue(this.currentOrder.startDate);
      // console.log(this.form.get(`startDate`).value);
      this.form.patchValue(this.currentOrder);
    } else {
    }
  }

  initializeFormGroup(): void {
    this.form = this.builder.group({
      operationDescription: [``, Validators.required],
      startDate: [``, Validators.required],
      endDate: [``, Validators.required],
      progress: [``],
    });
  }

  onClickadd(): void {
    this.form.get(`progress`).setValue(0);
    this.orderService.addOrder(this.form.value);
    this.router.navigate([`/orders/orders-list`]);
    this.toastr.success(`The order has been added`, `Add Order`);
  }
  getOrderById(id: number): void {
    this.orderService.getOrderById(id).subscribe((res) => {
      this.currentOrder = res;
    });
  }

  onClickSaveEidt(): void {
    const newOrder: Header = this.form.value;
    this.orderService.EditOrder(this.idOfOrder, newOrder);
    this.router.navigate([`/orders/orders-list`]);
    this.toastr.info(` Wrok Order was edited successfully`, `Edit Orders`);
  }

  ngOnDestroy(): void {
    if (this.subscription.length > 0) {
      this.subscription.forEach((e) => e.unsubscribe());
    }
  }
}
