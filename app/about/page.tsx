import Link from 'next/link'
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline'

export default function AboutPage() {
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
          <nav className="flex space-x-4">
            <Link 
              href="/dashboard" 
              className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link 
              href="/about" 
              className="text-primary-600 hover:text-primary-700 px-3 py-2 text-sm font-medium"
            >
              About
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 font-display">About LecSlide</h1>
          
          <div className="mt-8 prose prose-primary lg:prose-lg">
            <p className="lead">
              LecSlide is a student-centric platform that transforms traditional lecture slides into interactive, AI-powered study resources.
            </p>
            
            <h2>Our Mission</h2>
            <p>
              We help students grasp lecture content more fully by generating concise summaries, interactive examples, and custom visual aids from existing slides, ultimately improving study effectiveness.
            </p>
            
            <h2>The Problem We're Solving</h2>
            <p>
              Lecture slides often contain partial information that requires context from the lecture itself. Students frequently find themselves with slides that don't fully capture all the necessary details for effective studying.
            </p>
            <p>
              Traditional options include:
            </p>
            <ul>
              <li>Relying solely on incomplete slides</li>
              <li>Taking extensive notes during lectures</li>
              <li>Recording lectures for later review</li>
              <li>Seeking additional resources online</li>
            </ul>
            <p>
              LecSlide offers a better approach by enhancing existing slide materials with AI-generated content tailored to each slide.
            </p>
            
            <h2>How It Works</h2>
            <ol>
              <li>
                <strong>Upload your slides</strong> - Simply upload your PDF or PowerPoint lecture slides to our platform.
              </li>
              <li>
                <strong>AI Processing</strong> - Our AI analyzes your slides, extracting key concepts and understanding the content.
              </li>
              <li>
                <strong>Enhanced Materials</strong> - We transform each slide with summaries, concept maps, and practice questions.
              </li>
              <li>
                <strong>Customize & Study</strong> - Use the enhanced materials directly in the platform or export them for later use.
              </li>
            </ol>
            
            <h2>Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mt-6 mb-8">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckIcon className="h-6 w-6 text-primary-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">AI-Powered Summaries</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Concise summaries and key points that make complex topics more digestible.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckIcon className="h-6 w-6 text-primary-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Concept Maps</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Visual representations of key concepts and their relationships.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckIcon className="h-6 w-6 text-primary-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Practice Questions</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Auto-generated quiz questions to test your understanding.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckIcon className="h-6 w-6 text-primary-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Discipline-Specific Formats</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Tailored outputs for different subjects (STEM, humanities, etc.).
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <h2>Our Technology</h2>
            <p>
              LecSlide uses state-of-the-art AI models to process and enhance your lecture slides:
            </p>
            <ul>
              <li><strong>Text Analysis:</strong> Advanced NLP models extract and understand content</li>
              <li><strong>Content Generation:</strong> AI creates high-quality summaries and practice questions</li>
              <li><strong>Visual Mapping:</strong> Automatic generation of concept maps and visual aids</li>
              <li><strong>Domain Adaptation:</strong> Specialized processing for different academic disciplines</li>
            </ul>
            
            <div className="mt-8 bg-primary-50 p-6 rounded-lg border border-primary-100 not-prose">
              <h3 className="text-xl font-bold text-primary-800 mb-3">Ready to transform your learning experience?</h3>
              <p className="text-primary-700 mb-4">
                Join thousands of students who are enhancing their study materials with LecSlide.
              </p>
              <Link 
                href="/upload" 
                className="btn btn-primary inline-flex items-center"
              >
                Get Started
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 