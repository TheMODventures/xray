export interface AnalysisPayload {
  file: File;
  threshold?: number;
}

export interface ImagePath {
  type: string;
  path: string;
  description: string;
}

export interface DetectedDiseases {
  Atelectasis: number;
  Consolidation: number;
  Infiltration: number;
  Pneumothorax: number;
  Edema: number;
  Emphysema: number;
  Fibrosis: number;
  Effusion: number;
  Pneumonia: number;
  Pleural_Thickening: number;
  Cardiomegaly: number;
  Nodule: number;
  Mass: number;
  "Lung Lesion": number;
  Fracture: number;
  "Lung Opacity": number;
  "Enlarged Cardiomediastinum": number;
}

export interface AnalysisResponse {
  status: string;
  input_image: string;
  threshold: number;
  total_diseases_detected: number;
  detected_diseases: DetectedDiseases;
  image_paths: ImagePath[];
  model_used: string;
}

export interface MRIPrediction {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  class: string;
  class_id: number;
  detection_id: string;
}

export interface MRIImage {
  width: number;
  height: number;
}

export interface MRIAnalysisResponse {
  inference_id: string;
  time: number;
  image: MRIImage;
  predictions: MRIPrediction[];
}