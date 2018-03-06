import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { IssuesComponent } from './components/issues/issues.component';
import {CredentialsInterceptorProvider} from './interceptors/credentials.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { IssueDetailComponent } from './components/issue-detail/issue-detail.component';
import { MessageComponent } from './components/message/message.component';
import { MessageService } from './shared/service/message.service';
import {AuthService} from './shared/service/auth.service';
import {HttpClientModule} from '@angular/common/http';
import { IssueService } from './shared/service/issue.service';
import {TimeAgoPipe} from 'time-ago-pipe';
import { AuthGuardService } from './shared/security/auth-guard.service';

const HTTP_INTERCEPTORS_PROVIDER = [
  CredentialsInterceptorProvider
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IssuesComponent,
    IssueDetailComponent,
    MessageComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ...HTTP_INTERCEPTORS_PROVIDER,
    MessageService,
    AuthService,
    IssueService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
