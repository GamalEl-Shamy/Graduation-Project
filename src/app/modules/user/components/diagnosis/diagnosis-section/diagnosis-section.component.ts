import { Component, computed, ElementRef, inject, signal } from '@angular/core';
import {
  Plant,
  PredictionResponse,
  SupportedPlant,
} from '../../../models/plant-detection.interface';
import { AiDetectionService } from '../../../services/ai-detection.service';
import { RouterLink } from '@angular/router';
import { AmbientBackgroundComponent } from "../../../../admin/shared/ambient-background/ambient-background.component";

@Component({
  selector: 'app-diagnosis-section',
  imports: [RouterLink, AmbientBackgroundComponent],
  templateUrl: './diagnosis-section.component.html',
  styleUrl: './diagnosis-section.component.css',
})
export class DiagnosisSectionComponent {
  public elementRef = inject(ElementRef);

  private aiDetectionService = inject(AiDetectionService);

  currentStep = signal(1);
  searchQuery = signal<string>('');
  selectedPlant = signal<Plant | null>(null);
  previewUrl = signal<string | null>(null);

  selectedFile = signal<File | null>(null);

  isAnalyzing = signal<boolean>(true);
  analysisResult = signal<PredictionResponse | null>(null);
  errorMessage = signal<string | null>(null);

  plants = signal<Plant[]>([
    {
      id: 1,
      name: 'Apple',
      img: 'https://tse2.mm.bing.net/th/id/OIP.Lzfc80LO77_pIMwXRnjuYwHaF7?pid=Api&P=0&h=220',
    },
    {
      id: 2,
      name: 'Cherry',
      img: 'https://paradisenursery.com/cdn/shop/files/royal-crimson-cherry-tree-scaled.jpg?v=1698885070w=300',
    },
    {
      id: 4,
      name: 'Corn',
      img: 'https://hgtvhome.sndimg.com/content/dam/images/hgtv/stock/2018/4/3/0/shutterstock_Chutharat-Kamkhuntee_683363251_corn-growing.jpg.rend.hgtvcom.1280.960.85.suffix/1522768591804.webp?w=300',
    },
    {
      id: 3,
      name: 'Tomato',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZHfQzuxPK5-l96opNVwmfmHvSmFVoQTtM5w&s?w=300',
    },
    {
      id: 5,
      name: 'Grape',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDijkD6E_szv_fBeTNYRCyPpiOcSpDpokHsQ&s?w=300',
    },
    {
      id: 6,
      name: 'Peach',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFA4K3v0fR_EMoDDAdsG5RoDjLGf65WVizFw&s?w=300',
    },
    {
      id: 7,
      name: 'Pepper',
      img: 'https://snaped.fns.usda.gov/sites/default/files/seasonal-produce/2018-05/bell%20peppers.jpg?w=300',
    },
    {
      id: 8,
      name: 'Potato',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlSi8a2t5FvfSExMXHsByKp8w2eY-NXofrTQ&s?w=300',
    },
    {
      id: 9,
      name: 'Strawberry',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyRIkEgXQ6prN8duYfvZmQB11kyhAwe2S58A&s?w=300',
    },
  ]);

  filteredPlants = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.plants();
    return this.plants().filter((plant) => plant.name.toLowerCase().includes(query));
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

      this.selectedFile.set(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  clearPreview() {
    this.previewUrl.set(null);
    this.selectedFile.set(null);
    this.analysisResult.set(null);
    this.errorMessage.set(null);
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
      this.currentStep.update((s) => s + 1);
    }
    
    if (this.currentStep() === 3) {
      this.analyzeImage();
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update((s) => s - 1);
    }
  }

  private analyzeImage() {
    const plant = this.selectedPlant();
    const file = this.selectedFile();

    if (!plant || !file) {
      this.errorMessage.set('Missing plant type or image.');
      return;
    }

    this.isAnalyzing.set(true);
    this.errorMessage.set(null);
    this.analysisResult.set(null);

    const plantName = plant.name as SupportedPlant;

    this.aiDetectionService.predictDisease(plantName, file).subscribe({
      next: (res: PredictionResponse) => {
        this.analysisResult.set(res);
        this.isAnalyzing.set(false);
      },
      error: (err) => {
        console.error('Analysis Error:', err);
        if (err.status === 422) {
          this.errorMessage.set('Invalid data provided. Please check the image and plant type.');
        } else {
          this.errorMessage.set('Failed to analyze the image. Please try again later.');
        }
        this.isAnalyzing.set(false);
      },
    });
  }
}
