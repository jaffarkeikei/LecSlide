"use client"

import { CheckIcon } from '@heroicons/react/24/outline'

const steps = [
  { id: 1, name: 'Analyzing Slides', description: 'Extracting text and images' },
  { id: 2, name: 'Generating Summaries', description: 'Creating concise overviews' },
  { id: 3, name: 'Creating Visuals', description: 'Building diagrams and concept maps' },
  { id: 4, name: 'Preparing Questions', description: 'Generating practice materials' },
]

interface ProcessingStepsProps {
  currentStep: number
}

export default function ProcessingSteps({ currentStep }: ProcessingStepsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Processing Your Slides</h3>
      
      <nav aria-label="Progress">
        <ol role="list" className="overflow-hidden">
          {steps.map((step, stepIdx) => (
            <li key={step.id} className={stepIdx !== steps.length - 1 ? 'pb-8 relative' : 'relative'}>
              {stepIdx !== steps.length - 1 ? (
                <div 
                  className={`absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 ${
                    step.id < currentStep ? 'bg-primary-600' : 'bg-gray-300'
                  }`} 
                  aria-hidden="true" 
                />
              ) : null}
              
              <div className="group relative flex items-start">
                <span className="flex h-9 items-center">
                  <span
                    className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${
                      step.id < currentStep
                        ? 'bg-primary-600 group-hover:bg-primary-800'
                        : step.id === currentStep
                        ? 'bg-primary-600 group-hover:bg-primary-800'
                        : 'bg-gray-300 group-hover:bg-gray-400'
                    }`}
                  >
                    {step.id < currentStep ? (
                      <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    ) : step.id === currentStep ? (
                      <span className="h-2.5 w-2.5 rounded-full bg-white" />
                    ) : (
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                    )}
                  </span>
                </span>
                
                <div className="ml-4 min-w-0 flex-1">
                  <div className="flex items-center text-sm font-medium">
                    <span
                      className={
                        step.id <= currentStep ? 'text-gray-900' : 'text-gray-500'
                      }
                    >
                      {step.name}
                    </span>
                    
                    {step.id === currentStep && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
                        In progress
                      </span>
                    )}
                  </div>
                  <p
                    className={
                      step.id <= currentStep ? 'text-sm text-gray-500' : 'text-sm text-gray-400'
                    }
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
} 