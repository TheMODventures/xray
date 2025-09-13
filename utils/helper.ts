import { setCookie } from "cookies-next/client";

export const getAccessToken = () => {
  const accessToken = localStorage.getItem("access-token");
  return accessToken;
};

export const setAccessToken = (token: string) => {
  localStorage.setItem("access-token", token);
  setCookie("access-token", token);
};

export const removeAccessToken = () => {
  localStorage.removeItem("access-token");
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileType = (file: File): string => {
  const type = file.type.split('/')[1]?.toUpperCase();
  return type || 'FILE';
};

import { ANALYSIS_RECOMMENDATIONS, PRIORITY_COLORS, PDF_CONFIG, PRIORITY_THRESHOLDS } from './constants';
import { AnalysisResponse, MRIAnalysisResponse } from '../services/interface/analysis/analysis.interface';
import { Finding } from '../interfaces/interface';

// Report generation functions
export const generatePDFReport = async (data: any): Promise<Blob> => {
  const { jsPDF } = await import('jspdf');
  
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = PDF_CONFIG.PAGE_MARGIN;

  // Helper function to add text with word wrapping
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = PDF_CONFIG.BODY_FONT_SIZE) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + (lines.length * fontSize * 0.4) + PDF_CONFIG.LINE_SPACING;
  };

  // Helper function to add a new page if needed
  const checkNewPage = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - PDF_CONFIG.PAGE_MARGIN) {
      doc.addPage();
      yPosition = PDF_CONFIG.PAGE_MARGIN;
    }
  };

  // Title
  doc.setFontSize(PDF_CONFIG.TITLE_FONT_SIZE);
  doc.setFont('helvetica', 'bold');
  doc.text('X-ray Analysis Report', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // Date and time
  doc.setFontSize(PDF_CONFIG.BODY_FONT_SIZE);
  doc.setFont('helvetica', 'normal');
  const currentDate = new Date().toLocaleString();
  doc.text(`Generated on: ${currentDate}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 20;

  // Patient/File Information
  doc.setFontSize(PDF_CONFIG.HEADING_FONT_SIZE);
  doc.setFont('helvetica', 'bold');
  doc.text('File Information', PDF_CONFIG.PAGE_MARGIN, yPosition);
  yPosition += 10;

  doc.setFontSize(PDF_CONFIG.BODY_FONT_SIZE);
  doc.setFont('helvetica', 'normal');
  yPosition = addText(`File Name: ${data.fileName || 'N/A'}`, 20, yPosition, pageWidth - 40);
  yPosition = addText(`Analysis Date: ${currentDate}`, 20, yPosition, pageWidth - 40);
  yPosition += 10;

  // Analysis Summary
  checkNewPage(50);
  doc.setFontSize(PDF_CONFIG.HEADING_FONT_SIZE);
  doc.setFont('helvetica', 'bold');
  doc.text('Analysis Summary', PDF_CONFIG.PAGE_MARGIN, yPosition);
  yPosition += 10;

  doc.setFontSize(PDF_CONFIG.BODY_FONT_SIZE);
  doc.setFont('helvetica', 'normal');
  yPosition = addText(`Total Findings: ${data.totalFindings || 0}`, 20, yPosition, pageWidth - 40);
  yPosition = addText(`High Priority Findings: ${data.highPriorityCount || 0}`, 20, yPosition, pageWidth - 40);
  yPosition = addText(`Average Confidence: ${data.averageConfidence || 0}%`, 20, yPosition, pageWidth - 40);
  
  // Add model information if available
  if (data.analysisData?.model_used) {
    yPosition = addText(`AI Model Used: ${data.analysisData.model_used}`, 20, yPosition, pageWidth - 40);
  }
  if (data.analysisData?.threshold) {
    yPosition = addText(`Detection Threshold: ${data.analysisData.threshold}`, 20, yPosition, pageWidth - 40);
  }
  yPosition += 15;

  // Detailed Findings
  if (data.findings && data.findings.length > 0) {
    checkNewPage(100);
    doc.setFontSize(PDF_CONFIG.HEADING_FONT_SIZE);
    doc.setFont('helvetica', 'bold');
    doc.text('Detailed Findings', PDF_CONFIG.PAGE_MARGIN, yPosition);
    yPosition += 10;

    data.findings.forEach((finding: any, index: number) => {
      checkNewPage(30);
      
      // Finding name and priority
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      yPosition = addText(`${index + 1}. ${finding.name}`, 20, yPosition, pageWidth - 40);
      
      // Priority badge
      doc.setFontSize(PDF_CONFIG.BODY_FONT_SIZE);
      doc.setFont('helvetica', 'normal');
      const priorityColor = finding.priority === 'High' ? PRIORITY_COLORS.HIGH : 
                           finding.priority === 'Medium' ? PRIORITY_COLORS.MEDIUM : PRIORITY_COLORS.LOW;
      doc.setTextColor(priorityColor);
      yPosition = addText(`Priority: ${finding.priority}`, 20, yPosition, pageWidth - 40);
      
      // Confidence score
      doc.setTextColor(0, 0, 0); // Reset to black
      yPosition = addText(`Confidence: ${finding.confidence}%`, 20, yPosition, pageWidth - 40);
      
      yPosition += 5;
      
      // Add separator line
      doc.setLineWidth(0.5);
      doc.line(PDF_CONFIG.PAGE_MARGIN, yPosition, pageWidth - PDF_CONFIG.PAGE_MARGIN, yPosition);
      yPosition += 10;
    });
  } else {
    checkNewPage(20);
    doc.setFontSize(PDF_CONFIG.BODY_FONT_SIZE);
    doc.setFont('helvetica', 'normal');
    yPosition = addText('No findings detected in this analysis.', 20, yPosition, pageWidth - 40);
  }

  // Recommendations
  checkNewPage(60);
  doc.setFontSize(PDF_CONFIG.HEADING_FONT_SIZE);
  doc.setFont('helvetica', 'bold');
  doc.text('Recommendations', PDF_CONFIG.PAGE_MARGIN, yPosition);
  yPosition += 10;

  doc.setFontSize(PDF_CONFIG.BODY_FONT_SIZE);
  doc.setFont('helvetica', 'normal');
  ANALYSIS_RECOMMENDATIONS.forEach((rec, index) => {
    checkNewPage(15);
    yPosition = addText(`• ${rec}`, 20, yPosition, pageWidth - 40);
  });

  // Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(PDF_CONFIG.FOOTER_FONT_SIZE);
    doc.setFont('helvetica', 'normal');
    doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    doc.text('Generated by ChestAI Analysis System', pageWidth / 2, pageHeight - 5, { align: 'center' });
  }

  // Convert to blob
  const pdfBlob = doc.output('blob');
  return pdfBlob;
};

export const downloadFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const handleDownloadReport = async (
  data: any,
  filename: string = 'xray-analysis-report.pdf',
  setIsDownloading?: (loading: boolean) => void
): Promise<void> => {
  try {
    setIsDownloading?.(true);
    const blob = await generatePDFReport(data);
    downloadFile(blob, filename);
  } catch (error) {
    console.error('Error generating report:', error);
    throw new Error('Failed to generate PDF report. Please try again.');
  } finally {
    setIsDownloading?.(false);
  }
};

// Analysis helper functions
export const isXrayAnalysis = (data: any): data is AnalysisResponse => {
  return data && 'detected_diseases' in data;
};

export const isMRIAnalysis = (data: any): data is MRIAnalysisResponse => {
  return data && 'predictions' in data;
};

export const convertAnalysisToFindings = (currentAnalysis: AnalysisResponse | MRIAnalysisResponse | null): Finding[] => {
  if (!currentAnalysis) return [];

  if (isXrayAnalysis(currentAnalysis)) {
    // X-ray analysis findings
    return Object.entries(currentAnalysis.detected_diseases).map(([name, confidence]) => ({
      id: name,
      name: name.replace(/_/g, ' '),
      confidence: Math.round(confidence * 100),
      priority: confidence >= PRIORITY_THRESHOLDS.HIGH ? 'High' : 
                confidence >= PRIORITY_THRESHOLDS.MEDIUM ? 'Medium' : 'Low',
      priorityColor: confidence >= PRIORITY_THRESHOLDS.HIGH ? 'bg-red-100 border-red-200 text-red-800' : 
                     confidence >= PRIORITY_THRESHOLDS.MEDIUM ? 'bg-yellow-100 border-yellow-200 text-yellow-800' : 
                     'bg-green-100 border-green-200 text-green-800'
    })).sort((a, b) => b.confidence - a.confidence);
  } else {
    // MRI analysis findings
    return currentAnalysis.predictions.map((prediction) => ({
      id: prediction.detection_id,
      name: prediction.class,
      confidence: Math.round(prediction.confidence * 100),
      priority: prediction.confidence >= PRIORITY_THRESHOLDS.HIGH ? 'High' : 
                prediction.confidence >= PRIORITY_THRESHOLDS.MEDIUM ? 'Medium' : 'Low',
      priorityColor: prediction.confidence >= PRIORITY_THRESHOLDS.HIGH ? 'bg-red-100 border-red-200 text-red-800' : 
                     prediction.confidence >= PRIORITY_THRESHOLDS.MEDIUM ? 'bg-yellow-100 border-yellow-200 text-yellow-800' : 
                     'bg-green-100 border-green-200 text-green-800',
      // Additional MRI-specific data
      coordinates: {
        x: prediction.x,
        y: prediction.y,
        width: prediction.width,
        height: prediction.height
      }
    })).sort((a, b) => b.confidence - a.confidence);
  }
};

