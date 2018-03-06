import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../shared/service/message.service';
import {IssueService} from '../../shared/service/issue.service';
import {IssueListData} from '../../shared/data/issue-list-data';
import {IssueData} from '../../shared/data/issue-data';
import {Router} from '@angular/router';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

    closedIssues: IssueListData;
    openIssues: IssueListData;

    selectedIssues: IssueListData;
    closeIssues: IssueListData;

    constructor(
        private issueService: IssueService,
        private messageService: MessageService,
        private router: Router
    ) { }

    ngOnInit() {

        this.issueService.getIssues('open').subscribe(
            resp => {
                this.openIssues = resp;
                this.selectedIssues = this.openIssues;
            },
            error => this.messageService.add('Error ' + error.message)
        );

        this.issueService.getIssues('closed').subscribe(
            resp => this.closedIssues = resp,
            error => this.messageService.add('Error ' + error.message)
        );
    }

    selectIssuesState(issue: IssueListData) {
        this.selectedIssues = issue;
    }

    selectIssue(issue: IssueData) {
        const repo = issue.repository_url.split('/').pop();

        this.router.navigate(['/issue-detail', repo, issue.user.login, issue.number]);
    }
}
