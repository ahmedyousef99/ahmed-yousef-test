import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  userKey: string;
  tokenKey: string;
  constructor(private router: Router, private toastr: ToastrService) {
    this.userKey = `user-data`;
  }
  isPublic(): boolean {
    return this.getUser;
  }

  setUser(data: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(data));
  }
  get getUser(): any {
    return JSON.parse(localStorage.getItem(this.userKey));
  }
  getUserRole(): string {
    return this.getUser && this.getUser.role;
  }

  isSiteengineerRole(): boolean {
    return this.getUserRole() == `siteengineer`;
  }

  isForemen(): boolean {
    return this.getUserRole() == `foremen`;
  }

  getUsername(): string {
    return this.getUser && `${this.getUser.username}`;
  }
  getPermissions(): string[] {
    return this.getUser && this.getUser.permissions;
  }
  isPermissions(permission: string): boolean {
    return this.getPermissions().includes(permission);
  }
  logOut(): void {
    this.toastr.error(`${this.getUsername()} is Logged out `, `Logged out`);

    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.tokenKey);
    this.router.navigate([`public/login`]);
  }
}
