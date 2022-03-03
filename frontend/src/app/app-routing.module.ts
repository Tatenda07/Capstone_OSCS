import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { ComplStatusComponent } from './components/compl-status/compl-status.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { ManageUsersComponent } from './components/admin/manage-users/manage-users.component';
import { ManageComplaintsComponent } from './components/admin/manage-complaints/manage-complaints.component';
import { FaqComponent } from './components/faq/faq.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginSignupComponent },
  { path: 'about', component: AboutComponent },
  { path: 'compl-status', component: ComplStatusComponent},
  { path: 'home', component: HomeComponent},
  { path: 'manage-users', component: ManageUsersComponent},
  { path: 'manage-complaints', component: ManageComplaintsComponent},
  { path: 'faq', component: FaqComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
