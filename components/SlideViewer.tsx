"use client"

import React from 'react'

interface SlideViewerProps {
  slide: {
    id: number
    title: string
    content: string
  }
}

export default function SlideViewer({ slide }: SlideViewerProps) {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">{slide.title}</h2>
      <div className="aspect-[16/9] bg-white border border-gray-200 rounded-lg flex items-center justify-center p-8 mx-auto max-w-3xl shadow-sm">
        <p className="text-gray-700 text-lg">{slide.content}</p>
      </div>
      <div className="mt-4 flex justify-center space-x-2">
        <span className="text-sm text-gray-500">Slide {slide.id}</span>
      </div>
    </div>
  )
} 