import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { ComplStatusComponent } from './components/compl-status/compl-status.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LoginSignupComponent,
    ComplStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
