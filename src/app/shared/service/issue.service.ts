import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {IssueListData} from '../data/issue-list-data';
import {IssueItemData} from '../data/issue-item-data';

@Injectable()
export class IssueService {

  constructor(
      private httpClient: HttpClient,
  ) { }

    public getIssues(state: string): Observable<IssueListData> {
        const url = environment.apiUrl + 'issues/' + state;

        return this.httpClient.get<IssueListData>(url);
    }

    public getIssue(repo: string, user: string, number: number): Observable<IssueItemData> {
        const url = `${environment.apiUrl}issues/${repo}/${user}/${number}`;

        return this.httpClient.get<IssueItemData>(url);
    }
}
