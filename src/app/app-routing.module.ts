import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {IssuesComponent} from './components/issues/issues.component';
import {IssueDetailComponent} from './components/issue-detail/issue-detail.component';
import {AuthGuardService} from './shared/security/auth-guard.service';

const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'issues', component: IssuesComponent, canActivate: [AuthGuardService]},
    {path: 'issue-detail/:repo/:user/:number', component: IssueDetailComponent , canActivate: [AuthGuardService]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
