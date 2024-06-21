import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class MyQuestionsComponent implements OnInit {
  questionForm: FormGroup;
  questions: any[] = [];
  errorMessage: string = ''; // Add this line


  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.questionForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadMyQuestions();
  }

  onSubmit() {
    if (this.questionForm.valid) {
      this.apiService.createQuestion(this.questionForm.value).subscribe(
        response => {
          console.log('Question saved successfully:', response);
          this.questions.push(response);
          this.questionForm.reset();
        },
        error => {
          console.error('Error saving question:', error);
        }
      );
    }
  }

  loadMyQuestions() {
    this.apiService.getQuestions().subscribe(
      (data: any[]) => {
        this.questions = data.filter(question => question.user_id === sessionStorage.getItem('user_id'));
      },
      error => {
        console.error('Error fetching questions:', error);
      }
    );
  }
}
