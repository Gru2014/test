import { Component, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Subject, Observable, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
class MessageService {
  private messageSubject: BehaviorSubject<Message[]> = new BehaviorSubject<
    Message[]
  >([]);
  public data$: Observable<Message[]> = this.messageSubject.asObservable();

  async all() {
    fetch('http://127.0.0.1:3000/messages')
      .then((res) => res.json())
      .then((data) => this.messageSubject.next(data))
      .catch((err) => console.error(err));
  }

  add(message: Message) {
    console.log(message);
    const currentMessages = this.messageSubject.value;
    this.messageSubject.next([...currentMessages, message]);
  }

  getData(): Observable<Message[]> {
    return this.data$;
  }
}

class Message {
  text: string;
  status: string;
  user: string;
  constructor(message: string, user: string, status: string) {
    this.text = message;
    this.status = status;
    this.user = user;
  }

  empty() {
    return this.text === '';
  }
}

@Component({
  selector: 'app-massage',
  standalone: true,
  template: `
    <div style="background-color: #fff;">
      <span class="bg-slate-400" class="block bg-slate-200 text-slate-500"
        >#{{ no }} - {{ message.user }} : {{ message.status }}</span
      >
      <div
        class="p-2"
        [ngClass]="{ 'text-slate-500': message.status === 'draft' }"
      >
        {{ message.text }}
      </div>
    </div>
  `,
  imports: [NgClass],
})
class MessageComponent {
  @Input({ required: true }) message: any;
  @Input() no: any;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  // providers: [MessageService],
  imports: [NgForOf, MessageComponent],
  template: `
    <div>
      <div *ngFor="let message of messages; index as i">
        <app-massage [message]="message" [no]="i"></app-massage>
      </div>
    </div>
  `,
})
class ChatComponent implements OnInit, OnDestroy {
  messages: Message[] = [];

  private subscription?: Subscription;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    console.log('ngOnInit');

    this.messageService.all();

    this.subscription = this.messageService.data$.subscribe({
      next: (messages) => {
        console.log(messages);
        this.messages = messages;
      },
      error: (error) => console.error('Error in subscription:', error),
      complete: () => {
        console.log('complete');
      },
    });
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    this.subscription?.unsubscribe();
  }
}

@Component({
  selector: 'app-create-message',
  standalone: true,
  // providers: [MessageService],
  imports: [ReactiveFormsModule, FormsModule, MessageComponent, NgIf, NgClass],
  template: `
    <div *ngIf="!message.empty()">
      <app-massage [message]="message" no="preview"></app-massage>
    </div>
    <form (ngSubmit)="onSubmit()">
      <label class="mt-4">
        <div>Write Message</div>
        <textarea
          class="block w-full"
          required
          name="text"
          [(ngModel)]="message.text"
        ></textarea>
      </label>

      <button
        type="submit"
        [disabled]="message.status === 'pending'"
        class="pointer bg-blue-400 py-2 px-4 mt-2 w-full"
        [ngClass]="{ 'bg-gray-400': message.status === 'pending' }"
      >
        Send
      </button>
    </form>
  `,
  styles: ``,
})
class CreateMessageComponent {
  message: Message = new Message('', 'kkkk', 'draft');
  private messageService: MessageService;

  constructor(messageService: MessageService) {
    this.messageService = messageService;
  }

  async onSubmit() {
    if (this.message.text === '') {
      alert('message cannot be empty');
      return;
    }
    this.message.status = 'pending';
    const res = await fetch('http://127.0.0.1:3000/messages/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: this.message.text, user: 'kkkk' }),
    });
    console.log(res.status);
    res.status === 200
      ? (this.message.status = 'sent')
      : (this.message.status = 'failed');
    this.messageService.add(this.message);
    this.message = new Message('', 'kkkk', 'draft');
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatComponent, CreateMessageComponent],
  template: `
    <div class="max-w-md mx-auto">
      <h1 class="text-2xl my-8">{{ title }}</h1>
      <app-chat></app-chat>
      <app-create-message></app-create-message>
    </div>
  `,
})
export class AppComponent {
  title = 'Chat';
}
