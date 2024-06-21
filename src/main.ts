import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';  // <-- Add HTTP_INTERCEPTORS here
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { routes } from './app/app-routing.module';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    // { provide: HTTP_INTERCEPTORS, useClass: HttpClientModule, multi: true },
    { provide: ReactiveFormsModule, useValue: ReactiveFormsModule },
    { provide: FormsModule, useValue: FormsModule }
  ]
}).catch(err => console.error(err));
