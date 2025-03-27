import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import PracticeQuestions from '@/components/PracticeQuestions'

describe('PracticeQuestions', () => {
  const mockMultipleChoiceQuestion = {
    id: 'q1',
    type: 'multiple-choice' as const,
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 2
  }

  const mockTrueFalseQuestion = {
    id: 'q2',
    type: 'true-false' as const,
    question: 'The Earth is flat.',
    correctAnswer: false
  }

  const mockQuestions = [
    mockMultipleChoiceQuestion,
    mockTrueFalseQuestion
  ]

  it('renders the title correctly', () => {
    render(<PracticeQuestions questions={mockQuestions} />)
    expect(screen.getByText('Practice Questions')).toBeInTheDocument()
  })

  it('renders all questions', () => {
    render(<PracticeQuestions questions={mockQuestions} />)
    
    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument()
    expect(screen.getByText('The Earth is flat.')).toBeInTheDocument()
  })

  it('renders multiple choice options', () => {
    render(<PracticeQuestions questions={mockQuestions} />)
    
    expect(screen.getByText('London')).toBeInTheDocument()
    expect(screen.getByText('Berlin')).toBeInTheDocument()
    expect(screen.getByText('Paris')).toBeInTheDocument()
    expect(screen.getByText('Madrid')).toBeInTheDocument()
  })

  it('renders true/false options', () => {
    render(<PracticeQuestions questions={mockQuestions} />)
    
    const trueFalseOptions = screen.getAllByRole('radio', { name: /True|False/i })
    expect(trueFalseOptions.length).toBe(2)
  })

  it('handles selecting an answer for multiple choice questions', async () => {
    render(<PracticeQuestions questions={[mockMultipleChoiceQuestion]} />)
    
    // Choose an answer (Paris)
    const parisOption = screen.getByLabelText('Paris')
    await userEvent.click(parisOption)
    
    // Check for Check Answer button
    expect(screen.getByText('Check Answer')).toBeInTheDocument()
  })

  it('handles selecting an answer for true/false questions', async () => {
    render(<PracticeQuestions questions={[mockTrueFalseQuestion]} />)
    
    // Choose an answer (False)
    const falseOption = screen.getByLabelText('False')
    await userEvent.click(falseOption)
    
    // Check for Check Answer button
    expect(screen.getByText('Check Answer')).toBeInTheDocument()
  })

  it('handles empty questions array', () => {
    render(<PracticeQuestions questions={[]} />)
    
    expect(screen.getByText('Practice Questions')).toBeInTheDocument()
    // The component doesn't show a message for no questions
    expect(screen.queryByText(/What is/)).toBeNull()
  })
}) 