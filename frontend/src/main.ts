import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from "@angular/core"
import { AppModule } from './app/app.module';
import { RouterModule } from '@angular/router';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

