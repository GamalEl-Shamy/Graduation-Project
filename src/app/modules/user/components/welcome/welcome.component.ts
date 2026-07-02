import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SlideIn } from "../../../../shared/directives/slide-in";

@Component({
  selector: 'app-welcome',
  imports: [RouterLink, SlideIn],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent implements OnInit {
 userFirstName:string = "";
 
  ngOnInit(): void {
    if (typeof window != 'undefined') {
      this.userFirstName = localStorage.getItem('userFirstNameZaraa')!;
    }
  }
}
