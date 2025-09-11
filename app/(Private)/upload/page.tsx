'use client';

import { useState } from 'react';
import UploadComponent from '@/components/upload/UploadComponent';
import AnalysisResultsView from '@/components/upload/AnalysisResultsView';
import { useCurrentAnalysis, useUploadedFile, useAnalysisActions } from '@/store/analysis.store';

export default function UploadPage() {
  const [showAnalysisResults, setShowAnalysisResults] = useState(false);
  
  // Get data from store
  const currentAnalysis = useCurrentAnalysis();
  const uploadedFile = useUploadedFile();
  const { resetAnalysis } = useAnalysisActions();

  const handleAnalyze = (file: File) => {
    setShowAnalysisResults(true);
  };

  const handleBackToUpload = () => {
    setShowAnalysisResults(false);
    resetAnalysis();
  };

  // Show analysis results if analysis is complete and we have data
  if (showAnalysisResults && currentAnalysis && uploadedFile) {
    return (
      <AnalysisResultsView
        uploadedImage={URL.createObjectURL(uploadedFile)}
        fileName={uploadedFile.name}
        onBack={handleBackToUpload}
      />
    );
  }

  return <UploadComponent onAnalyze={handleAnalyze} />;
}