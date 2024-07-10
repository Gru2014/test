import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  userId: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.userId, this.password);
  }
}
