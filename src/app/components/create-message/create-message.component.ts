import { Component } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.css']
})
export class CreateMessageComponent {
  message: Message = new Message('', 'user', 'draft');
  errorMessage: string | null = null;

  constructor(private messageService: MessageService) {}

  async onSubmit() {
    if (this.message.isEmpty()) {
      alert('Message cannot be empty');
      return;
    }
    this.message.status = 'pending';
    try {
      const res = await fetch('http://127.0.0.1:3000/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: this.message.text, user: 'user' })
      });
      if (res.status === 200) {
        this.message.status = 'sent';
        this.messageService.addMessage(this.message);
        this.message = new Message('', 'user', 'draft');
        this.errorMessage = null;
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Failed to send message', error);
      this.message.status = 'failed';
      this.errorMessage = 'Failed to send message. Please try again.';
    }
  }
}
