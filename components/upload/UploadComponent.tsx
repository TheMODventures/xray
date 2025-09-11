'use client';

import { useState, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { Upload, FileImage, CheckCircle, ArrowLeft, X, Loader2 } from 'lucide-react';
import { useUpload } from '@/hooks/useUpload';
import Link from 'next/link';
import { uploadValidationSchema, UploadFormData } from '@/lib/validation/upload.validation';
import { formatFileSize, getFileType } from '@/utils/helper';
import { AnalysisMutation } from '@/services/mutation/analysis.mutation';
import { useAnalysisActions } from '@/store/analysis.store';
import { toast } from 'sonner';

interface UploadComponentProps {
  onAnalyze: (file: File) => void;
}

export default function UploadComponent({ onAnalyze }: UploadComponentProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isReadyForAnalysis, setIsReadyForAnalysis] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isUploading, progress, error, success, uploadFile, resetUpload } = useUpload();
  
  // Analysis state and actions
  const { setAnalysisData, setUploadedFile, setUploadedImageUrl } = useAnalysisActions();
  
  // Analysis mutation
  const detectDiseaseMutation = AnalysisMutation.useDetectDisease();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<UploadFormData>({
    resolver: yupResolver(uploadValidationSchema),
    mode: 'onChange',
  });

  const selectedFile = watch('file');

  const handleFileSelect = useCallback((file: File) => {
    setValue('file', file, { shouldValidate: true });
    uploadFile(file);
    
    // Store file and create image URL for preview
    setUploadedFile(file);
    setUploadedImageUrl(URL.createObjectURL(file));
    
    // Simulate processing time and then show ready state
    setTimeout(() => {
      setIsReadyForAnalysis(true);
    }, 2000);
  }, [setValue, uploadFile, setUploadedFile, setUploadedImageUrl]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = async () => {
    try {
      // Call the analysis API
      const result = await detectDiseaseMutation.mutateAsync({
        file: selectedFile,
        threshold: 0.6, // Default threshold
      });
      
      // Store the analysis results
      setAnalysisData(result);
      
      // Show success message
      toast.success('Analysis completed successfully!');
      
      // Navigate to results view
      onAnalyze(selectedFile);
      
    } catch (error) {
      console.error('Analysis failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Analysis failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  const handleRemoveFile = () => {
    // Reset all upload states
    resetUpload();
    setIsReadyForAnalysis(false);
    reset();
    
    // Clear analysis data
    setUploadedFile(null);
    setUploadedImageUrl(null);
    
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = (data: UploadFormData) => {
    console.log('Form submitted with data:', data);
    // File is already handled in handleFileSelect
  };


  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-69px)] p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[787px]">
        {isReadyForAnalysis ? (
          /* Post-Upload UI */
          <div className="bg-white rounded-[14px] border border-gray-200 shadow-lg p-6">
            {/* Title and Description */}
            <div className="text-center mb-8">
              <h1 className="text-[#101828] font-normal text-[18.906px] leading-[28px] mb-3">
                X-ray Ready for Analysis
              </h1>
              <p className="text-[#4a5565] text-[13.016px] leading-[20px]">
                Review your file details below and click analyze to begin processing.
              </p>
            </div>

            {/* File Details Card */}
            <div className="bg-gray-50 rounded-[10px] p-4 mb-6">
              <div className="flex items-start gap-4">
                {/* File Preview */}
                <div className="w-16 h-16 bg-gray-200 rounded-[8px] flex items-center justify-center flex-shrink-0">
                  {selectedFile && (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="X-ray preview"
                      className="w-full h-full object-cover rounded-[8px]"
                    />
                  )}
                </div>
                
                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#101828] text-[15.625px] leading-[24px] font-medium truncate">
                    {selectedFile?.name || 'Xray_share.jpg'}
                  </h3>
                  <p className="text-[#6a7282] text-[13.344px] leading-[20px]">
                    {selectedFile ? formatFileSize(selectedFile.size) : '455.32 KB'} • {selectedFile ? getFileType(selectedFile) : 'JPEG'}
                  </p>
                  <p className="text-[#99a1af] text-[11.625px] leading-[16px]">
                    Uploaded {new Date().toLocaleTimeString()}
                  </p>
                </div>
                
                {/* Remove File Button */}
                <button 
                  onClick={handleRemoveFile}
                  className="p-1 hover:bg-red-100 rounded transition-colors cursor-pointer"
                  title="Remove file"
                >
                  <X className="w-4 h-4 text-red-500 hover:text-red-700" />
                </button>
              </div>
            </div>

            {/* Analyze Button */}
            <Button
              onClick={handleAnalyze}
              disabled={detectDiseaseMutation.isPending}
              className="w-full bg-[#155dfc] hover:bg-[#155dfc]/90 text-white text-[13.125px] py-3 rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {detectDiseaseMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing X-ray...
                </>
              ) : (
                'Analyze X-ray'
              )}
            </Button>
          </div>
        ) : (
          /* Upload UI */
          <>
            {/* Title and Description */}
            <div className="text-center mb-12">
              <h1 className="text-[#101828] font-bold text-[23.063px] leading-[32px] mb-3">
                Upload Chest X-ray
              </h1>
              <p className="text-[#4a5565] text-[14.875px] leading-[24px]">
                Upload your X-ray image to begin AI-powered analysis
              </p>
            </div>

            {/* Upload Area */}
            <div 
              className={`
                relative bg-gray-50 h-[292px] rounded-[14px] border-2 border-dashed transition-colors
                ${isDragOver ? 'border-[#155dfc] bg-blue-50' : 'border-[#d1d5dc]'}
                ${isUploading ? 'pointer-events-none cursor-not-allowed' : 'cursor-pointer'}
              `}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={handleChooseFile}
            >
              <input
                {...register('file')}
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/dicom"
                onChange={handleFileInputChange}
                className="hidden"
                disabled={isUploading}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                {/* Upload Icon */}
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center">
                  {isUploading ? (
                    <div className="w-6 h-6 border-2 border-[#155dfc] border-t-transparent rounded-full animate-spin" />
                  ) : success ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <Upload className="w-6 h-6 text-[#155dfc]" />
                  )}
                </div>

                {/* Text Content */}
                <div className="text-center space-y-2">
                  {isUploading ? (
                    <>
                      <p className="text-[#101828] text-[16.875px] leading-[28px] font-medium">
                        Uploading... {progress}%
                      </p>
                      <p className="text-[#6a7282] text-[14.625px] leading-[24px]">
                        Please wait while we process your image
                      </p>
                    </>
                  ) : success ? (
                    <>
                      <p className="text-[#101828] text-[16.875px] leading-[28px] font-medium">
                        Upload Complete!
                      </p>
                      <p className="text-[#6a7282] text-[14.625px] leading-[24px]">
                        Your X-ray has been successfully uploaded
                      </p>
                    </>
                  ) : error ? (
                    <>
                      <p className="text-red-600 text-[16.875px] leading-[28px] font-medium">
                        Upload Failed
                      </p>
                      <p className="text-red-500 text-[14.625px] leading-[24px]">
                        {error}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-[#101828] text-[16.875px] leading-[28px] font-medium">
                        Drop your X-ray here
                      </p>
                      <p className="text-[#6a7282] text-[14.625px] leading-[24px]">
                        or click to browse files
                      </p>
                    </>
                  )}
                </div>

                {/* Choose File Button */}
                {!isUploading && !success && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChooseFile();
                    }}
                    variant="outline"
                    className="bg-white border border-gray-300 text-[#101828] hover:bg-gray-50 text-[13.453px] px-6 py-2 rounded-[8px]"
                  >
                    Choose File
                  </Button>
                )}

                {/* Progress Bar */}
                {isUploading && (
                  <div className="w-full max-w-[200px]">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#155dfc] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* File Info */}
            {selectedFile && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileImage className="w-5 h-5 text-[#155dfc]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#101828] truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-[#6a7282]">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  {success && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </div>
            )}

            {/* Format Info */}
            <p className="text-[#6a7282] text-[13.234px] leading-[20px] text-center mt-6">
              Accepted formats: JPG, PNG, DICOM • Max size: 10MB
            </p>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-8">
              <Link href="/">
                <Button
                  variant="outline"
                  className="text-[#4a5565] border-gray-300 hover:bg-gray-50 flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>

              {success && (
                <Button
                  onClick={() => setIsReadyForAnalysis(true)}
                  className="bg-[#155dfc] hover:bg-[#155dfc]/90 text-white"
                >
                  Continue to Analysis
                </Button>
              )}
            </div>
          </>
        )}
        
        {/* Error Display */}
        {errors.file && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{errors.file.message}</p>
          </div>
        )}
        
        {/* Analysis Error Display */}
        {detectDiseaseMutation.isError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">
              {detectDiseaseMutation.error?.message || 'Analysis failed. Please try again.'}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
