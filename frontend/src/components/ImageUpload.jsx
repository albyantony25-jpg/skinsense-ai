import React, { useState, useRef } from 'react';
import { UploadCloud, FileImage, Trash2, ShieldAlert } from 'lucide-react';

export default function ImageUpload({
  selectedFile,
  previewUrl,
  onFileSelect,
  onRemove,
  onAnalyze,
  isLoading
}) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  const handleFile = (file) => {
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      setError('Unsupported file type. Please upload a JPG, PNG, or WEBP image.');
      return;
    }

    setError('');
    onFileSelect(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-bold text-slate-800">Scan Skin Condition</h2>
        <p className="text-sm text-slate-500">
          Upload a clear, well-lit close-up image of the affected skin area for analysis.
        </p>
      </div>

      {error && (
        <div className="flex items-center space-x-2 bg-red-50 text-red-700 border border-red-100 rounded-lg p-3 text-sm animate-fade-in">
          <ShieldAlert className="h-5 w-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Upload Zone */}
      {!previewUrl ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
          className={`relative group flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all duration-300 ${
            isDragActive
              ? 'border-primary bg-primary/5 scale-[0.99]'
              : 'border-slate-200 hover:border-primary hover:bg-slate-50/50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleChange}
          />
          <div className="p-4 bg-slate-50 rounded-full text-slate-400 group-hover:text-primary group-hover:bg-primary-bg transition-colors duration-300">
            <UploadCloud className="h-10 w-10" />
          </div>
          <p className="mt-4 text-sm font-semibold text-slate-700">
            Drag and drop your image here, or{' '}
            <span className="text-primary group-hover:underline">browse</span>
          </p>
          <p className="mt-1.5 text-xs text-slate-400">
            Supports JPG, PNG, WEBP (Max 10MB)
          </p>
        </div>
      ) : (
        /* Image Preview State */
        <div className="space-y-4 animate-fade-in">
          <div className="relative rounded-xl border border-slate-100 overflow-hidden bg-slate-50 max-h-80 flex items-center justify-center">
            <img
              src={previewUrl}
              alt="Skin area preview"
              className="max-h-80 w-auto object-contain transition-all duration-500 hover:scale-[1.02]"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="p-2 bg-white rounded-lg border border-slate-100 text-primary">
                <FileImage className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-700 truncate">
                  {selectedFile?.name}
                </p>
                <p className="text-xs text-slate-400">
                  {selectedFile ? formatBytes(selectedFile.size) : ''}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onRemove}
              disabled={isLoading}
              className="flex items-center justify-center p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
              title="Remove image"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Action Button */}
      <button
        type="button"
        onClick={onAnalyze}
        disabled={!selectedFile || isLoading}
        className={`w-full py-3.5 px-4 rounded-xl font-semibold shadow-sm transition-all duration-300 flex items-center justify-center space-x-2 ${
          !selectedFile
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : isLoading
            ? 'bg-primary/80 text-white cursor-wait'
            : 'bg-primary hover:bg-primary-dark text-white active:scale-[0.98]'
        }`}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Analyzing...</span>
          </>
        ) : (
          <span>Analyze skin</span>
        )}
      </button>
    </div>
  );
}
