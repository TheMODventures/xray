import { useMutation } from '@tanstack/react-query';
import { analysisService } from '../api/analysis.api';
import { AnalysisPayload, AnalysisResponse } from '../interface/analysis/analysis.interface';

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

class AnalysisMutation {
  static useDetectDisease = useDetectDisease;
}

export { AnalysisMutation };
export default new AnalysisMutation();
