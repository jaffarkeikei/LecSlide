'use client';

import { useState, useRef, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [subject, setSubject] = useState('');
  
  // Valid file types for upload
  const validFileTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-powerpoint'
  ];
  
  // Handle file drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    if (e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };
  
  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };
  
  // Validate file and set it if valid
  const validateAndSetFile = (file: File) => {
    // Reset error message
    setErrorMessage('');
    
    // Check file type
    if (!validFileTypes.includes(file.type)) {
      setErrorMessage('Please upload a PDF or PowerPoint file.');
      return;
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File size must be less than 10MB.');
      return;
    }
    
    // Set file if validation passes
    setFile(file);
  };
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setErrorMessage('Please select a file to upload.');
      return;
    }
    
    if (!subject.trim()) {
      setErrorMessage('Please enter the subject of the slides.');
      return;
    }
    
    setIsUploading(true);
    setErrorMessage('');
    
    try {
      // In a real implementation, this would upload the file to the server
      // For demonstration purposes, we'll simulate a successful upload after a delay
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demonstration, we'll simulate a successful upload
      setSuccessMessage('Upload successful! Processing your slides...');
      
      // Redirect to the results page after a brief delay to show the success message
      setTimeout(() => {
        // In a real app, this would redirect to a specific session ID
        router.push('/results/demo-session-123');
      }, 1500);
    } catch (error) {
      console.error('Upload error:', error);
      setErrorMessage('An error occurred during upload. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
  // Remove the selected file
  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="text-indigo-600 hover:text-indigo-700 font-bold text-xl"
          >
            LecSlide
          </Link>
          <div>
            <Link 
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Upload Lecture Slides</h1>
          
          {errorMessage && (
            <ErrorMessage
              message={errorMessage}
              dismissible={true}
              onDismiss={() => setErrorMessage('')}
              className="mb-6"
            />
          )}
          
          {successMessage && (
            <SuccessMessage
              message={successMessage}
              dismissible={false}
              className="mb-6"
            />
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="e.g., Computer Science, Biology, Psychology"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={isUploading || !!successMessage}
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                This helps our AI better understand your slides.
              </p>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slide Deck
              </label>
              
              {!file ? (
                <div 
                  className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept=".pdf,.ppt,.pptx"
                          onChange={handleFileChange}
                          ref={fileInputRef}
                          disabled={isUploading || !!successMessage}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF or PowerPoint up to 10MB
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-1 flex items-center p-4 border border-gray-300 rounded-md">
                  <div className="flex-shrink-0">
                    <DocumentIcon className="h-8 w-8 text-indigo-500" />
                  </div>
                  <div className="ml-3 flex-1 truncate">
                    <div className="text-sm font-medium text-gray-900">{file.name}</div>
                    <div className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={handleRemoveFile}
                      disabled={isUploading || !!successMessage}
                    >
                      <span className="sr-only">Remove file</span>
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                disabled={!file || isUploading || !!successMessage}
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  'Upload & Process'
                )}
              </button>
            </div>
          </form>
        </div>
        
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">What happens next?</h2>
          <p className="text-gray-600 mb-4">
            After you upload your slides, our AI will:
          </p>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>Extract text and visual elements from each slide</li>
            <li>Generate concise summaries of the content</li>
            <li>Create concept maps to visualize relationships</li>
            <li>Develop practice questions to test your understanding</li>
            <li>Format everything into a comprehensive study resource</li>
          </ul>
          <p className="mt-4 text-gray-600">
            This process typically takes 1-2 minutes, depending on the size of your slide deck.
          </p>
        </div>
      </main>
    </div>
  );
}