import { generateMarkdown, generateHTML, generatePDF } from '@/lib/exportUtils'
import { SlideData } from '@/lib/api'

// Mock slide data for testing
const mockSlideData: SlideData = {
  slideCount: 2,
  title: "Test Presentation",
  subject: "Testing",
  createdAt: "2023-10-15T10:30:00Z",
  slides: [
    {
      id: 1,
      title: "Test Slide 1",
      content: "This is the content of test slide 1.",
      summary: "A summary of test slide 1.",
      keyPoints: [
        "Key point 1",
        "Key point 2"
      ],
      concepts: [
        { id: "concept1", name: "Concept 1", definition: "Definition of concept 1" },
        { id: "concept2", name: "Concept 2", definition: "Definition of concept 2" }
      ],
      questions: [
        {
          id: "q1",
          type: "multiple-choice",
          question: "Test question 1?",
          options: [
            "Option 1",
            "Option 2",
            "Option 3",
            "Option 4"
          ],
          correctAnswer: 2
        }
      ],
      visualAid: {
        type: "flowchart",
        data: {
          nodes: [
            { id: "node1", label: "Node 1" },
            { id: "node2", label: "Node 2" }
          ],
          edges: [
            { from: "node1", to: "node2" }
          ]
        }
      }
    },
    {
      id: 2,
      title: "Test Slide 2",
      content: "This is the content of test slide 2.",
      summary: "A summary of test slide 2.",
      keyPoints: [
        "Key point 3",
        "Key point 4"
      ],
      concepts: [
        { id: "concept3", name: "Concept 3", definition: "Definition of concept 3" }
      ],
      questions: [
        {
          id: "q2",
          type: "true-false",
          question: "Test question 2?",
          correctAnswer: true
        }
      ],
      visualAid: {
        type: "flowchart",
        data: {
          nodes: [],
          edges: []
        }
      }
    }
  ]
}

describe('Export Utilities', () => {
  // Mock Date.prototype.toLocaleDateString to return a consistent date for testing
  const originalToLocaleDateString = Date.prototype.toLocaleDateString
  beforeAll(() => {
    // @ts-ignore
    Date.prototype.toLocaleDateString = jest.fn(() => 'October 15, 2023')
  })
  
  afterAll(() => {
    Date.prototype.toLocaleDateString = originalToLocaleDateString
  })
  
  describe('generateMarkdown', () => {
    it('generates markdown with the correct structure', () => {
      const markdown = generateMarkdown(mockSlideData)
      
      // Check title and metadata
      expect(markdown).toContain('# Test Presentation')
      expect(markdown).toContain('Subject: Testing')
      expect(markdown).toContain('Generated with LecSlide')
      
      // Check slide content
      expect(markdown).toContain('## Slide 1: Test Slide 1')
      expect(markdown).toContain('## Slide 2: Test Slide 2')
      
      // Check summaries
      expect(markdown).toContain('### Summary')
      expect(markdown).toContain('A summary of test slide 1.')
      expect(markdown).toContain('A summary of test slide 2.')
      
      // Check key points
      expect(markdown).toContain('### Key Points')
      expect(markdown).toContain('- Key point 1')
      expect(markdown).toContain('- Key point 2')
      expect(markdown).toContain('- Key point 3')
      expect(markdown).toContain('- Key point 4')
      
      // Check concepts
      expect(markdown).toContain('### Key Concepts')
      expect(markdown).toContain('- **Concept 1**: Definition of concept 1')
      expect(markdown).toContain('- **Concept 2**: Definition of concept 2')
      expect(markdown).toContain('- **Concept 3**: Definition of concept 3')
      
      // Check questions
      expect(markdown).toContain('### Practice Questions')
      expect(markdown).toContain('**Q1: Test question 1?**')
      expect(markdown).toContain('**Q1: Test question 1?**')
      expect(markdown).toContain('Option 1')
      expect(markdown).toContain('✓ Option 3') // Correct answer marked
      expect(markdown).toContain('**Q1: Test question 2?**')
      expect(markdown).toContain('Answer: True')
    })
  })
  
  describe('generateHTML', () => {
    it('generates HTML with the correct structure', () => {
      const html = generateHTML(mockSlideData)
      
      // Check basic HTML structure
      expect(html).toContain('<!DOCTYPE html>')
      expect(html).toContain('<html>')
      expect(html).toContain('</html>')
      
      // Check title and metadata
      expect(html).toContain('<title>Test Presentation</title>')
      expect(html).toContain('<h1>Test Presentation</h1>')
      expect(html).toContain('Subject: Testing')
      
      // Check slide content
      expect(html).toContain('<h2>Slide 1: Test Slide 1</h2>')
      expect(html).toContain('<h2>Slide 2: Test Slide 2</h2>')
      
      // Check summaries
      expect(html).toContain('<h3>Summary</h3>')
      expect(html).toContain('A summary of test slide 1.')
      expect(html).toContain('A summary of test slide 2.')
      
      // Check key points
      expect(html).toContain('<h3>Key Points</h3>')
      expect(html).toContain('<li>Key point 1</li>')
      expect(html).toContain('<li>Key point 2</li>')
      expect(html).toContain('<li>Key point 3</li>')
      expect(html).toContain('<li>Key point 4</li>')
      
      // Check concepts
      expect(html).toContain('<h3>Key Concepts</h3>')
      expect(html).toContain('<h4>Concept 1</h4>')
      expect(html).toContain('<h4>Concept 2</h4>')
      expect(html).toContain('<h4>Concept 3</h4>')
      
      // Check questions
      expect(html).toContain('<h3>Practice Questions</h3>')
      expect(html).toContain('<p><strong>Q1:</strong> Test question 1?</p>')
      expect(html).toContain('<li class="correct">Option 3 ✓</li>')
      expect(html).toContain('<p><strong>Q1:</strong> Test question 2?</p>')
      expect(html).toContain('<p>Answer: <span class="correct">True</span></p>')
    })
  })
  
  describe('generatePDF', () => {
    it('returns a Buffer', async () => {
      const pdfBuffer = await generatePDF(mockSlideData)
      
      expect(pdfBuffer).toBeInstanceOf(Buffer)
      expect(pdfBuffer.length).toBeGreaterThan(0)
      
      // In a real implementation with actual PDF generation,
      // we might check PDF headers or content more thoroughly
      expect(pdfBuffer.toString()).toContain('PDF')
    })
  })
}) 