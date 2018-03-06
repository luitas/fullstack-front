import {Component, OnDestroy, OnInit} from '@angular/core';
import {IssueService} from '../../shared/service/issue.service';
import {MessageService} from '../../shared/service/message.service';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Params} from '@angular/router';
import {IssueItemData} from '../../shared/data/issue-item-data';
import { Location } from '@angular/common';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent implements OnInit, OnDestroy {

    subscription: Subscription;

    issueItem: IssueItemData;

    constructor(
        private issueService: IssueService,
        private messageService: MessageService,
        private activatedRoute: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe((params: Params) => {
            const repo = params['repo'];
            const user = params['user'];
            const number = params['number'];
            this.loadIssue(repo, user, number);
        });
    }

    loadIssue(repo: string, user: string, number: number) {
        this.issueService.getIssue(repo, user, number).subscribe(
            resp => this.issueItem = resp,
            error => this.messageService.add('Error ' + error.message)
        );
    }

    goBack(): void {
        this.location.back();
    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }}
