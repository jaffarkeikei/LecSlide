"use client"

import { useState } from 'react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

interface Question {
  id: string
  type: 'multiple-choice' | 'true-false'
  question: string
  options?: string[]
  correctAnswer: number | boolean
}

interface PracticeQuestionsProps {
  questions: Question[]
}

export default function PracticeQuestions({ questions }: PracticeQuestionsProps) {
  const [answers, setAnswers] = useState<Record<string, number | boolean>>({})
  const [feedback, setFeedback] = useState<Record<string, boolean>>({})
  const [showAllAnswers, setShowAllAnswers] = useState(false)

  const handleAnswerSelect = (questionId: string, answer: number | boolean) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const checkAnswer = (questionId: string) => {
    const question = questions.find(q => q.id === questionId)
    if (!question) return

    const userAnswer = answers[questionId]
    const isCorrect = userAnswer === question.correctAnswer

    setFeedback(prev => ({
      ...prev,
      [questionId]: isCorrect
    }))
  }

  const checkAllAnswers = () => {
    const newFeedback: Record<string, boolean> = {}
    
    questions.forEach(question => {
      const userAnswer = answers[question.id]
      if (userAnswer !== undefined) {
        newFeedback[question.id] = userAnswer === question.correctAnswer
      }
    })
    
    setFeedback(newFeedback)
    setShowAllAnswers(true)
  }

  const reset = () => {
    setAnswers({})
    setFeedback({})
    setShowAllAnswers(false)
  }

  const getScore = () => {
    let correct = 0
    let attempted = 0
    
    Object.keys(feedback).forEach(questionId => {
      attempted++
      if (feedback[questionId]) correct++
    })
    
    return { correct, attempted, total: questions.length }
  }

  const score = getScore()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Practice Questions</h3>
        {(score.attempted > 0) && (
          <div className="text-sm">
            <span className="font-medium">Score: </span>
            <span className="text-primary-600 font-medium">{score.correct}</span>
            <span> / </span>
            <span>{score.attempted}</span>
            {score.attempted < score.total && !showAllAnswers && (
              <span className="text-gray-500"> ({score.total - score.attempted} remaining)</span>
            )}
          </div>
        )}
      </div>

      <div className="space-y-6">
        {questions.map((question, index) => (
          <div 
            key={question.id} 
            className={`p-4 rounded-lg border ${
              feedback[question.id] === true
                ? 'bg-green-50 border-green-200'
                : feedback[question.id] === false
                ? 'bg-red-50 border-red-200'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex justify-between items-start">
              <p className="text-gray-800 font-medium mb-3">
                <span className="text-gray-500">{index + 1}. </span>
                {question.question}
              </p>
              {feedback[question.id] !== undefined && (
                <span className="ml-2 mt-1">
                  {feedback[question.id] ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircleIcon className="h-5 w-5 text-red-500" />
                  )}
                </span>
              )}
            </div>

            <div className="mt-3 space-y-2">
              {question.type === 'multiple-choice' && question.options && (
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <label 
                      key={optionIndex}
                      className={`block relative pl-8 py-2 pr-4 rounded-md cursor-pointer transition-colors ${
                        answers[question.id] === optionIndex
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'hover:bg-gray-50'
                      } ${
                        feedback[question.id] !== undefined && question.correctAnswer === optionIndex
                          ? 'bg-green-50 text-green-700 font-medium'
                          : ''
                      }`}
                    >
                      <input
                        type="radio"
                        className="absolute h-4 w-4 left-2 top-1/2 transform -translate-y-1/2"
                        checked={answers[question.id] === optionIndex}
                        onChange={() => handleAnswerSelect(question.id, optionIndex)}
                        disabled={feedback[question.id] !== undefined}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}

              {question.type === 'true-false' && (
                <div className="flex space-x-4">
                  <label 
                    className={`block relative pl-8 py-2 pr-4 rounded-md cursor-pointer transition-colors ${
                      answers[question.id] === true
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'hover:bg-gray-50'
                    } ${
                      feedback[question.id] !== undefined && question.correctAnswer === true
                        ? 'bg-green-50 text-green-700 font-medium'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      className="absolute h-4 w-4 left-2 top-1/2 transform -translate-y-1/2"
                      checked={answers[question.id] === true}
                      onChange={() => handleAnswerSelect(question.id, true)}
                      disabled={feedback[question.id] !== undefined}
                    />
                    True
                  </label>
                  <label 
                    className={`block relative pl-8 py-2 pr-4 rounded-md cursor-pointer transition-colors ${
                      answers[question.id] === false
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'hover:bg-gray-50'
                    } ${
                      feedback[question.id] !== undefined && question.correctAnswer === false
                        ? 'bg-green-50 text-green-700 font-medium'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      className="absolute h-4 w-4 left-2 top-1/2 transform -translate-y-1/2"
                      checked={answers[question.id] === false}
                      onChange={() => handleAnswerSelect(question.id, false)}
                      disabled={feedback[question.id] !== undefined}
                    />
                    False
                  </label>
                </div>
              )}

              {answers[question.id] !== undefined && feedback[question.id] === undefined && (
                <div className="mt-3">
                  <button
                    className="text-sm font-medium text-primary-600 hover:text-primary-700"
                    onClick={() => checkAnswer(question.id)}
                  >
                    Check Answer
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={reset}
          className="text-sm font-medium text-gray-600 hover:text-gray-700"
          disabled={Object.keys(answers).length === 0}
        >
          Reset
        </button>
        <button
          onClick={checkAllAnswers}
          className="btn btn-primary py-2 px-4"
          disabled={Object.keys(answers).length === 0 || showAllAnswers}
        >
          Check All Answers
        </button>
      </div>
    </div>
  )
} 