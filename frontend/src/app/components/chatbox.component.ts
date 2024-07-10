import { Component, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

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
    <div class="bg-white p-4 rounded shadow mb-4">
      <span class="block bg-gray-200 text-gray-500 py-1 px-2 rounded mb-2">
        {{ no }} - {{ message.user }} : {{ message.status }}
      </span>
      <div
        class="p-2"
        [ngClass]="{ 'text-gray-500': message.status === 'draft' }"
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
  imports: [NgForOf, MessageComponent],
  template: `
    <div class="space-y-4">
      <div *ngFor="let message of messages; index as i">
        <app-massage [message]="message" [no]="i + 1"></app-massage>
      </div>
    </div>
  `,
})
class ChatComponent implements OnInit, OnDestroy {
  messages: Message[] = [];

  private subscription?: Subscription;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.all();

    this.subscription = this.messageService.data$.subscribe({
      next: (messages) => {
        this.messages = messages;
      },
      error: (error) => console.error('Error in subscription:', error),
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}

@Component({
  selector: 'app-create-message',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MessageComponent, NgIf, NgClass],
  template: `
    <div *ngIf="!message.empty()" class="mb-4">
      <app-massage [message]="message" no="preview"></app-massage>
    </div>
    <form (ngSubmit)="onSubmit()" class="space-y-4">
      <label class="block">
        <div class="mb-1 text-gray-700">Write Message</div>
        <textarea
          class="block w-full border rounded p-2"
          required
          name="text"
          [(ngModel)]="message.text"
        ></textarea>
      </label>

      <button
        type="submit"
        [disabled]="message.status === 'pending'"
        class="pointer bg-blue-500 text-white py-2 px-4 w-full rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        Send
      </button>
    </form>
  `,
  styles: ``,
})
class CreateMessageComponent {
  user: string;
  message: Message;
  private messageService: MessageService;

  constructor(messageService: MessageService) {
    this.messageService = messageService;
    const token = localStorage.getItem('token') as string;
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.user = decodedToken.userId;
    } else {
      console.log('Token not found in localStorage');
      this.user = '';
    }
    this.message = new Message('', this.user, 'draft');
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
      body: JSON.stringify({ text: this.message.text, user: this.user }),
    });
    res.status === 200
      ? (this.message.status = 'sent')
      : (this.message.status = 'failed');
    this.messageService.add(this.message);
    this.message = new Message('', this.user, 'draft');
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatComponent, CreateMessageComponent],
  template: `
    <div class="max-w-md mx-auto p-4">
      <h1 class="text-2xl font-bold mb-8">{{ title }}</h1>
      <app-chat></app-chat>
      <app-create-message></app-create-message>
    </div>
  `,
})
export class ChatBoxComponent {
  title = 'Chat';
}
