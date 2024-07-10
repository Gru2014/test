import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { CreateMessageComponent } from './components/create-message/create-message.component';
import { MessageComponent } from './components/message/message.component';
import { ChatComponent } from './components/chat/chat.component';
import { AppComponent } from './app.component2';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'create-message', component: AppComponent },
    // { path: 'message', component: MessageComponent },
    // { path: 'chat', component: ChatComponent },

    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
