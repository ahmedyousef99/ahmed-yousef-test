import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/shared/services/account.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private account: AccountService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.formInitialize();
  }

  ngOnInit(): void {}

  formInitialize(): void {
    this.form = this.formBuilder.group({
      username: [``, Validators.required],
      password: [``, Validators.required],
    });
  }
  onClickLogin(): void {
    this.authService.login(this.form.value).subscribe((res) => {
      this.account.setUser(res);
      if (this.account.isSiteengineerRole()) {
        this.router.navigate([`orders`]);
        this.toastr.success(`${this.account.getUsername()} is logged in`);
      } else if (this.account.isForemen()) {
        this.toastr.success(`${this.account.getUsername()} is logged in`);

        this.router.navigate([`orders`]);
      }
      console.log(res);
    });
  }
}
