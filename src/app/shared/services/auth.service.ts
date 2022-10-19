import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
export interface Login {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usersPermissions: string[] = [];
  role: string = ``;

  constructor(private toastr: ToastrService) {}

  login(data: Login): Observable<any> {
    if (data.username == `siteengineer`) {
      this.role = `siteengineer`;
      this.usersPermissions = [`siteengineer`];
    } else if (data.username == `foremen`) {
      this.role = `foremen`;
      this.usersPermissions = [`siteengineer`];
    } else {
      this.toastr.error(`${data.username} is Not registered`);
    }
    let dataOfUser = {
      id: 1,
      name: data.username,
      email: `aaa@hotmail.com`,
      role: this.role,
      permissions: this.usersPermissions,
      token: `Assffe434sfd`,
    };
    return of(dataOfUser);
  }
}
