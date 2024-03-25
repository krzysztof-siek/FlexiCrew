import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {
    path: 'company',
    canActivate: [AuthGuard],
    loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)
  },
  {path: 'home', component: HomeComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
