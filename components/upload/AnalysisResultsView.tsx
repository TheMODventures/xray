'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, AlertTriangle, FileText, CheckCircle } from 'lucide-react';

interface AnalysisResultsViewProps {
  uploadedImage: string;
  fileName: string;
  onBack: () => void;
}

export default function AnalysisResultsView({ uploadedImage, fileName, onBack }: AnalysisResultsViewProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadReport = async () => {
    setIsDownloading(true);
    // TODO: Implement PDF generation and download
    console.log('Downloading PDF report...');
    setTimeout(() => setIsDownloading(false), 2000);
  };

  const findings = [
    {
      id: 1,
      name: 'Tuberculosis artifact',
      location: 'Upper right lobe',
      priority: 'High',
      confidence: 98,
      priorityColor: 'bg-red-100 border-red-200 text-red-800'
    },
    {
      id: 2,
      name: 'Hilar enlargement',
      location: 'Bilateral hilar regions',
      priority: 'Medium',
      confidence: 89,
      priorityColor: 'bg-yellow-100 border-yellow-200 text-yellow-800'
    },
    {
      id: 3,
      name: 'Consolidation',
      location: 'Left lower lobe',
      priority: 'Medium',
      confidence: 94,
      priorityColor: 'bg-yellow-100 border-yellow-200 text-yellow-800'
    }
  ];

  const recommendations = [
    {
      icon: AlertTriangle,
      text: 'Immediate clinical correlation recommended for high priority findings',
      color: 'text-red-600'
    },
    {
      icon: FileText,
      text: 'Consider additional imaging or laboratory tests as clinically indicated',
      color: 'text-blue-600'
    },
    {
      icon: CheckCircle,
      text: 'Follow-up imaging recommended to monitor progression',
      color: 'text-green-600'
    }
  ];

  const totalFindings = findings.length;
  const highPriorityCount = findings.filter(f => f.priority === 'High').length;
  const averageConfidence = Math.round(findings.reduce((acc, f) => acc + f.confidence, 0) / findings.length);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 h-[69px] flex items-center justify-between px-8">
        <div className="flex items-center gap-2">
          <div className="bg-[#155dfc] rounded-[10px] w-8 h-8 flex items-center justify-center">
            <span className="text-white font-bold text-sm">X</span>
          </div>
          <span className="text-[#101828] font-bold text-[19.063px]">Xray</span>
        </div>
        
        <div className="flex items-center gap-8 text-[#4a5565]">
          <a href="#features" className="text-[15.125px] hover:text-gray-700 transition-colors">Features</a>
          <a href="#how-it-works" className="text-[15.125px] hover:text-gray-700 transition-colors">How It Works</a>
          <a href="#testimonials" className="text-[15px] hover:text-gray-700 transition-colors">Testimonials</a>
        </div>
        
        <div className="flex items-center gap-7">
          <button className="text-[#4a5565] text-[13.563px] hover:text-gray-700 transition-colors">Sign In</button>
          <Button className="bg-[#155dfc] hover:bg-[#155dfc]/90 text-white text-[13.016px] px-6 py-2 rounded-[8px]">
            Get Started
          </Button>
        </div>
      </div>

      {/* Main Content */}
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
            </p>
          </div>
          
          <Button
            onClick={handleDownloadReport}
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
                src={uploadedImage}
                alt="X-ray Analysis"
                className="w-full h-[600px] object-cover"
              />
              
              {/* Highlighted Regions with Confidence Scores */}
              <div className="absolute top-[195px] left-[158px] bg-red-100 border-2 border-red-600 rounded-[5.355px] p-2 w-[203px] h-[91px]">
                <div className="bg-red-600 text-white text-[15.562px] px-2 py-1 rounded-[5.355px] w-fit">
                  98%
                </div>
              </div>
              
              <div className="absolute top-[337px] left-[101px] bg-yellow-100 border-2 border-yellow-500 rounded-[5.355px] p-2 w-[226px] h-[110px]">
                <div className="bg-yellow-500 text-white text-[15.562px] px-2 py-1 rounded-[5.355px] w-fit">
                  89%
                </div>
              </div>
              
              <div className="absolute top-[459px] left-[12px] bg-yellow-100 border-2 border-yellow-500 rounded-[5.355px] p-2 w-[169px] h-[73px]">
                <div className="bg-yellow-500 text-white text-[15.562px] px-2 py-1 rounded-[5.355px] w-fit">
                  94%
                </div>
              </div>
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
                {findings.map((finding) => (
                  <div key={finding.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#101828] text-[14px] leading-[24px]">
                        {finding.name}
                      </span>
                      <span className={`px-2 py-1 rounded-[8px] text-[11.25px] leading-[16px] border ${finding.priorityColor}`}>
                        {finding.priority}
                      </span>
                    </div>
                    <p className="text-[#6a7282] text-[14px] leading-[20px]">
                      {finding.location}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-[#4a5565] text-[14px]">Confidence:</span>
                      <span className="text-[#101828] text-[14px] font-medium">{finding.confidence}%</span>
                    </div>
                    {finding.id < findings.length && (
                      <div className="border-t border-gray-200 mt-4"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            {/* Recommendations */}
            <div>
              <h3 className="text-[#101828] text-[15.125px] leading-[24px] font-medium mb-4">
                Recommendations
              </h3>
              
              <div className="space-y-5">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <rec.icon className={`w-4 h-4 mt-0.5 ${rec.color}`} />
                    <p className={`text-[13.016px] leading-[22.75px] ${rec.color}`}>
                      {rec.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
