import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true, // Add this line
  imports: [ReactiveFormsModule, CommonModule] // Import ReactiveFormsModule here

})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService) {
    console.log('login component')
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  

  ngOnInit(): void { }

  login(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.apiService.loginUser(formData).subscribe(
        response => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Error during login:', error);
        }
      );
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
