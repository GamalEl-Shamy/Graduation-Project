export interface Plant {
  id: number;                   
  name: string;               
  nameAr?: string;          
  scientificName?: string;      
  img: string;                  
  category?: string;            
  commonDiseases?: string[];   
  description?: string;          
  createdAt?: string;        
  updatedAt?: string;         
}