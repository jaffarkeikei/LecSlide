"use client"

interface SummaryCardProps {
  summary: string
  keyPoints: string[]
  onRegenerate?: () => void
}

export default function SummaryCard({ summary, keyPoints, onRegenerate }: SummaryCardProps) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Summary</h3>
        <p className="text-gray-700">{summary}</p>
        
        <button 
          onClick={onRegenerate}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Regenerate summary
        </button>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Key Points</h3>
        <ul className="space-y-2">
          {keyPoints.map((point, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mr-2 flex-shrink-0">
                {index + 1}
              </span>
              <span className="text-gray-700">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
} 