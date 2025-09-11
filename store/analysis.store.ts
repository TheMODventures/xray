import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AnalysisResponse, DetectedDiseases } from '../services/interface/analysis/analysis.interface';

interface AnalysisState {
  // Current analysis data
  currentAnalysis: AnalysisResponse | null;
  
  // File info
  uploadedFile: File | null;
  uploadedImageUrl: string | null;
  
  // Actions
  setAnalysisData: (data: AnalysisResponse) => void;
  setUploadedFile: (file: File | null) => void;
  setUploadedImageUrl: (url: string | null) => void;
  resetAnalysis: () => void;
}

export const useAnalysisStore = create<AnalysisState>()(
  persist(
    (set) => ({
      // Initial state
      currentAnalysis: null,
      uploadedFile: null,
      uploadedImageUrl: null,

      // Actions
      setAnalysisData: (data: AnalysisResponse) => {
        set({ currentAnalysis: data });
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
        uploadedFile: state.uploadedFile,
        uploadedImageUrl: state.uploadedImageUrl,
      }),
    }
  )
);

// Selector hooks for better performance
export const useCurrentAnalysis = () => useAnalysisStore((state) => state.currentAnalysis);
export const useUploadedFile = () => useAnalysisStore((state) => state.uploadedFile);
export const useUploadedImageUrl = () => useAnalysisStore((state) => state.uploadedImageUrl);

export const useAnalysisActions = () => {
  const { setAnalysisData, setUploadedFile, setUploadedImageUrl, resetAnalysis } = useAnalysisStore();
  
  return {
    setAnalysisData,
    setUploadedFile,
    setUploadedImageUrl,
    resetAnalysis,
  };
};
