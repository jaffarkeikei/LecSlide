import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import type { Slide, Concept, Question, VisualAid } from './api'

// Initialize Google Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

interface SlideContent {
  title: string
  content: string
}

export async function generateSlideSummary(slideContent: SlideContent): Promise<{
  summary: string
  keyPoints: string[]
}> {
  try {
    const prompt = `
      Generate a concise summary and key points for the following slide content:
      
      Title: ${slideContent.title}
      Content: ${slideContent.content}
      
      Respond with a JSON object with the following format:
      {
        "summary": "A one-paragraph summary of the slide content",
        "keyPoints": ["Key point 1", "Key point 2", "Key point 3", "Key point 4"]
      }
    `

    const result = await model.generateContent(prompt);
    const response = result.response;
    const responseText = response.text();
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('Failed to parse JSON response');
    }
    
    const parsedResponse = JSON.parse(jsonMatch[0]);
    
    return {
      summary: parsedResponse.summary,
      keyPoints: parsedResponse.keyPoints,
    }
  } catch (error) {
    console.error('Error generating slide summary:', error)
    throw new Error('Failed to generate slide summary')
  }
}

export async function extractConcepts(slideContent: SlideContent): Promise<Concept[]> {
  try {
    const prompt = `
      Extract key concepts from the following slide content:
      
      Title: ${slideContent.title}
      Content: ${slideContent.content}
      
      Respond with a JSON array with the following format:
      [
        {
          "id": "concept1",
          "name": "Concept name",
          "definition": "Clear definition of the concept"
        },
        ...
      ]
      
      Extract 2-4 key concepts.
    `

    const result = await model.generateContent(prompt);
    const response = result.response;
    const responseText = response.text();
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    
    if (!jsonMatch) {
      throw new Error('Failed to parse JSON response');
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error extracting concepts:', error)
    throw new Error('Failed to extract concepts')
  }
}

export async function generatePracticeQuestions(slideContent: SlideContent): Promise<Question[]> {
  try {
    const prompt = `
      Generate practice questions based on the following slide content:
      
      Title: ${slideContent.title}
      Content: ${slideContent.content}
      
      Create 2 questions:
      - 1 multiple-choice question with 4 options
      - 1 true/false question
      
      Respond with a JSON array with the following format:
      [
        {
          "id": "q1",
          "type": "multiple-choice",
          "question": "Question text",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "correctAnswer": 0 // Index of the correct option (0-3)
        },
        {
          "id": "q2",
          "type": "true-false",
          "question": "Question text",
          "correctAnswer": true // or false
        }
      ]
    `

    const result = await model.generateContent(prompt);
    const response = result.response;
    const responseText = response.text();
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    
    if (!jsonMatch) {
      throw new Error('Failed to parse JSON response');
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error generating practice questions:', error)
    throw new Error('Failed to generate practice questions')
  }
}

export async function generateVisualAid(slideContent: SlideContent): Promise<VisualAid> {
  try {
    const prompt = `
      Generate a flowchart visualization based on the following slide content:
      
      Title: ${slideContent.title}
      Content: ${slideContent.content}
      
      Respond with a JSON object with the following format:
      {
        "type": "flowchart",
        "data": {
          "nodes": [
            {
              "id": "node1", 
              "label": "Node label"
            },
            ...
          ],
          "edges": [
            {
              "from": "node1",
              "to": "node2"
            },
            ...
          ]
        }
      }
      
      Create a flowchart with 5-7 nodes that visualizes the key concepts or process.
    `

    const result = await model.generateContent(prompt);
    const response = result.response;
    const responseText = response.text();
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('Failed to parse JSON response');
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error generating visual aid:', error)
    throw new Error('Failed to generate visual aid')
  }
}

export async function processSlide(slideContent: SlideContent): Promise<Partial<Slide>> {
  try {
    // Process all slide elements in parallel
    const [summaryResult, concepts, questions, visualAid] = await Promise.all([
      generateSlideSummary(slideContent),
      extractConcepts(slideContent),
      generatePracticeQuestions(slideContent),
      generateVisualAid(slideContent),
    ])

    return {
      title: slideContent.title,
      content: slideContent.content,
      summary: summaryResult.summary,
      keyPoints: summaryResult.keyPoints,
      concepts,
      questions,
      visualAid,
    }
  } catch (error) {
    console.error('Error processing slide:', error)
    throw new Error('Failed to process slide')
  }
} 