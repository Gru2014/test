import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  private subscription?: Subscription;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.fetchAllMessages();
    this.subscription = this.messageService.getMessages().subscribe({
      next: messages => (this.messages = messages),
      error: error => console.error('Error in subscription:', error)
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
