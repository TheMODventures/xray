'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, AlertTriangle, FileText, CheckCircle } from 'lucide-react';
import { handleDownloadReport } from '@/utils/helper';
import { useCurrentAnalysis, useUploadedImageUrl, useAnalysisType } from '@/store/analysis.store';
import { toast } from 'sonner';
import { ANALYSIS_RECOMMENDATIONS } from '@/utils/constants';
import { Finding } from '@/interfaces/interface';
import { convertAnalysisToFindings } from '@/utils/helper';

interface AnalysisResultsViewProps {
  uploadedImage: string;
  fileName: string;
  onBack: () => void;
}

export default function AnalysisResultsView({ uploadedImage, fileName, onBack }: AnalysisResultsViewProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Get data from store
  const currentAnalysis = useCurrentAnalysis();
  const analysisType = useAnalysisType();
  const storeImageUrl = useUploadedImageUrl();
  
  // Use store image URL if available, otherwise fallback to prop
  const displayImage = storeImageUrl || uploadedImage;

  // Convert API data to simple findings format using helper function
  const findings: Finding[] = convertAnalysisToFindings(currentAnalysis);

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
              {analysisType === 'xray' ? 'X-ray' : 'MRI'} Analysis Results
            </h1>
            <p className="text-black text-[15.562px] leading-[21.418px]">
              AI analysis completed • {totalFindings} findings detected
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
          {/* Left Side - Image */}
          <div className="flex-1 relative">
            <div className="relative rounded-[44px] overflow-hidden bg-gray-100">
              <img
                src={displayImage}
                alt={`${analysisType === 'xray' ? 'X-ray' : 'MRI'} Analysis`}
                className="w-full h-[600px] object-cover"
              />
              {/* MRI-specific: Show bounding boxes if available */}
              {/* {analysisType === 'mri' && findings.length > 0 && (
                <div className="absolute inset-0">
                  {findings.map((finding, index) => {
                    if (!finding.coordinates) return null;
                    const { x, y, width, height } = finding.coordinates;
                    return (
                      <div
                        key={finding.id}
                        className="absolute border-2 border-red-500 bg-red-500/20"
                        style={{
                          left: `${(x / (currentAnalysis as MRIAnalysisResponse)?.image.width) * 100}%`,
                          top: `${(y / (currentAnalysis as MRIAnalysisResponse)?.image.height) * 100}%`,
                          width: `${(width / (currentAnalysis as MRIAnalysisResponse)?.image.width) * 100}%`,
                          height: `${(height / (currentAnalysis as MRIAnalysisResponse)?.image.height) * 100}%`,
                        }}
                      >
                        <div className="absolute -top-6 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          {finding.name} ({finding.confidence}%)
                        </div>
                      </div>
                    );
                  })}
                </div>
              )} */}
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
                      {/* MRI-specific: Show coordinates if available */}
                      {/* {finding.coordinates && (
                        <div className="text-[#6a7282] text-[12px] mt-1">
                          Position: ({finding.coordinates.x}, {finding.coordinates.y}) • 
                          Size: {finding.coordinates.width}×{finding.coordinates.height}
                        </div>
                      )} */}
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
