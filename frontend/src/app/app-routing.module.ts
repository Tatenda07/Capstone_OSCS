import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { ComplStatusComponent } from './components/compl-status/compl-status.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginSignupComponent },
  { path: 'about', component: AboutComponent },
  { path: 'compl-status', component: ComplStatusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
