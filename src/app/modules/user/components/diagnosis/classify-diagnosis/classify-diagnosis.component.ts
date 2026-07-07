import { Component, ElementRef, inject, signal } from '@angular/core';
import { DiagnosisResult } from '../../../models/diagnosis-result.interface';
import { DiagnosisService } from '../../../services/diagnosis.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from "@angular/router";
import { SlideIn } from "../../../../../shared/directives/slide-in";

@Component({
  selector: 'app-classify-diagnosis',
  imports: [RouterLink, SlideIn],
  templateUrl: './classify-diagnosis.component.html',
  styleUrl: './classify-diagnosis.component.css',
})
export class ClassifyDiagnosisComponent {
  public elementRef = inject(ElementRef);

    private diagnosisService = inject(DiagnosisService);

  selectedFile = signal<File | null>(null);
  imagePreview = signal<string | ArrayBuffer | null>(null);
  
  isLoading = signal<boolean>(false);
  result = signal<DiagnosisResult | null>(null);
  errorMessage = signal<string | null>(null);

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.handleFile(file);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    this.handleFile(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  private handleFile(file: File | undefined) {
    if (file) {
      this.selectedFile.set(file);
      this.resetState();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview.set(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.selectedFile.set(null);
    this.imagePreview.set(null);
    this.resetState();
  }

  private resetState() {
    this.result.set(null);
    this.errorMessage.set(null);
  }

  analyzeImage() {
    const currentFile = this.selectedFile(); 
    if (!currentFile) return;

    this.isLoading.set(true);
    this.resetState();

    this.diagnosisService.classifyPlant(currentFile).subscribe({
      next: (response) => {
        this.result.set(response);
        this.isLoading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        
        if (err.status === 400) {
          const backendMessage = err.error?.text || err.error;
          this.errorMessage.set(
            typeof backendMessage === 'string' 
              ? backendMessage 
              : 'Invalid image or no plant detected.'
          );
        } else {
          this.errorMessage.set('A network error occurred. Please try again.');
        }
      }
    });
  }
}
