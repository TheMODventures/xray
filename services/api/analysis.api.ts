import { AnalysisPayload, AnalysisResponse, MRIAnalysisResponse } from "../interface/analysis/analysis.interface";
import axiosService from "../middleware/axios.middleware";
import Routes from "../routes/routes";

class AnalysisApiService {
  async detectDisease(payload: AnalysisPayload): Promise<AnalysisResponse> {
    const formData = new FormData();
    formData.append('file', payload.file);
    
    if (payload.threshold !== undefined) {
      formData.append('threshold', payload.threshold.toString());
    }

    const { data } = await axiosService.post<AnalysisResponse>(
      Routes.Analysis.detectDisease(payload.threshold),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  }

  async detectMRI(payload: AnalysisPayload): Promise<MRIAnalysisResponse> {
    const formData = new FormData();
    formData.append('file', payload.file);
    
    if (payload.threshold !== undefined) {
      formData.append('threshold', payload.threshold.toString());
    }

    const { data } = await axiosService.post<MRIAnalysisResponse>(
      Routes.Analysis.detectMRI,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  }
}

export const analysisService = new AnalysisApiService();
