import { 
  uploadSlides, 
  getSlideData, 
  updateSlide,
  regenerateSummary
} from '@/lib/api'
import axios from 'axios'

// Mock axios
jest.mock('axios', () => {
  const mockApi = {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn()
  }
  
  return {
    create: jest.fn(() => mockApi)
  }
})

describe('API Services', () => {
  let mockAxios;
  
  beforeEach(() => {
    jest.clearAllMocks()
    mockAxios = axios.create()
  })

  describe('uploadSlides', () => {
    it('uploads slides successfully', async () => {
      const mockResponse = {
        sessionId: 'session123',
        status: 'success'
      }
      
      mockAxios.post.mockResolvedValueOnce({ data: mockResponse })

      const file = new File(['content'], 'presentation.pdf', { type: 'application/pdf' })
      const result = await uploadSlides(file)
      
      expect(result).toEqual(mockResponse)
      expect(mockAxios.post).toHaveBeenCalledWith('/slides/upload', expect.any(FormData), {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    })
  })

  describe('getSlideData', () => {
    it('fetches slide data successfully', async () => {
      const mockSessionData = {
        slideCount: 2,
        title: 'Test Presentation',
        subject: 'Testing',
        createdAt: '2023-10-15T10:30:00Z',
        slides: []
      }
      
      mockAxios.get.mockResolvedValueOnce({ data: mockSessionData })

      const result = await getSlideData('session123')
      expect(result).toEqual(mockSessionData)
      expect(mockAxios.get).toHaveBeenCalledWith('/slides/session123')
    })
  })

  describe('updateSlide', () => {
    it('updates slide data successfully', async () => {
      const mockSlideData = {
        id: 1,
        title: 'Updated Slide',
        content: 'Updated content',
        summary: 'Updated summary',
        keyPoints: ['Point 1', 'Point 2'],
        concepts: [],
        questions: []
      }
      
      mockAxios.patch.mockResolvedValueOnce({ data: mockSlideData })

      const updateData = {
        title: 'Updated Slide',
        content: 'Updated content'
      }
      
      const result = await updateSlide('session123', 1, updateData)
      expect(result).toEqual(mockSlideData)
      expect(mockAxios.patch).toHaveBeenCalledWith('/slides/session123/1', updateData)
    })
  })

  describe('regenerateSummary', () => {
    it('regenerates slide summary successfully', async () => {
      const mockSlideData = {
        id: 1,
        title: 'Test Slide',
        content: 'Test content',
        summary: 'New regenerated summary',
        keyPoints: ['New point 1', 'New point 2'],
        concepts: [],
        questions: []
      }
      
      mockAxios.post.mockResolvedValueOnce({ data: mockSlideData })

      const result = await regenerateSummary('session123', 1)
      expect(result).toEqual(mockSlideData)
      expect(mockAxios.post).toHaveBeenCalledWith('/slides/session123/1/regenerate-summary')
    })
  })
}) 