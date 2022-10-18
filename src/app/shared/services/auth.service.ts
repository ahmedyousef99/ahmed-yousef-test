import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  adminPermissions: string[] = [`admin`, 'admin.product'];
  usersPermissions: string[] = [`user`, `user.products`, `user.cart`];
  role: string = `user`;

  constructor() {}

  login(email: string, password: string): Observable<any> {
    let data = {
      id: 1,
      name: {
        firstName: `ahmed`,
        lastName: `Yousef`,
      },
      email: email,
      role: this.role,
      permissions: this.usersPermissions,
      token: `Assffe434sfd`,
    };
    return of(data);
  }
}
