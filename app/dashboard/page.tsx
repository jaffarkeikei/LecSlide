"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PlusIcon, ArrowPathIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

// Mock data for dashboard
const mockSlideDecks = [
  {
    id: 'deck-1',
    title: 'Introduction to Computer Science',
    subject: 'Computer Science',
    slideCount: 15,
    status: 'completed',
    createdAt: '2023-10-15T10:30:00Z',
  },
  {
    id: 'deck-2',
    title: 'Data Structures and Algorithms',
    subject: 'Computer Science',
    slideCount: 22,
    status: 'completed',
    createdAt: '2023-10-10T14:20:00Z',
  },
  {
    id: 'deck-3',
    title: 'Introduction to Psychology',
    subject: 'Psychology',
    slideCount: 18,
    status: 'processing',
    createdAt: '2023-10-18T09:15:00Z',
  }
]

export default function DashboardPage() {
  const [slideDecks, setSlideDecks] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, we would fetch data from an API
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800))
        setSlideDecks(mockSlideDecks)
      } catch (error) {
        console.error('Error fetching slide decks:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="text-primary-600 hover:text-primary-700 font-display text-xl font-bold"
          >
            LecSlide
          </Link>
          <div>
            <Link 
              href="/upload"
              className="btn btn-primary inline-flex items-center"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              New Upload
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">
              Your Slide Decks
            </h1>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white shadow rounded-lg p-8 flex justify-center">
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading your slides...</p>
            </div>
          </div>
        ) : slideDecks.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No slides yet</h3>
            <p className="mt-1 text-gray-500">
              Get started by uploading your first set of lecture slides.
            </p>
            <div className="mt-6">
              <Link
                href="/upload"
                className="btn btn-primary inline-flex items-center"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Upload Slides
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
              {slideDecks.map((deck) => (
                <li key={deck.id}>
                  <div className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Link
                            href={`/results/${deck.id}`}
                            className="text-lg font-medium text-primary-700 hover:text-primary-900 hover:underline truncate"
                          >
                            {deck.title}
                          </Link>
                          {deck.status === 'processing' && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <ArrowPathIcon className="h-3 w-3 mr-1 animate-spin" />
                              Processing
                            </span>
                          )}
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                            {deck.subject}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            {deck.slideCount} slides
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p>
                            Created on {formatDate(deck.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  )
} 