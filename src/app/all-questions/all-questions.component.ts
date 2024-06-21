import { Component, OnInit } from '@angular/core';
import { ApiService } from '../auth.service';

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.css']
})
export class AllQuestionsComponent implements OnInit {
  questions: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadAllQuestions();
  }

  loadAllQuestions() {
    this.apiService.getQuestions().subscribe(
      (data: any[]) => {
        this.questions = data;
      },
      error => {
        console.error('Error fetching questions:', error);
      }
    );
  }
}
