import { Header } from './../models/header.model';
import { DropDownLocation } from './../models/drop-down-location.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from '../models/orders.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  showMsg: boolean = false;
  // listOfOrders: Order[];
  listOfOrders: Header[] = [
    {
      id: 1,

      progress: 0,
      creationDate: new Date(),
      operationDescription: `First Order`,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      id: 2,

      progress: 0,
      creationDate: new Date(),
      operationDescription: `in the order make sure of the buildings`,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      id: 3,

      progress: 0,
      creationDate: new Date(),
      operationDescription: `in the order make sure of the buildings`,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      id: 4,

      progress: 0,
      creationDate: new Date(),
      operationDescription: `in the order make sure of the buildings`,
      startDate: new Date(),
      endDate: new Date(),
    },
  ];

  constructor() {}

  /////get all orders
  getOrders(): Observable<Header[]> {
    return of(this.listOfOrders);
  }

  /////add a new order
  addOrder(order: Header): void {
    let newOrder: Header = {
      id: Math.floor((1 + Math.random()) * 0x10000),

      progress: order.progress,
      creationDate: new Date(),
      operationDescription: order.operationDescription,
      startDate: order.startDate,
      endDate: order.endDate,
    };
    console.log(newOrder);
    this.listOfOrders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(this.listOfOrders));

    this.getOrders();
    this.showMsg = true;
  }

  //////to get loactions from api
  getLocations(): Observable<DropDownLocation[]> {
    let locations: DropDownLocation[] = [
      {
        id: 1,
        name: `Gaza`,
      },
      {
        id: 2,
        name: `Alnasser`,
      },
      {
        id: 3,
        name: `Nablus`,
      },
    ];
    return of(locations);
  }

  ////get order by id
  getOrderById(id: number): Observable<Header> {
    let orderById: Header = this.listOfOrders.find((e) => {
      return e.id == id;
    });

    return of(orderById);
  }
  getDelete(i: number) {
    this.listOfOrders.splice(i, 1);
  }
}
