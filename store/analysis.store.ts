import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AnalysisResponse, DetectedDiseases, MRIAnalysisResponse } from '../services/interface/analysis/analysis.interface';

type AnalysisType = 'xray' | 'mri';
type AnalysisData = AnalysisResponse | MRIAnalysisResponse;

interface AnalysisState {
  // Current analysis data
  currentAnalysis: AnalysisData | null;
  analysisType: AnalysisType | null;
  
  // File info
  uploadedFile: File | null;
  uploadedImageUrl: string | null;
  
  // Actions
  setAnalysisData: (data: AnalysisData, type: AnalysisType) => void;
  setAnalysisType: (type: AnalysisType | null) => void;
  setUploadedFile: (file: File | null) => void;
  setUploadedImageUrl: (url: string | null) => void;
  resetAnalysis: () => void;
}

export const useAnalysisStore = create<AnalysisState>()(
  persist(
    (set) => ({
      // Initial state
      currentAnalysis: null,
      analysisType: null,
      uploadedFile: null,
      uploadedImageUrl: null,

      // Actions
      setAnalysisData: (data: AnalysisData, type: AnalysisType) => {
        set({ currentAnalysis: data, analysisType: type });
      },

      setAnalysisType: (type: AnalysisType | null) => {
        set({ analysisType: type });
      },

      setUploadedFile: (file: File | null) => {
        set({ uploadedFile: file });
      },

      setUploadedImageUrl: (url: string | null) => {
        set({ uploadedImageUrl: url });
      },

      resetAnalysis: () => {
        set({
          currentAnalysis: null,
          analysisType: null,
          uploadedFile: null,
          uploadedImageUrl: null,
        });
      },
    }),
    {
      name: 'analysis-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentAnalysis: state.currentAnalysis,
        analysisType: state.analysisType,
        uploadedFile: state.uploadedFile,
        uploadedImageUrl: state.uploadedImageUrl,
      }),
    }
  )
);

// Selector hooks for better performance
export const useCurrentAnalysis = () => useAnalysisStore((state) => state.currentAnalysis);
export const useAnalysisType = () => useAnalysisStore((state) => state.analysisType);
export const useUploadedFile = () => useAnalysisStore((state) => state.uploadedFile);
export const useUploadedImageUrl = () => useAnalysisStore((state) => state.uploadedImageUrl);

export const useAnalysisActions = () => {
  const { setAnalysisData, setAnalysisType, setUploadedFile, setUploadedImageUrl, resetAnalysis } = useAnalysisStore();
  
  return {
    setAnalysisData,
    setAnalysisType,
    setUploadedFile,
    setUploadedImageUrl,
    resetAnalysis,
  };
};
