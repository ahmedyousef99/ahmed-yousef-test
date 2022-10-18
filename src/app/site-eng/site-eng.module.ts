import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteEngRoutingModule } from './site-eng-routing.module';
import { ListOrdersComponent } from './components/list-orders/list-orders.component';
import { SharedModule } from '../shared/shared.module';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { DetailsComponent } from './components/details/details.component';

@NgModule({
  declarations: [ListOrdersComponent, AddOrderComponent, DetailsComponent],
  imports: [
    CommonModule,
    SiteEngRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class SiteEngModule {}
