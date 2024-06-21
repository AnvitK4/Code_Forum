import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Import ApiService
import { CommonModule } from '@angular/common';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { BrowseTopicComponent } from './browse-topic/browse-topic.component';
import { HelpSupportComponent } from './help-support/help-support.component';
import { MyQuestionsComponent } from './my-questions/my-questions.component';
import { MyAnswersComponent } from './my-answers/my-answers.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { TagsLeaderboardComponent } from './tags-leaderboard/tags-leaderboard.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';
import { AllQuestionsComponent } from './all-questions/all-questions.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },  // Default route
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'my-questions', component: MyQuestionsComponent },
  {path: 'all-questions', component: AllQuestionsComponent}
];


@NgModule({
  declarations: [
    // HttpClientModule,
    // RegisterComponent,
    // DashboardComponent,
    // MenuComponent,
    AskQuestionComponent,
    // MyQuestionsComponent,
    // MyAnswersComponent,
    // NotificationsComponent,
    // ProfileComponent,
    // TagsLeaderboardComponent,
    // SettingsComponent,
    // AboutComponent,
    // AllQuestionsComponent,
    // LoginComponent,
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
    // LoginComponent,
    // LoginComponent, // Import standalone components here
    // RegisterComponent,
    // MenuComponent,
    // // AskQuestionComponent,
    // MyQuestionsComponent,
    // MyAnswersComponent,
    // NotificationsComponent,
    // ProfileComponent,
    // TagsLeaderboardComponent,
    // SettingsComponent,
    // AboutComponent
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
