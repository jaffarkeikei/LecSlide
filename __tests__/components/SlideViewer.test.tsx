import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import SlideViewer from '@/components/SlideViewer'

describe('SlideViewer', () => {
  const mockSlide = {
    id: 1,
    title: 'Test Slide',
    content: 'This is a test slide content',
    summary: 'Test summary',
    keyPoints: ['Point 1', 'Point 2'],
    concepts: [],
    questions: []
  }

  it('renders the slide title', () => {
    render(<SlideViewer slide={mockSlide} />)
    expect(screen.getByRole('heading', { name: /Test Slide/i })).toBeInTheDocument()
  })

  it('renders the slide content', () => {
    render(<SlideViewer slide={mockSlide} />)
    expect(screen.getByText('This is a test slide content')).toBeInTheDocument()
  })

  it('applies the correct styling to content container', () => {
    render(<SlideViewer slide={mockSlide} />)
    const contentElement = screen.getByText('This is a test slide content')
    const container = contentElement.closest('div')
    expect(container).toHaveClass('bg-white')
  })

  it('handles slide with empty content', () => {
    const emptySlide = { ...mockSlide, content: '' }
    render(<SlideViewer slide={emptySlide} />)
    expect(screen.getByRole('heading', { name: /Test Slide/i })).toBeInTheDocument()
  })
}) 