import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { ComplStatusComponent } from './components/compl-status/compl-status.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { ManageUsersComponent } from './components/admin/manage-users/manage-users.component';
import { ManageComplaintsComponent } from './components/admin/manage-complaints/manage-complaints.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LoginSignupComponent,
    ComplStatusComponent,
    ProfileComponent,
    HomeComponent,
    ManageUsersComponent,
    ManageComplaintsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
