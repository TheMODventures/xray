import * as yup from 'yup';

export const uploadValidationSchema = yup.object({
  file: yup
    .mixed<File>()
    .required('Please select a file to upload')
    .test('fileType', 'Only JPEG, PNG, and DICOM files are allowed', (value) => {
      if (!value) return false;
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/dicom'];
      return allowedTypes.includes(value.type);
    })
    .test('fileSize', 'File size must be less than 10MB', (value) => {
      if (!value) return false;
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      return value.size <= maxSize;
    })
    .test('fileName', 'File name must not be empty', (value) => {
      if (!value) return false;
      return value.name.trim().length > 0;
    }),
});

export type UploadFormData = yup.InferType<typeof uploadValidationSchema>;
