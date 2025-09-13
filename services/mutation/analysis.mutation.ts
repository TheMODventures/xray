import { useMutation } from '@tanstack/react-query';
import { analysisService } from '../api/analysis.api';
import { AnalysisPayload, AnalysisResponse, MRIAnalysisResponse } from '../interface/analysis/analysis.interface';

function useDetectDisease() {
  return useMutation<AnalysisResponse, Error, AnalysisPayload>({
    mutationFn: async (payload: AnalysisPayload) => {
      const response = await analysisService.detectDisease(payload);
      return response;
    },
    onSuccess: (result: AnalysisResponse) => {
      console.log('Disease detection completed:', result);
    },
    onError: (error: Error) => {
      console.error('Disease detection failed:', error);
    },
  });
}

function useDetectMRI() {
  return useMutation<MRIAnalysisResponse, Error, AnalysisPayload>({
    mutationFn: async (payload: AnalysisPayload) => {
      const response = await analysisService.detectMRI(payload);
      return response;
    },
    onSuccess: (result: MRIAnalysisResponse) => {
      console.log('MRI analysis completed:', result);
    },
    onError: (error: Error) => {
      console.error('MRI analysis failed:', error);
    },
  });
}

class AnalysisMutation {
  static useDetectDisease = useDetectDisease;
  static useDetectMRI = useDetectMRI;
}

export { AnalysisMutation };
export default new AnalysisMutation();
