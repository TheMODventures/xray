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

// Report generation functions
export const generatePDFReport = async (data: any): Promise<Blob> => {
  // TODO: Implement actual PDF generation logic
  // This is a placeholder that simulates PDF generation
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create a simple text blob as placeholder
      const content = `X-ray Analysis Report\n\nFindings: ${data.findings?.length || 0}\nHigh Priority: ${data.highPriorityCount || 0}\nAverage Confidence: ${data.averageConfidence || 0}%`;
      const blob = new Blob([content], { type: 'application/pdf' });
      resolve(blob);
    }, 2000);
  });
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
    // TODO: Add proper error handling/notification
  } finally {
    setIsDownloading?.(false);
  }
};

