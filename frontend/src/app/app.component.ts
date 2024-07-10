import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(
      isLoggedIn => this.isLoggedIn = isLoggedIn
    );
  }

  logout() {
    this.authService.logout();
  }
  title = 'My Angular App';
}
