"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  ArrowLeftIcon, 
  DocumentTextIcon, 
  DocumentDuplicateIcon, 
  QuestionMarkCircleIcon, 
  ShareIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline'
import SlideViewer from '@/components/SlideViewer'
import SummaryCard from '@/components/SummaryCard'
import ConceptMap from '@/components/ConceptMap'
import PracticeQuestions from '@/components/PracticeQuestions'

// Mock data for the demo
const mockSlideData = {
  slideCount: 15,
  title: "Introduction to Computer Science",
  subject: "Computer Science",
  createdAt: "2023-10-15T10:30:00Z",
  slides: Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    title: `Slide ${i + 1}: ${i === 0 ? 'Introduction' : i === 1 ? 'What is Computer Science?' : i === 2 ? 'Algorithms' : i === 3 ? 'Data Structures' : 'Programming Languages'}`,
    content: `This is the content of slide ${i + 1}, which would typically contain the main points from the lecture slides.`,
    summary: `This is a concise summary of slide ${i + 1}. It highlights the key concepts and main ideas presented in this part of the lecture.`,
    keyPoints: [
      `Key point 1 for slide ${i + 1}`,
      `Key point 2 for slide ${i + 1}`,
      `Key point 3 for slide ${i + 1}`
    ],
    concepts: [
      { id: `c${i}1`, name: `Concept 1 - Slide ${i + 1}`, definition: `Definition of concept 1 from slide ${i + 1}` },
      { id: `c${i}2`, name: `Concept 2 - Slide ${i + 1}`, definition: `Definition of concept 2 from slide ${i + 1}` }
    ],
    questions: [
      {
        id: `q${i}1`,
        type: 'multiple-choice',
        question: `Practice question 1 for slide ${i + 1}?`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 2
      },
      {
        id: `q${i}2`,
        type: 'true-false',
        question: `Practice question 2 for slide ${i + 1}?`,
        correctAnswer: true
      }
    ]
  }))
}

export default function ResultsPage() {
  const params = useParams()
  const { sessionId } = params
  
  const [slideData, setSlideData] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('slides')
  const [activeSlide, setActiveSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showExportOptions, setShowExportOptions] = useState(false)
  
  useEffect(() => {
    // In a real implementation, this would fetch data from an API
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800))
        setSlideData(mockSlideData)
      } catch (error) {
        console.error('Error fetching slide data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [sessionId])
  
  const handleDownload = (format: string) => {
    // In a real implementation, this would call an API to generate the export
    console.log(`Downloading in ${format} format...`)
    
    // Simulate API call and download
    setTimeout(() => {
      alert(`Your file would now download in ${format} format.`)
      setShowExportOptions(false)
    }, 500)
  }
  
  // Format date to readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
        <p className="mt-4 text-gray-600">Loading slides...</p>
      </div>
    )
  }
  
  // Render different content based on active tab
  const renderTabContent = () => {
    if (!slideData) return null
    
    switch (activeTab) {
      case 'slides':
        return (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Slide navigation */}
            <div className="flex border-b border-gray-200">
              <div className="w-1/4 overflow-y-auto max-h-[calc(100vh-12rem)]">
                <ul className="divide-y divide-gray-200">
                  {slideData.slides.map((slide: any, index: number) => (
                    <li 
                      key={slide.id}
                      className={`cursor-pointer px-4 py-3 hover:bg-gray-50 ${activeSlide === index ? 'bg-indigo-50 border-l-4 border-indigo-600' : ''}`}
                      onClick={() => setActiveSlide(index)}
                    >
                      <div className="text-sm font-medium text-gray-900 truncate">
                        Slide {index + 1}
                      </div>
                      <div className="text-xs text-gray-500 truncate mt-1">
                        {slide.title.split(': ')[1] || slide.title}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Slide content */}
              <div className="w-3/4 p-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
                {slideData.slides[activeSlide] && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      {slideData.slides[activeSlide].title}
                    </h2>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Original Content</h3>
                      <p className="text-gray-700">
                        {slideData.slides[activeSlide].content}
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Summary</h3>
                      <div className="bg-indigo-50 p-4 rounded-md">
                        <p className="text-gray-700">
                          {slideData.slides[activeSlide].summary}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Key Points</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        {slideData.slides[activeSlide].keyPoints.map((point: string, index: number) => (
                          <li key={index} className="text-gray-700">{point}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Key Concepts</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {slideData.slides[activeSlide].concepts.map((concept: any) => (
                          <div key={concept.id} className="bg-gray-50 p-4 rounded-md">
                            <h4 className="font-medium text-gray-900">{concept.name}</h4>
                            <p className="text-gray-700 text-sm mt-1">{concept.definition}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Practice Questions</h3>
                      <div className="space-y-4">
                        {slideData.slides[activeSlide].questions.map((question: any) => (
                          <div key={question.id} className="bg-gray-50 p-4 rounded-md">
                            <p className="font-medium text-gray-900 mb-2">{question.question}</p>
                            
                            {question.type === 'multiple-choice' && (
                              <div className="space-y-2 ml-2">
                                {question.options.map((option: string, optIndex: number) => (
                                  <div key={optIndex} className="flex items-center">
                                    <div 
                                      className={`h-4 w-4 rounded-full border ${
                                        optIndex === question.correctAnswer 
                                          ? 'bg-green-500 border-green-500' 
                                          : 'border-gray-300'
                                      } mr-2`}
                                    />
                                    <span className={optIndex === question.correctAnswer ? 'font-medium' : ''}>
                                      {option}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {question.type === 'true-false' && (
                              <div className="space-y-2 ml-2">
                                <div className="flex items-center">
                                  <div 
                                    className={`h-4 w-4 rounded-full border ${
                                      question.correctAnswer 
                                        ? 'bg-green-500 border-green-500' 
                                        : 'border-gray-300'
                                    } mr-2`}
                                  />
                                  <span className={question.correctAnswer ? 'font-medium' : ''}>
                                    True
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <div 
                                    className={`h-4 w-4 rounded-full border ${
                                      !question.correctAnswer 
                                        ? 'bg-green-500 border-green-500' 
                                        : 'border-gray-300'
                                    } mr-2`}
                                  />
                                  <span className={!question.correctAnswer ? 'font-medium' : ''}>
                                    False
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      
      case 'summary':
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Complete Summary</h2>
            
            <div className="space-y-6">
              {slideData.slides.map((slide: any) => (
                <div key={slide.id} className="pb-6 border-b border-gray-200 last:border-b-0">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{slide.title}</h3>
                  <p className="text-gray-700 mb-4">{slide.summary}</p>
                  
                  <h4 className="font-medium text-gray-900 mb-2">Key Points:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    {slide.keyPoints.map((point: string, index: number) => (
                      <li key={index} className="text-gray-700">{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 'concepts':
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Concept Map</h2>
            
            <div className="mb-6 bg-gray-100 p-4 rounded-md">
              <p className="text-gray-500 italic text-center">
                In a real implementation, this would display an interactive concept map visualizing the relationships between key concepts.
              </p>
            </div>
            
            <h3 className="text-lg font-medium text-gray-900 mb-4">All Concepts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {slideData.slides.flatMap((slide: any) => 
                slide.concepts.map((concept: any) => (
                  <div key={concept.id} className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-gray-900">{concept.name}</h4>
                    <p className="text-gray-700 text-sm mt-1">{concept.definition}</p>
                    <p className="text-xs text-gray-500 mt-2">From: {slide.title}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )
      
      case 'questions':
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Practice Questions</h2>
            
            <div className="space-y-6">
              {slideData.slides.flatMap((slide: any) => 
                slide.questions.map((question: any) => (
                  <div key={question.id} className="bg-gray-50 p-4 rounded-md">
                    <p className="font-medium text-gray-900 mb-1">{question.question}</p>
                    <p className="text-xs text-gray-500 mb-3">From: {slide.title}</p>
                    
                    {question.type === 'multiple-choice' && (
                      <div className="space-y-2 ml-2">
                        {question.options.map((option: string, optIndex: number) => (
                          <div key={optIndex} className="flex items-center">
                            <div 
                              className={`h-4 w-4 rounded-full border ${
                                optIndex === question.correctAnswer 
                                  ? 'bg-green-500 border-green-500' 
                                  : 'border-gray-300'
                              } mr-2`}
                            />
                            <span className={optIndex === question.correctAnswer ? 'font-medium' : ''}>
                              {option}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {question.type === 'true-false' && (
                      <div className="space-y-2 ml-2">
                        <div className="flex items-center">
                          <div 
                            className={`h-4 w-4 rounded-full border ${
                              question.correctAnswer 
                                ? 'bg-green-500 border-green-500' 
                                : 'border-gray-300'
                            } mr-2`}
                          />
                          <span className={question.correctAnswer ? 'font-medium' : ''}>
                            True
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div 
                            className={`h-4 w-4 rounded-full border ${
                              !question.correctAnswer 
                                ? 'bg-green-500 border-green-500' 
                                : 'border-gray-300'
                            } mr-2`}
                          />
                          <span className={!question.correctAnswer ? 'font-medium' : ''}>
                            False
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )
        
      default:
        return null
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="text-indigo-600 hover:text-indigo-700 font-bold text-xl"
          >
            LecSlide
          </Link>
          <div>
            <Link 
              href="/upload"
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Back to Upload
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {slideData && (
          <>
            {/* Title and metadata */}
            <div className="md:flex md:items-center md:justify-between mb-6">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">
                  {slideData.title}
                </h1>
                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span className="truncate">{slideData.subject}</span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span>{slideData.slideCount} slides</span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span>Created on {formatDate(slideData.createdAt)}</span>
                  </div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="mt-4 flex md:mt-0 md:ml-4 relative">
                <button
                  type="button"
                  onClick={() => setShowExportOptions(!showExportOptions)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Export
                </button>
                
                {showExportOptions && (
                  <div className="absolute right-0 top-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <button
                        onClick={() => handleDownload('pdf')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        PDF Document
                      </button>
                      <button
                        onClick={() => handleDownload('docx')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Word Document
                      </button>
                      <button
                        onClick={() => handleDownload('markdown')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Markdown
                      </button>
                    </div>
                  </div>
                )}
                
                <button
                  type="button"
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <ShareIcon className="h-4 w-4 mr-2" />
                  Share
                </button>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  className={`${
                    activeTab === 'slides'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  onClick={() => setActiveTab('slides')}
                >
                  <DocumentTextIcon className="h-5 w-5 inline-block mr-1" />
                  Slides
                </button>
                <button
                  className={`${
                    activeTab === 'summary'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  onClick={() => setActiveTab('summary')}
                >
                  <DocumentDuplicateIcon className="h-5 w-5 inline-block mr-1" />
                  Summary
                </button>
                <button
                  className={`${
                    activeTab === 'concepts'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  onClick={() => setActiveTab('concepts')}
                >
                  Concept Map
                </button>
                <button
                  className={`${
                    activeTab === 'questions'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  onClick={() => setActiveTab('questions')}
                >
                  <QuestionMarkCircleIcon className="h-5 w-5 inline-block mr-1" />
                  Practice Questions
                </button>
              </nav>
            </div>
            
            {/* Tab content */}
            {renderTabContent()}
          </>
        )}
      </main>
    </div>
  )
} 