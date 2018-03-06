import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {TokenData} from '../data/token-data';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {MessageService} from './message.service';

@Injectable()
export class AuthService {

    private userToken: TokenData = null;

    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private messageService: MessageService
    ) {

        const json = localStorage.getItem(environment.tokenName);
        if (json) {
            this.userToken = JSON.parse(json);
        }
    }

    public isAuth(): boolean {
        return this.userToken !== null;
    }

    public getAccessToken() {
        return this.userToken.accessToken;
    }

    public logIn(tokenData: TokenData): void {
        this.userToken = tokenData;
        localStorage.setItem(environment.tokenName, JSON.stringify(tokenData));
        this.messageService.add('Login success');
        this.router.navigate(['/issues']);
    }

    public logOut(): void {
        this.userToken = null;
        localStorage.clear();
        this.router.navigate(['/login']);
    }

    public createToken(code: string): Observable<TokenData> {
        const url = environment.apiUrl + 'tokens';

        const httpOptions = {
            params: new HttpParams().set('code', code)
        };

        return this.httpClient.post<TokenData>(url, {'code' : code}, httpOptions);
    }

}
