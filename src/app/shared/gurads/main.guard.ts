import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root',
})
export class MainGuard implements CanActivate {
  constructor(private account: AccountService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const arr = route.data[`role`].find(
      (e: any) => e == this.account.getUserRole()
    );
    if (this.account.getUserRole() == arr) {
      let permission: string = route.data['permission'];
      if (this.account.isPermissions(permission)) {
        return true;
      }
    }
    this.account.logOut();
    return false;
  }
}
