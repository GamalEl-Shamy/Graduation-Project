import { Component, OnInit, output } from '@angular/core';

@Component({
  selector: 'app-welcome-message',
  imports: [],
  templateUrl: './welcome-message.component.html',
  styleUrl: './welcome-message.component.css',
})
export class WelcomeMessageComponent implements OnInit {
  onDismiss = output<boolean>();

  userFirstName:string = "";
  userEmail:string = "";
  userRole:string  = "";
  char:string  = "";
  

  ngOnInit(): void {
    if (typeof window != 'undefined') {
      this.userFirstName = localStorage.getItem('userFirstNameZaraa')!;
      this.userEmail = localStorage.getItem('userEmailZaraa')!;
      this.userRole = localStorage.getItem('userRoleZaraa')!;
      this.char = this.userFirstName[0]!.toUpperCase();
    }
  }

  close() {
    if (typeof window != 'undefined') {
      localStorage.setItem('welcomeState', 'false')
    }
    this.onDismiss.emit(false);
  }
}
