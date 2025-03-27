'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRightIcon, ChevronDownIcon, DocumentIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
  const router = useRouter();
  
  // Benefits of using LecSlide
  const benefits = [
    {
      title: 'AI-Powered Summaries',
      description: 'Get concise, accurate summaries of each slide to help you grasp key concepts quickly.'
    },
    {
      title: 'Concept Maps',
      description: 'Visualize relationships between key concepts with automatically generated concept maps.'
    },
    {
      title: 'Practice Questions',
      description: 'Test your understanding with AI-generated questions based on the slide content.'
    },
    {
      title: 'Export Options',
      description: 'Download your enhanced slides in multiple formats for studying offline.'
    }
  ];

  const handleGetStarted = () => {
    router.push('/upload');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <div className="bg-white">
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-indigo-500" />
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-white">Transform Your</span>
                  <span className="block text-indigo-200">Lecture Slides</span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-100 sm:max-w-3xl">
                  Upload your lecture slides and get AI-powered summaries, concept maps, and practice questions to enhance your learning experience.
                </p>
                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5">
                    <button
                      onClick={handleGetStarted}
                      className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
                    >
                      Get started
                      <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to study from slides
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              LecSlide processes your lecture slides and transforms them into comprehensive study materials.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {benefits.map((benefit, index) => (
                <div key={index} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <DocumentTextIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{benefit.title}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{benefit.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* How it works section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Process</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              How it works
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Three simple steps to transform your lecture slides into enhanced study materials.
            </p>
          </div>

          <div className="mt-10">
            <div className="flex flex-col space-y-8">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Upload your slides</h3>
                  <p className="mt-1 text-base text-gray-500">Upload your PDF or PowerPoint lecture slides.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">AI processing</h3>
                  <p className="mt-1 text-base text-gray-500">Our AI analyzes your slides and generates summaries, concept maps, and practice questions.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">View and download</h3>
                  <p className="mt-1 text-base text-gray-500">Access your enhanced study materials online or download them for offline use.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <button
              onClick={handleGetStarted}
              className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Try it now
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <span className="text-gray-500">© {new Date().getFullYear()} LecSlide</span>
          </div>
          <div className="mt-4 md:mt-0">
            <nav className="flex space-x-6">
              <Link href="/about" className="text-gray-500 hover:text-gray-900">
                About
              </Link>
              <Link href="/privacy" className="text-gray-500 hover:text-gray-900">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-900">
                Terms
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
} 