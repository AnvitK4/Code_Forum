import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { MenuComponent } from './menu/menu.component';
import { AllQuestionsComponent } from './all-questions/all-questions.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'ask-question', component: AskQuestionComponent },
  // { path: 'browse-topic', component: BrowseTopicComponent },
  // { path: 'help-support', component: HelpSupportComponent },
  // { path: 'my-questions', component: MyQuestionsComponent },
  // { path: 'my-answers', component: MyAnswersComponent },
  // { path: 'notification', component: NotificationsComponent },
  // { path: 'profile', component: ProfileComponent },
  // { path: 'tags-leaderboard', component: TagsLeaderboardComponent },
  // { path: 'settings', component: SettingsComponent},
  // { path: 'about', component: AboutComponent},
  { path: 'all-questions', component: AllQuestionsComponent }, // Add this line
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export { routes };
