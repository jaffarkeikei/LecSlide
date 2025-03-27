import { Slide, SlideData } from './api'

/**
 * Generate markdown content from slide data
 */
export function generateMarkdown(slideData: SlideData): string {
  let markdown = `# ${slideData.title}\n\n`
  markdown += `Subject: ${slideData.subject}\n\n`
  markdown += `Generated with LecSlide on ${new Date().toLocaleDateString()}\n\n`
  
  // Add each slide
  slideData.slides.forEach((slide, index) => {
    markdown += `## Slide ${index + 1}: ${slide.title}\n\n`
    
    // Add original content
    markdown += `${slide.content}\n\n`
    
    // Add summary
    markdown += `### Summary\n\n`
    markdown += `${slide.summary}\n\n`
    
    // Add key points
    markdown += `### Key Points\n\n`
    slide.keyPoints.forEach(point => {
      markdown += `- ${point}\n`
    })
    markdown += '\n'
    
    // Add concepts
    markdown += `### Key Concepts\n\n`
    slide.concepts.forEach(concept => {
      markdown += `- **${concept.name}**: ${concept.definition}\n`
    })
    markdown += '\n'
    
    // Add questions
    markdown += `### Practice Questions\n\n`
    slide.questions.forEach((question, qIndex) => {
      markdown += `**Q${qIndex + 1}: ${question.question}**\n\n`
      
      if (question.type === 'multiple-choice' && question.options) {
        question.options.forEach((option, optIndex) => {
          const marker = optIndex === question.correctAnswer ? '✓ ' : ''
          markdown += `${optIndex === question.correctAnswer ? marker : ''}${option}${optIndex === question.correctAnswer ? ' ✓' : ''}\n`
        })
        markdown += '\n'
      } else if (question.type === 'true-false') {
        markdown += `Answer: ${question.correctAnswer ? 'True' : 'False'}\n\n`
      }
    })
    
    // Add separator between slides
    markdown += '---\n\n'
  })
  
  return markdown
}

/**
 * Generate HTML content from slide data
 */
export function generateHTML(slideData: SlideData): string {
  let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${slideData.title}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
    h1 { color: #2563eb; }
    h2 { color: #1e40af; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; }
    h3 { color: #374151; }
    h4 { color: #4b5563; }
    .metadata { color: #6b7280; font-size: 0.875rem; margin-bottom: 2rem; }
    .slide { margin-bottom: 3rem; border: 1px solid #e5e7eb; padding: 1.5rem; border-radius: 0.5rem; }
    .summary { background-color: #eff6ff; padding: 1rem; border-radius: 0.25rem; }
    .concepts { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; }
    .concept { background-color: #f3f4f6; padding: 1rem; border-radius: 0.25rem; }
    .correct { color: #047857; }
  </style>
</head>
<body>
  <h1>${slideData.title}</h1>
  <div class="metadata">
    <p>Subject: ${slideData.subject}</p>
    <p>Generated with LecSlide on ${new Date().toLocaleDateString()}</p>
  </div>`
  
  // Add each slide
  slideData.slides.forEach((slide, index) => {
    html += `<div class="slide">
    <h2>Slide ${index + 1}: ${slide.title}</h2>
    
    <div class="content">
      <p>${slide.content}</p>
    </div>
    
    <div class="summary">
      <h3>Summary</h3>
      <p>${slide.summary}</p>
    </div>
    
    <div class="key-points">
      <h3>Key Points</h3>
      <ul>`
    
    slide.keyPoints.forEach(point => {
      html += `<li>${point}</li>`
    })
    
    html += `</ul>
    </div>
    
    <div class="key-concepts">
      <h3>Key Concepts</h3>
      <div class="concepts">`
    
    slide.concepts.forEach(concept => {
      html += `<div class="concept">
        <h4>${concept.name}</h4>
        <p>${concept.definition}</p>
      </div>`
    })
    
    html += `</div>
    </div>
    
    <div class="practice-questions">
      <h3>Practice Questions</h3>`
    
    slide.questions.forEach((question, qIndex) => {
      html += `<div class="question">
        <p><strong>Q${qIndex + 1}:</strong> ${question.question}</p>`
      
      if (question.type === 'multiple-choice' && question.options) {
        html += `<ol>`
        question.options.forEach((option, optIndex) => {
          html += `<li${optIndex === question.correctAnswer ? ' class="correct"' : ''}>${option}${optIndex === question.correctAnswer ? ' ✓' : ''}</li>`
        })
        html += `</ol>`
      } else if (question.type === 'true-false') {
        html += `<p>Answer: <span class="correct">${question.correctAnswer ? 'True' : 'False'}</span></p>`
      }
      
      html += `</div>`
    })
    
    html += `</div>
  </div>`
  })
  
  html += `</body>
</html>`
  
  return html
}

/**
 * Generate PDF content from slide data
 * This is a mock implementation that returns a simple PDF buffer
 */
export async function generatePDF(slideData: SlideData): Promise<Buffer> {
  // In a real implementation, this would convert HTML to PDF using a library like puppeteer or pdfkit
  // For test purposes, we'll just return a mock PDF buffer
  const html = generateHTML(slideData)
  
  // Mock PDF buffer that contains the word "PDF" for testing
  return Buffer.from(`PDF document for ${slideData.title}\n${html.substring(0, 100)}...`)
} 