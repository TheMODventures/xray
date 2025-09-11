'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, AlertTriangle, FileText, CheckCircle } from 'lucide-react';
import { handleDownloadReport } from '@/utils/helper';
import { useCurrentAnalysis, useUploadedImageUrl } from '@/store/analysis.store';
import { toast } from 'sonner';
import { ANALYSIS_RECOMMENDATIONS, PRIORITY_THRESHOLDS } from '@/utils/constants';

interface AnalysisResultsViewProps {
  uploadedImage: string;
  fileName: string;
  onBack: () => void;
}

export default function AnalysisResultsView({ uploadedImage, fileName, onBack }: AnalysisResultsViewProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Get data from store
  const currentAnalysis = useCurrentAnalysis();
  const storeImageUrl = useUploadedImageUrl();
  
  // Use store image URL if available, otherwise fallback to prop
  const displayImage = storeImageUrl || uploadedImage;

  // Convert API data to simple findings format
  const findings = currentAnalysis ? Object.entries(currentAnalysis.detected_diseases).map(([name, confidence]) => ({
    id: name,
    name: name.replace(/_/g, ' '),
    confidence: Math.round(confidence * 100),
    priority: confidence >= PRIORITY_THRESHOLDS.HIGH ? 'High' : 
              confidence >= PRIORITY_THRESHOLDS.MEDIUM ? 'Medium' : 'Low',
    priorityColor: confidence >= PRIORITY_THRESHOLDS.HIGH ? 'bg-red-100 border-red-200 text-red-800' : 
                   confidence >= PRIORITY_THRESHOLDS.MEDIUM ? 'bg-yellow-100 border-yellow-200 text-yellow-800' : 
                   'bg-green-100 border-green-200 text-green-800'
  })).sort((a, b) => b.confidence - a.confidence) : [];

  const totalFindings = findings.length;
  const highPriorityCount = findings.filter(f => f.priority === 'High').length;
  const averageConfidence = findings.length > 0 
    ? Math.round(findings.reduce((acc, f) => acc + f.confidence, 0) / findings.length)
    : 0;

  const onDownloadReport = async () => {
    try {
      const reportData = {
        findings,
        totalFindings,
        highPriorityCount,
        averageConfidence,
        fileName,
        uploadedImage: displayImage,
        analysisData: currentAnalysis
      };
      
      await handleDownloadReport(reportData, `${fileName}-analysis-report.pdf`, setIsDownloading);
      toast.success('Report downloaded successfully!');
    } catch (error) {
      console.error('Error downloading report:', error);
      toast.error('Failed to download report. Please try again.');
    }
  };

  // Simple recommendations
  const recommendations = ANALYSIS_RECOMMENDATIONS.map((text, index) => ({
    icon: index === 0 ? AlertTriangle : index === 1 ? FileText : CheckCircle,
    text,
    color: index === 0 ? 'text-red-600' : index === 1 ? 'text-blue-600' : 'text-green-600'
  }));

  return (
    <div className="px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button 
            onClick={onBack}
            variant="outline" 
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Upload
          </Button>
        </div>

        {/* Title Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[#101828] font-bold text-[21px] leading-[28px] mb-1">
              X-ray Analysis Results
            </h1>
            <p className="text-black text-[15.562px] leading-[21.418px]">
              AI analysis completed • {totalFindings} findings detected
              {currentAnalysis && (
                <span className="block text-sm text-gray-600 mt-1">
                  Model: {currentAnalysis.model_used} • Threshold: {currentAnalysis.threshold}
                </span>
              )}
            </p>
          </div>
          
          <Button
            onClick={onDownloadReport}
            disabled={isDownloading}
            className="bg-[#1e2939] hover:bg-[#1e2939]/90 text-white text-[13.344px] px-6 py-2 rounded-[8px] flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {isDownloading ? 'Generating...' : 'Download Report (PDF)'}
          </Button>
        </div>

        {/* Analysis Content */}
        <div className="flex gap-8">
          {/* Left Side - X-ray Image */}
          <div className="flex-1 relative">
            <div className="relative rounded-[44px] overflow-hidden bg-gray-100">
              <img
                src={displayImage}
                alt="X-ray Analysis"
                className="w-full h-[600px] object-cover"
              />
            </div>
          </div>

          {/* Right Side - Analysis Summary */}
          <div className="w-[416px] bg-white border border-gray-200 rounded-[10px] p-6 shadow-sm">
            {/* Analysis Summary Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#101828] text-[16px] leading-[24px] font-medium">
                AI Analysis Summary
              </h2>
              <span className="text-[#6a7282] text-[14px] leading-[20px]">
                Completed
              </span>
            </div>

            {/* Summary Stats */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-[#4a5565] text-[14px]">Total Findings:</span>
                <span className="text-[#101828] text-[14px] font-medium">{totalFindings}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#4a5565] text-[14px]">High Priority:</span>
                <span className="text-red-600 text-[14px] font-medium">{highPriorityCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#4a5565] text-[14px]">Average Confidence:</span>
                <span className="text-[#101828] text-[14px] font-medium">{averageConfidence}%</span>
              </div>
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            {/* Detected Findings */}
            <div className="mb-6">
              <h3 className="text-[#101828] text-[14px] leading-[24px] font-medium mb-4">
                Detected Findings
              </h3>
              
              <div className="space-y-4">
                {findings.length > 0 ? (
                  findings.map((finding, index) => (
                    <div key={finding.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[#101828] text-[14px] leading-[24px]">
                          {finding.name}
                        </span>
                        <span className={`px-2 py-1 rounded-[8px] text-[11.25px] leading-[16px] border ${finding.priorityColor}`}>
                          {finding.priority}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#4a5565] text-[14px]">Confidence:</span>
                        <span className="text-[#101828] text-[14px] font-medium">{finding.confidence}%</span>
                      </div>
                      {index < findings.length - 1 && (
                        <div className="border-t border-gray-200 mt-4"></div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-sm">No findings detected</p>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            {/* Recommendations */}
            <div>
              <h3 className="text-[#101828] text-[15.125px] leading-[24px] font-medium mb-4">
                Recommendations
              </h3>
              
              <div className="space-y-5">
                {recommendations.length > 0 ? (
                  recommendations.map((rec, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <rec.icon className={`w-4 h-4 flex-shrink-0 ${rec.color}`} />
                      <p className={`text-[13.016px] leading-[22.75px] ${rec.color}`}>
                        {rec.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 text-sm">No specific recommendations at this time</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
