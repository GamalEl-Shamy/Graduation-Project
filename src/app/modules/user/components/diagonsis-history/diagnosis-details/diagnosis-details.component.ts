import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../../../environments/environment.development';
import { SlideIn } from "../../../../../shared/directives/slide-in";
import { DiseaseScanResult } from '../../../models/disease-scan-result.interface';
import { DiseaseScanService } from '../../../services/disease-scan.service';
import { SingleDiagnosisDetailsComponent } from "../single-diagnosis-details/single-diagnosis-details.component";

@Component({
  selector: 'app-diagnosis-details',
  imports: [DatePipe, SlideIn, RouterLink, SingleDiagnosisDetailsComponent],
  templateUrl: './diagnosis-details.component.html',
  styleUrl: './diagnosis-details.component.css',
})
export class DiagnosisDetailsComponent {

  private scanService = inject(DiseaseScanService);
  private readonly BASE_IMAGE_URL = environment.apiUrl + '/ScanImage/';

  id = input.required<string>();

  record = signal<DiseaseScanResult | null>(null);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  constructor() {
    effect(() => {
      const currentId = this.id();
      if (currentId) {
        const numericId = parseInt(currentId, 10);
        if (!isNaN(numericId)) {
          this.fetchDetails(numericId);
        } else {
          this.errorMessage.set('Invalid ID format in URL.');
          this.isLoading.set(false);
        }
      }
    });
  }

  private fetchDetails(id: number) {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.scanService.getScanDetails(id).subscribe({
      next: (data) => {
        this.record.set(data);
        this.isLoading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.errorMessage.set('Could not find the diagnosis details.');
        console.error('Error fetching details:', err);
      }
    });
  }

  parsedDisease = computed(() => {
    const res = this.record();
    if (!res) return 'Unknown';
    try {
      const obj = JSON.parse(res.diseaseName);
      return obj.prediction || 'Healthy';
    } catch {
      return res.diseaseName || 'Healthy';
    }
  });

  confidenceValue = computed(() => {
    const res = this.record();
    if (!res) return 0;
    const rate = parseFloat(res.confidenceRate);
    return isNaN(rate) ? 0 : rate;
  });

  statusColor = computed(() => {
    const disease = this.parsedDisease().toLowerCase();
    return disease.includes('healthy') ? 'emerald' : 'rose';
  });

  getFullImageUrl(url: string | undefined): string {
    if (!url) return 'assets/img/placeholder.png';
    return url.startsWith('http') ? url : this.BASE_IMAGE_URL + url;
  }
}
