import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { DetailsComponent } from './components/details/details.component';
import { ListOrdersComponent } from './components/list-orders/list-orders.component';

const routes: Routes = [
  {
    path: ``,
    pathMatch: `full`,
    redirectTo: `orders-list`,
  },
  {
    path: `orders-list`,
    component: ListOrdersComponent,
  },
  {
    path: `orders-list/add-order`,
    component: AddOrderComponent,
  },
  {
    path: `orders-list/details`,
    component: DetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiteEngRoutingModule {}
