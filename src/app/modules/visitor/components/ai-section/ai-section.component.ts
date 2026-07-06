import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-ai-section',
  imports: [],
  templateUrl: './ai-section.component.html',
  styleUrl: './ai-section.component.css',
})
export class AiSectionComponent {
features = signal([
    'Robot captures plant images on schedule',
    'Uploads automatically over Wi-Fi or 4G',
    'AI analyzes crop health in real time',
    'Diagnosis appears in your dashboard instantly',
  ]);





  steps = signal([
    { icon: 'fa-upload',       label: 'Upload Plant Image' },
    { icon: 'fa-seedling',     label: 'AI Identifies Plant' },
    { icon: 'fa-virus',        label: 'Disease Detection' },
    { icon: 'fa-flask-vial',   label: 'Treatment Recommendation' },
    { icon: 'fa-floppy-disk',  label: 'Save Diagnosis' },
  ]);



}
