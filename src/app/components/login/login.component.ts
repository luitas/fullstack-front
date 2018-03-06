import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthService} from '../../shared/service/auth.service';
import {environment} from '../../../environments/environment';
import {MessageService} from '../../shared/service/message.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    loading = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private messageService: MessageService,
        private router: Router
    ) { }

    ngOnInit() {
      this.subscription = this.activatedRoute.queryParamMap.subscribe((queryParams: ParamMap) => {
          const code: string = queryParams.get('code');
          if (code) {
              this.loading = true;
              this.authService.createToken(code).subscribe(
                  response => {
                      this.authService.logIn(response);
                      this.loading = false;
                  },
                  error => {
                      this.messageService.add('Error: ' + error.message);
                      this.loading = false;
                  }
              );
          }
      });
    }


    getLoginUrl(): string {
        const backUrl = environment.fromLoginUrl;

        return `${environment.githubLogin}?client_id=${environment.clientId}&redirect_uri=${encodeURI(backUrl)}`;
    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }

}
