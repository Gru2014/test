import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent {
  userId: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  register() {
    this.authService.register(this.userId, this.password);
  }
}
