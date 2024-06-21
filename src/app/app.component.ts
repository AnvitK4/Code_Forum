import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class  AppComponent implements OnInit{

  constructor(
    public router: Router,
  ) {
    console.log('this is it')
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.router.navigateByUrl('/login');
  }

}
