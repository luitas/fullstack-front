import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../shared/service/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
    ngOnInit(): void {
    }

    constructor(public messageService: MessageService) {}

}
