import { DropDownLocation } from './../../../shared/models/drop-down-location.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { Subscription } from 'rxjs';

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
    private builder: FormBuilder,
    private orderService: OrderService
  ) {
    this.initializeFormGroup();
  }

  ngOnInit(): void {
    this.getLocations();
  }

  initializeFormGroup(): void {
    this.form = this.builder.group({
      operationDescription: [``, Validators.required],
      startDate: [``, Validators.required],
      endDate: [``, Validators.required],
      location: [``],
      progress: [``, Validators.required],
      description: [``, Validators.required],
    });
  }
  getLocationById(): void {}
  onClickadd(): void {
    let selectedLocation: DropDownLocation = this.listOfLocations.find(
      (e) => e.id == this.locationId
    );
    this.form.get(`location`).setValue(selectedLocation);
    console.log(this.form.value);
    this.orderService.addOrder(this.form.value);
  }
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

  getSelect(event: any): void {
    this.locationId = event.target.value;
  }

  ngOnDestroy(): void {
    if (this.subscription.length > 0) {
      this.subscription.forEach((e) => e.unsubscribe());
    }
  }
}
