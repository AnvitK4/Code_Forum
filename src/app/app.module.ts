import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AskQuestionComponent } from './ask-question/ask-question.component';

const routes: Routes = [
  { path: 'home', component: RegisterComponent },  // Default route
  { path: 'login', component: LoginComponent }
];


@NgModule({
  declarations: [
    AskQuestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
