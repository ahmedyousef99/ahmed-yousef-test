import { DropDownLocation } from './../models/drop-down-location.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from '../models/orders.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  listOfOrders: Order[];

  constructor() {
    this.listOfOrders = [
      {
        id: Math.floor((1 + Math.random()) * 0x10000),
        descrription: `this the first order`,
        loaction: {
          id: Math.floor((1 + Math.random()) * 0x10000),
          name: `Nabuls`,
        },
        progress: 0,
        creationDate: new Date(),
        operationDescription: `First Order`,
        startDate: new Date(),
        endDate: new Date(),
      },
      {
        id: Math.floor((1 + Math.random()) * 0x10000),
        descrription: `this is the second order`,
        loaction: {
          id: Math.floor((1 + Math.random()) * 0x10000),
          name: `Gaza`,
        },
        progress: 0,
        creationDate: new Date(),
        operationDescription: `in the order make sure of the buildings`,
        startDate: new Date(),
        endDate: new Date(),
      },
    ];
  }

  getOrders(): Observable<any> {
    return of(this.listOfOrders);
  }
  addOrder(order: any): void {
    let newOrder: Order = {
      id: Math.floor((1 + Math.random()) * 0x10000),
      descrription: order.descrription3,
      loaction: {
        id: order.location.id,
        name: order.location.name,
      },
      progress: order.progress,
      creationDate: new Date(),
      operationDescription: order.operationDescription,
      startDate: order.startDate,
      endDate: order.endDate,
    };
    console.log(newOrder);
    this.listOfOrders.push(newOrder);
    this.getOrders();
    console.log(newOrder);
    console.log(this.listOfOrders.length);
  }
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
}
