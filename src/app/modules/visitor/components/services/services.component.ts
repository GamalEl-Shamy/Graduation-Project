import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  services = [
    {
      tag: 'Field Robotics',
      title: 'Smart Field Monitoring',
      description: 'Crop and plant health analysis powered by autonomous ground robots.',
      image:
        './images/field-robotics.png',
    },
    {
      tag: 'Fruits',
      title: 'Disease Detection',
      description: 'Upload plant photos and get AI-driven insights to detect diseases instantly.',
      image:
        './images/smart-agriculture.png',
    },
    {
      tag: 'Custom Treatments',
      title: 'Curated Remedies',
      description: 'Shop specialized, organic products tailored specifically for your plants.',
      image:
        './images/Treatment-for-plants.png',
    },
  ];
}
