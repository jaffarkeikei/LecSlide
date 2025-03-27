"use client"

import { useMemo } from 'react'

interface Concept {
  id: string
  name: string
  definition: string
}

interface VisualAid {
  type: string
  data: {
    nodes: Array<{
      id: string
      label: string
    }>
    edges: Array<{
      from: string
      to: string
    }>
  }
}

interface ConceptMapProps {
  concepts: Concept[]
  visualAid: VisualAid
}

export default function ConceptMap({ concepts, visualAid }: ConceptMapProps) {
  // In a real implementation, this would use a proper visualization library
  // such as vis.js, react-flow, or d3.js
  const flowchartElements = useMemo(() => {
    if (visualAid.type === 'flowchart') {
      const nodes = visualAid.data.nodes || []
      const edges = visualAid.data.edges || []
      
      return { nodes, edges }
    }
    
    return { nodes: [], edges: [] }
  }, [visualAid])

  return (
    <div className="space-y-8">
      {/* Concepts */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Key Concepts</h3>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {concepts.map((concept) => (
            <div 
              key={concept.id} 
              className="bg-gray-50 rounded-lg p-4 border border-gray-200"
            >
              <h4 className="font-medium text-primary-700">{concept.name}</h4>
              <p className="mt-1 text-sm text-gray-600">{concept.definition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Aid (Simple Flowchart) */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Visual Representation</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          {visualAid.type === 'flowchart' && (
            <div className="overflow-x-auto">
              {/* Simple flowchart representation */}
              <div className="min-w-[600px] mx-auto p-4">
                <div className="flex flex-col items-center">
                  {flowchartElements.nodes.map((node, index) => (
                    <div key={node.id} className="relative mb-8 last:mb-0">
                      <div className="bg-primary-100 text-primary-800 px-4 py-2 rounded-lg shadow-sm font-medium">
                        {node.label}
                      </div>
                      {index < flowchartElements.nodes.length - 1 && (
                        <div className="absolute h-8 w-0.5 bg-gray-300 left-1/2 -ml-px -bottom-8"></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-center mt-4 text-sm text-gray-500">
                  Note: This is a simplified representation. Interactive diagrams would be implemented in the full version.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 