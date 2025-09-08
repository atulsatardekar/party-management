import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'party-management2';
  isLoggedIn = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to authentication state changes
    this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
    });
    this.isLoggedIn=this.authService.isLoggedIn();
  }
}
