import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FileUploader from '@/components/FileUploader'

// Mock react-dropzone
jest.mock('react-dropzone', () => ({
  useDropzone: () => ({
    getRootProps: () => ({
      onClick: jest.fn(),
    }),
    getInputProps: () => ({}),
    isDragActive: false,
    fileRejections: [],
  }),
}))

describe('FileUploader', () => {
  const mockOnChange = jest.fn()
  
  beforeEach(() => {
    jest.clearAllMocks()
  })
  
  it('renders the upload area when no file is selected', () => {
    render(<FileUploader file={null} onChange={mockOnChange} />)
    
    expect(screen.getByText(/Drag and drop your file/i)).toBeInTheDocument()
    expect(screen.getByText(/Supported formats/i)).toBeInTheDocument()
  })
  
  it('renders file info when a file is selected', () => {
    const mockFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' })
    
    render(<FileUploader file={mockFile} onChange={mockOnChange} />)
    
    expect(screen.getByText('test.pdf')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument() // Remove button
  })
  
  it('calls onChange with null when remove button is clicked', async () => {
    const mockFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' })
    const user = userEvent.setup()
    
    render(<FileUploader file={mockFile} onChange={mockOnChange} />)
    
    const removeButton = screen.getByRole('button')
    await user.click(removeButton)
    
    expect(mockOnChange).toHaveBeenCalledWith(null)
  })
  
  it('applies disabled styles when disabled prop is true', () => {
    const mockFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' })
    
    render(<FileUploader file={mockFile} onChange={mockOnChange} disabled={true} />)
    
    const removeButton = screen.getByRole('button')
    expect(removeButton).toHaveAttribute('disabled')
  })
}) 