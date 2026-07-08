import { Component, input, output } from '@angular/core';
import { UserProfile } from '../../models/settings.interface';
import { SlideIn } from "../../../directives/slide-in";

@Component({
  selector: 'app-profile-info',
  imports: [SlideIn],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css',
})
export class ProfileInfoComponent {

  profile = input.required<UserProfile>();
  editRequest = output<void>();

  onEditClicked() {
    this.editRequest.emit();
  }
}
