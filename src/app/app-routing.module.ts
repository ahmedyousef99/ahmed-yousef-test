import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainGuard } from './shared/gurads/main.guard';

const routes: Routes = [
  {
    path: ``,
    loadChildren: () =>
      import(`./public/public.module`).then((m) => m.PublicModule),
  },
  {
    path: `orders`,
    loadChildren: () =>
      import(`./site-eng/site-eng.module`).then((m) => m.SiteEngModule),
    // canActivate: [MainGuard],
    // data: { permission: `user.products` , role: `` },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
