import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/auth';

  constructor(private http: HttpClient) {}

  createQuestion(questionData: any): Observable<any> {
    return this.http.post('your-api-endpoint', questionData);
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData).pipe(catchError(this.handleError));
  }

  loginUser(loginData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, loginData);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {});
  }

  getUserData(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/user?user_id=${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  getQuestions(): Observable<any> {
    return this.http.get(`${this.baseUrl}/questions`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something went wrong; please try again later.');
  }
}
