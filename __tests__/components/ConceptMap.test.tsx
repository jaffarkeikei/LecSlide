import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ConceptMap from '@/components/ConceptMap'

// Mock the ForceGraph component since it relies on browser APIs
jest.mock('react-force-graph-2d', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-force-graph">Mock Force Graph</div>)
}))

describe('ConceptMap', () => {
  const mockConcepts = [
    { id: 'concept1', name: 'Concept 1', definition: 'Definition of concept 1' },
    { id: 'concept2', name: 'Concept 2', definition: 'Definition of concept 2' },
    { id: 'concept3', name: 'Concept 3', definition: 'Definition of concept 3' }
  ]

  const mockVisualAid = {
    type: 'flowchart',
    data: {
      nodes: [
        { id: 'node1', label: 'Node 1' },
        { id: 'node2', label: 'Node 2' }
      ],
      edges: [
        { from: 'node1', to: 'node2' }
      ]
    }
  }

  it('renders the key concepts heading correctly', () => {
    render(<ConceptMap concepts={mockConcepts} visualAid={mockVisualAid} />)
    expect(screen.getByText('Key Concepts')).toBeInTheDocument()
  })

  it('renders the visual representation heading', () => {
    render(<ConceptMap concepts={mockConcepts} visualAid={mockVisualAid} />)
    expect(screen.getByText('Visual Representation')).toBeInTheDocument()
  })

  it('renders a list of concepts', () => {
    render(<ConceptMap concepts={mockConcepts} visualAid={mockVisualAid} />)
    
    // Check if concept names are listed
    expect(screen.getByText('Concept 1')).toBeInTheDocument()
    expect(screen.getByText('Concept 2')).toBeInTheDocument()
    expect(screen.getByText('Concept 3')).toBeInTheDocument()
    
    // Check if concept definitions are listed
    expect(screen.getByText('Definition of concept 1')).toBeInTheDocument()
    expect(screen.getByText('Definition of concept 2')).toBeInTheDocument()
    expect(screen.getByText('Definition of concept 3')).toBeInTheDocument()
  })
  
  it('renders the flowchart nodes', () => {
    render(<ConceptMap concepts={mockConcepts} visualAid={mockVisualAid} />)
    expect(screen.getByText('Node 1')).toBeInTheDocument()
    expect(screen.getByText('Node 2')).toBeInTheDocument()
  })

  it('handles empty concepts array', () => {
    render(<ConceptMap concepts={[]} visualAid={mockVisualAid} />)
    expect(screen.getByText('Key Concepts')).toBeInTheDocument()
    // There should be no concept divs if the array is empty
    expect(screen.queryByText('Concept 1')).not.toBeInTheDocument()
  })
}) 