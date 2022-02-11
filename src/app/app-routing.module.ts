import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { ProtectedPageComponent } from './components/protected-page/protected-page.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'protected', component: ProtectedPageComponent, canActivate:[AuthGuard], data:{'roles':["user"]}},
  {path: 'admin', component: AdminPageComponent, canActivate:[AuthGuard], data:{'roles':["admin", "user"]}},
  {path: '**', pathMatch: 'full', redirectTo:'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
