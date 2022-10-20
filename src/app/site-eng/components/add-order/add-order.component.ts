import { DropDownLocation } from './../../../shared/models/drop-down-location.model';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private toastr: ToastrService,
    private builder: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) {
    this.initializeFormGroup();
  }

  ngOnInit(): void {}

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

  ngOnDestroy(): void {
    if (this.subscription.length > 0) {
      this.subscription.forEach((e) => e.unsubscribe());
    }
  }
}
