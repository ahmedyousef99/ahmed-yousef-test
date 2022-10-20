import { Details } from './../models/details.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DetailsServiceService {
  constructor() {}

  setOrdersInLocal(data: Details[], id: number): void {
    localStorage.setItem(`details${id}`, JSON.stringify(data));
  }
  getOrdersFromLocal(id: number): Details[] {
    return JSON.parse(localStorage.getItem(`details${id}`));
  }
}
