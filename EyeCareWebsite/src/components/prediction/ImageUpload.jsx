// src/components/prediction/ImageUpload.jsx
import React, { useState, useRef } from 'react';
import { predictionAPI } from '../../services/api';
import { Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';

const ImageUpload = ({ onPredictionComplete }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/bmp', 'image/tiff'];

  const handleFileSelect = (file) => {
    setError('');
    
    if (!allowedTypes.includes(file.type)) {
      setError('Please select a valid image file (PNG, JPG, JPEG, BMP, TIFF)');
      return;
    }

    if (file.size > 16 * 1024 * 1024) {
      setError('File size must be less than 16MB');
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await predictionAPI.predict(formData);
      onPredictionComplete(response.data);
      
      // Cleanup
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setSelectedFile(null);
      setPreviewUrl('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError(error.response?.data?.message || 'Failed to process image');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Retinal Image</h2>
        <p className="text-gray-600">
          Upload a retinal image to detect diabetic retinopathy. Supported formats: PNG, JPG, JPEG, BMP, TIFF
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          selectedFile 
            ? 'border-blue-300 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        {previewUrl ? (
          <div className="space-y-4">
            <div className="max-w-md mx-auto">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-64 mx-auto rounded-lg shadow-sm"
              />
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={removeImage}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Remove Image
              </button>
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isUploading ? 'Processing...' : 'Analyze Image'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-blue-100 rounded-full">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                Drop your retinal image here
              </p>
              <p className="text-gray-600 mt-1">
                or click to browse files
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileInput}
              accept=".png,.jpg,.jpeg,.bmp,.tiff,.tif"
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
            >
              Select Image
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;