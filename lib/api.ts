import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Types
export interface UploadResponse {
  sessionId: string
  status: string
}

export interface SlideData {
  slideCount: number
  title: string
  subject: string
  createdAt: string
  slides: Slide[]
}

export interface Slide {
  id: number
  title: string
  content: string
  summary: string
  keyPoints: string[]
  concepts: Concept[]
  questions: Question[]
  visualAid?: VisualAid
}

export interface Concept {
  id: string
  name: string
  definition: string
}

export interface Question {
  id: string
  type: 'multiple-choice' | 'true-false' | 'short-answer'
  question: string
  options?: string[]
  correctAnswer: number | boolean | string
}

export interface VisualAid {
  type: string
  data: any
}

// API Functions
export async function uploadSlides(file: File): Promise<UploadResponse> {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await api.post<UploadResponse>('/slides/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  
  return response.data
}

export async function getSlideData(sessionId: string): Promise<SlideData> {
  const response = await api.get<SlideData>(`/slides/${sessionId}`)
  return response.data
}

export async function updateSlide(sessionId: string, slideId: number, data: Partial<Slide>): Promise<Slide> {
  const response = await api.patch<Slide>(`/slides/${sessionId}/${slideId}`, data)
  return response.data
}

export async function regenerateSummary(sessionId: string, slideId: number): Promise<Slide> {
  const response = await api.post<Slide>(`/slides/${sessionId}/${slideId}/regenerate-summary`)
  return response.data
}

export async function regenerateQuestions(sessionId: string, slideId: number): Promise<Slide> {
  const response = await api.post<Slide>(`/slides/${sessionId}/${slideId}/regenerate-questions`)
  return response.data
}

export async function regenerateVisual(sessionId: string, slideId: number): Promise<Slide> {
  const response = await api.post<Slide>(`/slides/${sessionId}/${slideId}/regenerate-visual`)
  return response.data
}

export async function exportStudyMaterials(sessionId: string, format: 'pdf' | 'docx' | 'markdown'): Promise<string> {
  const response = await api.get<{ url: string }>(`/slides/${sessionId}/export?format=${format}`)
  return response.data.url
}

export default api 