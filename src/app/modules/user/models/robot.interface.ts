export interface ScanResult {
  id: number;
  plantName: string;
  diseaseName: string;
  confidenceRate: string;
  description: string;
  symptoms: string;
  treatment: string;
  imageUrl: string;
  scanDate: string;
}

export interface ScanResponse {
  total: number;
  results: any[]; 
}