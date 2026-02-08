import { Component, signal } from '@angular/core';

interface Plant {
  id: number;
  name: string;
  species: string;
  status: 'Excellent' | 'Need Attention' | 'Critical';
  lastWatered: string;
  healthScore: number;
  img: string;
}
@Component({
  selector: 'app-my-garden',
  imports: [],
  templateUrl: './my-garden.component.html',
  styleUrl: './my-garden.component.css',
})
export class MyGardenComponent {
myPlants = signal<Plant[]>([
    // {
    //   id: 1,
    //   name: 'Tomato Alpha',
    //   species: 'Tomato',
    //   status: 'Excellent',
    //   lastWatered: '2 hours ago',
    //   healthScore: 95,
    //   img: 'https://images.unsplash.com/photo-1592398633820-a2fd43f27f13?w=400'
    // },
    // {
    //   id: 2,
    //   name: 'Sweet Orange 02',
    //   species: 'Orange',
    //   status: 'Need Attention',
    //   lastWatered: 'Yesterday',
    //   healthScore: 64,
    //   img: 'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=400'
    // },
    // {
    //   id: 3,
    //   name: 'Backyard Corn',
    //   species: 'Corn',
    //   status: 'Critical',
    //   lastWatered: '3 days ago',
    //   healthScore: 28,
    //   img: 'https://images.unsplash.com/photo-1551743609-a79357497143?w=400'
    // }
  ]);

  getStatusColor(status: string) {
    switch (status) {
      case 'Excellent': return 'text-emerald-500 bg-emerald-50';
      case 'Need Attention': return 'text-amber-500 bg-amber-50';
      case 'Critical': return 'text-red-500 bg-red-50';
      default: return 'text-slate-500 bg-slate-50';
    }
  }
}
