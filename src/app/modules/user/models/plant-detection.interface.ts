export type SupportedPlant = 
  | 'Apple' 
  | 'Cherry' 
  | 'Corn' 
  | 'Grape' 
  | 'Peach' 
  | 'Pepper' 
  | 'Potato' 
  | 'Strawberry' 
  | 'Tomato';

export interface PredictionResponse {
  plant: string
  prediction: string
  confidence: string
  details: Details
}

export interface Details {
  Description: string
  Symptoms: string
  Treatment: string
}

export interface Plant {
    id:number
    name:string
    img:string
}