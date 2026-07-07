import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, inject, OnInit, signal } from '@angular/core';
import { DiagnosisHistoryEmptyComponent } from "../diagnosis-history-empty/diagnosis-history-empty.component";
import { RouterLink } from "@angular/router";
import { DiagnoisHistorySkeletonsComponent } from "../../../skeletons/diagnois-history-skeletons/diagnois-history-skeletons.component";
import { SlideIn } from "../../../../../shared/directives/slide-in";
import { DiseaseScanService } from '../../../services/disease-scan.service';
import { DiseaseScanResult } from '../../../models/disease-scan-result.interface';
import { environment } from '../../../../../../environments/environment.development';
import { PrintDiagnosisBtnComponent } from "../print-diagnosis-btn/print-diagnosis-btn.component";

export interface HistoryRecordUI {
  id: number;
  plantName: string;
  disease: string;
  date: Date;
  image: string;
  confidence: number;
  status: 'Healthy' | 'Infected' | 'Recovering';
}


@Component({
  selector: 'app-diagnosis-history-section',
  imports: [CommonModule, DiagnosisHistoryEmptyComponent, RouterLink, DiagnoisHistorySkeletonsComponent, SlideIn, PrintDiagnosisBtnComponent],
  templateUrl: './diagnosis-history-section.component.html',
  styleUrl: './diagnosis-history-section.component.css',
})
export class DiagnosisHistorySectionComponent implements OnInit {
  public elementRef = inject(ElementRef);

  private scanService = inject(DiseaseScanService);

  private readonly BASE_IMAGE_URL = environment.apiUrl + '/ScanImage/';

  rawHistory = signal<DiseaseScanResult[] | null>(null);

  searchQuery = signal<string>('');
  filterStatus = signal<string>('All');

  filteredHistory = computed(() => {
    const data = this.rawHistory();
    if (!data) return [];

    let result = [...data];

    const query = this.searchQuery().toLowerCase().trim();
    if (query) {
      result = result.filter(item =>
        item.plantName.toLowerCase().includes(query) ||
        this.parseDisease(item.diseaseName).toLowerCase().includes(query)
      );
    }

    if (this.filterStatus() !== 'All') {
      result = result.filter(item => this.determineStatus(item.diseaseName) === this.filterStatus());
    }

    return result;
  });

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.scanService.getScanHistory().subscribe({
      next: (res) => {
        console.log('API Data Received:', res);
        this.rawHistory.set(res.sort((a, b) => b.id - a.id));
      },
      error: (err) => {
        console.error('API Error:', err);
        this.rawHistory.set([]);
      }
    });
  }

  deleteRecord(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.scanService.deleteScan(id).subscribe({
        next: () => {
          this.rawHistory.update(prev => prev ? prev.filter(item => item.id !== id) : null);
        },
        error: (err) => alert('Error deleting record')
      });
    }
  }

  parseDisease(jsonStr: string): string {
    try {
      const obj = JSON.parse(jsonStr);
      return obj.prediction || 'Unknown Disease';
    } catch {
      return jsonStr || 'No disease detected';
    }
  }

  determineStatus(jsonStr: string): string {
    const disease = this.parseDisease(jsonStr).toLowerCase();
    if (disease.includes('healthy')) return 'Healthy';
    return 'Infected';
  }

  getConfidence(rate: string): number {
    const val = parseFloat(rate);
    return isNaN(val) ? 0 : val;
  }

  getFullImageUrl(url: string): string {
    return this.BASE_IMAGE_URL + url;
  }

  getStatusClass(jsonStr: string): string {
    const status = this.determineStatus(jsonStr);
    return status === 'Healthy'
      ? 'text-emerald-700 bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200'
      : 'text-rose-700 bg-rose-100 dark:bg-rose-900/30 border-rose-200';
  }
}
