"use client"

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface FileUploaderProps {
  file: File | null
  onChange: (file: File | null) => void
  disabled?: boolean
  acceptedFileTypes?: string[]
  maxSize?: number
}

export default function FileUploader({
  file,
  onChange,
  disabled = false,
  acceptedFileTypes = ['.pdf', '.ppt', '.pptx'],
  maxSize = 20 * 1024 * 1024, // 20MB
}: FileUploaderProps) {
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onChange(acceptedFiles[0])
    }
  }, [onChange])

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
    },
    maxSize,
    disabled,
    multiple: false,
  })

  const removeFile = () => {
    onChange(null)
  }

  return (
    <div className="w-full">
      {!file ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 transition-colors
            ${isDragActive ? 'border-primary-400 bg-primary-50' : 'border-gray-300'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary-400 hover:bg-primary-50'}`}
        >
          <input {...getInputProps()} />
          <div className="text-center">
            <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm font-semibold text-gray-900">
              {isDragActive ? "Drop your file here" : "Drag and drop your file"}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              or <span className="text-primary-600 font-medium">browse</span> to upload
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Supported formats: PDF, PPT, PPTX (max {maxSize / (1024 * 1024)}MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center">
            <DocumentIcon className="h-10 w-10 text-primary-600 flex-shrink-0" />
            <div className="ml-4 flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / (1024 * 1024)).toFixed(2)} MB · {file.type || 'unknown type'}
              </p>
            </div>
            <button
              type="button"
              onClick={removeFile}
              disabled={disabled}
              className={`ml-4 text-gray-400 hover:text-gray-600 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
      
      {fileRejections.length > 0 && (
        <div className="mt-2 text-sm text-red-600">
          {fileRejections[0].errors.map((error, index) => (
            <p key={index}>
              {error.code === 'file-too-large'
                ? `File is too large. Max size is ${maxSize / (1024 * 1024)}MB.`
                : error.code === 'file-invalid-type'
                ? 'Invalid file type. Please upload a PDF or PowerPoint file.'
                : error.message}
            </p>
          ))}
        </div>
      )}
    </div>
  )
} 