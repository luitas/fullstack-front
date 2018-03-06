import { Injectable } from '@angular/core';
import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpHandler, HttpHeaders,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {AuthService} from '../shared/service/auth.service';


@Injectable()
export class CredentialsInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService
    ) {}


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
          }),
        };

        if (this.authService.isAuth()) {
            httpOptions.headers = httpOptions.headers.set('Authorization', this.authService.getAccessToken() );
        }

        const modifiedRequest: HttpRequest<any> = request.clone(httpOptions);
        return next.handle(modifiedRequest);
    }

}

export const CredentialsInterceptorProvider = {
  provide: HTTP_INTERCEPTORS, // import InjectionToken!
  useClass: CredentialsInterceptor,
  multi: true,
};
