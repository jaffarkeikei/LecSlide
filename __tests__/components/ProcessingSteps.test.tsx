import React from 'react'
import { render, screen } from '@testing-library/react'
import ProcessingSteps from '@/components/ProcessingSteps'

describe('ProcessingSteps', () => {
  it('renders all steps correctly', () => {
    render(<ProcessingSteps currentStep={0} />)
    
    expect(screen.getByText('Analyzing Slides')).toBeInTheDocument()
    expect(screen.getByText('Generating Summaries')).toBeInTheDocument()
    expect(screen.getByText('Creating Visuals')).toBeInTheDocument()
    expect(screen.getByText('Preparing Questions')).toBeInTheDocument()
  })
  
  it('highlights the current step correctly', () => {
    render(<ProcessingSteps currentStep={3} />)
    
    // Find the step labels
    const steps = screen.getAllByText(/^(Analyzing Slides|Generating Summaries|Creating Visuals|Preparing Questions)$/)
    
    // Check that the third step (index 2) has the "In progress" indicator
    const progressIndicators = screen.getAllByText('In progress')
    expect(progressIndicators).toHaveLength(1)
    
    // Find the parent element of the third step to check for styling
    const thirdStepText = steps[2]
    expect(thirdStepText.textContent).toBe('Creating Visuals')
    expect(thirdStepText).toHaveClass('text-gray-900')
    
    // First two steps should be completed
    expect(steps[0]).toHaveClass('text-gray-900')
    expect(steps[1]).toHaveClass('text-gray-900')
    
    // Fourth step should not be active yet
    expect(steps[3]).toHaveClass('text-gray-500')
  })
  
  it('shows all steps as inactive when currentStep is 0', () => {
    render(<ProcessingSteps currentStep={0} />)
    
    // Check that no step has the "In progress" indicator
    const progressIndicators = screen.queryAllByText('In progress')
    expect(progressIndicators).toHaveLength(0)
    
    // All steps should be inactive
    const steps = screen.getAllByText(/^(Analyzing Slides|Generating Summaries|Creating Visuals|Preparing Questions)$/)
    steps.forEach(step => {
      expect(step).toHaveClass('text-gray-500')
    })
  })
}) 