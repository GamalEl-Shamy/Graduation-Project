import { Component, computed, signal } from '@angular/core';
import { Plant } from '../../../models/plant.interface';

@Component({
  selector: 'app-diagnosis-section',
  imports: [],
  templateUrl: './diagnosis-section.component.html',
  styleUrl: './diagnosis-section.component.css',
})
export class DiagnosisSectionComponent {
currentStep = signal(1);

  plants = signal<Plant[]>([
    { id: 1, name: 'Apple', img: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=300' },
    { id: 2, name: 'Cherry', img: 'https://paradisenursery.com/cdn/shop/files/royal-crimson-cherry-tree-scaled.jpg?v=1698885070w=300' },
    { id: 4, name: 'Corn', img: 'https://hgtvhome.sndimg.com/content/dam/images/hgtv/stock/2018/4/3/0/shutterstock_Chutharat-Kamkhuntee_683363251_corn-growing.jpg.rend.hgtvcom.1280.960.85.suffix/1522768591804.webp?w=300' },
    { id: 3, name: 'Tomato', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZHfQzuxPK5-l96opNVwmfmHvSmFVoQTtM5w&s?w=300' },
    { id: 5, name: 'Grape', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDijkD6E_szv_fBeTNYRCyPpiOcSpDpokHsQ&s?w=300' },
    { id: 6, name: 'Peach', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFA4K3v0fR_EMoDDAdsG5RoDjLGf65WVizFw&s?w=300' },
    { id: 7, name: 'Pepper', img: 'https://snaped.fns.usda.gov/sites/default/files/seasonal-produce/2018-05/bell%20peppers.jpg?w=300' },
    { id: 8, name: 'Potato', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlSi8a2t5FvfSExMXHsByKp8w2eY-NXofrTQ&s?w=300' },
    { id: 9, name: 'Strawberry', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyRIkEgXQ6prN8duYfvZmQB11kyhAwe2S58A&s?w=300' },
  ]);


  searchQuery = signal<string>('');
  selectedPlant = signal<Plant | null>(null);
  previewUrl = signal<string | null>(null);

  filteredPlants = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.plants();
    return this.plants().filter(plant =>
      plant.name.toLowerCase().includes(query)
    );
  });

  selectPlant(plant: Plant) {
    this.selectedPlant.set(plant);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  clearPreview() {
    this.previewUrl.set(null);
  }

  nextStep() {
    const step = this.currentStep();

    if (step === 1 && !this.selectedPlant()) {
      alert('Please select a plant type first');
      return;
    }

    if (step === 2 && !this.previewUrl()) {
      alert('Please upload a photo first');
      return;
    }

    if (step < 3) {
      this.currentStep.update(s => s + 1);
    }

    // send to backend
    if (this.currentStep() === 3) {
      this.analyzeImage();
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
    }
  }

  private analyzeImage() {
    console.log('Analyzing:', {
      plant: this.selectedPlant()?.name,
      image: this.previewUrl() ? 'Image uploaded' : 'No image'
    });

    // here i will send to pai
    // this.http.post('/api/diagnose', { plant: this.selectedPlant()?.name, imageBase64: this.previewUrl() })
    //   .subscribe(result => { ... عرض النتائج ... });
    
    alert('Analysis started! Results will appear soon...');
  }
}
