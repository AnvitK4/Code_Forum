import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: any = {};

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    console.log('Route Snapshot:', this.route.snapshot.params);
    const userId = this.route.snapshot.paramMap.get('id');
    console.log('User ID:', userId);
    if (userId) {
      this.apiService.getUserData(userId).subscribe(
        data => {
          this.userData = data;
        },
        error => {
          console.error('Error fetching user data:', error);
        }
      );
    } else {
      console.error('User ID is null');
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
