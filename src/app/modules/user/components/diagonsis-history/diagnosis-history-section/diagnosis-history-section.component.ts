import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { DiagnosisHistoryEmptyComponent } from "../diagnosis-history-empty/diagnosis-history-empty.component";
import { RouterLink } from "@angular/router";
import { DiagnoisHistorySkeletonsComponent } from "../../../skeletons/diagnois-history-skeletons/diagnois-history-skeletons.component";

interface DiagnosisRecord {
  id: string;
  plantName: string;
  disease: string;
  status: 'Healthy' | 'Infected' | 'Recovering';
  date: Date;
  confidence: number;
  image: string;
}


@Component({
  selector: 'app-diagnosis-history-section',
  imports: [CommonModule, DiagnosisHistoryEmptyComponent, RouterLink, DiagnoisHistorySkeletonsComponent],
  templateUrl: './diagnosis-history-section.component.html',
  styleUrl: './diagnosis-history-section.component.css',
})
export class DiagnosisHistorySectionComponent {
searchQuery = signal('');
  filterStatus = signal('All');

  historyRecords = signal<DiagnosisRecord[]>([
    {
      id: 'DX-9021',
      plantName: 'Tomato',
      disease: 'Late Blight',
      status: 'Infected',
      date: new Date('2026-02-05T10:30:00'),
      confidence: 98,
      image: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=300'
    },
    {
      id: 'DX-8842',
      plantName: 'Apple',
      disease: 'None (Healthy)',
      status: 'Healthy',
      date: new Date('2026-02-01T14:20:00'),
      confidence: 99,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/960px-Red_Apple.jpg'
    },
    {
      id: 'DX-7721',
      plantName: 'Corn',
      disease: 'Common Rust',
      status: 'Recovering',
      date: new Date('2026-01-25T09:15:00'),
      confidence: 92,
      image: 'https://cdn.britannica.com/36/167236-050-BF90337E/Ears-corn.jpg'
    }
  ]);

  filteredHistory = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const status = this.filterStatus();

    return this.historyRecords().filter(record => {
      const matchesSearch = record.plantName.toLowerCase().includes(query) || 
                           record.disease.toLowerCase().includes(query);
      const matchesStatus = status === 'All' || record.status === status;
      return matchesSearch && matchesStatus;
    });
  });

  getStatusClass(status: string) {
    switch (status) {
      case 'Healthy': return 'bg-emerald-100 text-emerald-700';
      case 'Infected': return 'bg-red-100 text-red-700';
      case 'Recovering': return 'bg-amber-100 text-amber-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  }
}
