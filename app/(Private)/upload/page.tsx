'use client';

import { useState } from 'react';
import UploadComponent from '@/components/upload/UploadComponent';
import AnalysisResultsView from '@/components/upload/AnalysisResultsView';

export default function UploadPage() {
  const [showAnalysisResults, setShowAnalysisResults] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleAnalyze = (file: File) => {
    setUploadedFile(file);
    setShowAnalysisResults(true);
  };

  const handleBackToUpload = () => {
    setShowAnalysisResults(false);
    setUploadedFile(null);
  };

  // Show analysis results if analysis is complete
  if (showAnalysisResults && uploadedFile) {
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