import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import SummaryCard from '@/components/SummaryCard'

describe('SummaryCard', () => {
  const mockSummary = "This is a test summary of the slide content."
  const mockKeyPoints = [
    "First key point for testing",
    "Second important piece of information",
    "Third concept to remember"
  ]

  it('renders the summary correctly', () => {
    render(<SummaryCard summary={mockSummary} keyPoints={mockKeyPoints} />)
    
    // Check if the summary heading and content are rendered
    expect(screen.getByText('Summary')).toBeInTheDocument()
    expect(screen.getByText(mockSummary)).toBeInTheDocument()
  })
  
  it('renders all key points', () => {
    render(<SummaryCard summary={mockSummary} keyPoints={mockKeyPoints} />)
    
    // Check if the key points heading is rendered
    expect(screen.getByText('Key Points')).toBeInTheDocument()
    
    // Check if all key points are rendered
    mockKeyPoints.forEach(point => {
      expect(screen.getByText(point)).toBeInTheDocument()
    })
  })
  
  it('renders the correct number of key points', () => {
    render(<SummaryCard summary={mockSummary} keyPoints={mockKeyPoints} />)
    
    // There should be exactly 3 list items for the key points
    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(mockKeyPoints.length)
  })
  
  it('renders the regenerate button', () => {
    render(<SummaryCard summary={mockSummary} keyPoints={mockKeyPoints} />)
    
    // Check if the regenerate button is present
    expect(screen.getByText('Regenerate summary')).toBeInTheDocument()
  })
}) 