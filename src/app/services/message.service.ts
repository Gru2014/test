import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private messageSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
  public data$: Observable<Message[]> = this.messageSubject.asObservable();

  async fetchAllMessages() {
    try {
      const res = await fetch('http://127.0.0.1:3000/messages');
      const data = await res.json();
      this.messageSubject.next(data);
    } catch (err) {
      console.error('Failed to fetch messages', err);
    }
  }

  addMessage(message: Message) {
    const currentMessages = this.messageSubject.value;
    this.messageSubject.next([...currentMessages, message]);
  }

  getMessages(): Observable<Message[]> {
    return this.data$;
  }
}
