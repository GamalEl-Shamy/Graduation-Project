import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-footer',
  imports: [RouterLink, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {

  private http = inject(HttpClient);
  private formspreeUrl = 'https://formspree.io/f/xjgqqyrb';

  contactEmail = signal<string>('');
  contactMessage = signal<string>('');
  isSending = signal<boolean>(false);
  currentYear = new Date().getFullYear();
  isVisitor = input<boolean>(false);

  sendMessage() {
    if (!this.contactEmail() || !this.contactMessage()) return;
    this.isSending.set(true);
    const payload = {
      email: this.contactEmail(),
      message: this.contactMessage()
    };

    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    this.http.post(this.formspreeUrl, payload, { headers }).subscribe({
      next: () => {
        this.isSending.set(false);
        this.contactEmail.set('');
        this.contactMessage.set('');
      },
      error: (err) => {
        this.isSending.set(false);
        console.error('Error sending message:', err);
      }
    });
  }
}
