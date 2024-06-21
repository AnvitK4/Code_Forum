import { Component } from '@angular/core';
import { ApiService } from './auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
  ]
})
export class  AppComponent{
  title = 'Frontend';
}
