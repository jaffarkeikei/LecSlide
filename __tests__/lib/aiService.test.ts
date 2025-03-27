import {
  generateSlideSummary,
  extractConcepts,
  generatePracticeQuestions,
  generateVisualAid,
  processSlide
} from '@/lib/aiService'

// Mock the Google Generative AI client
jest.mock('@google/generative-ai', () => {
  const mockGenerateContent = jest.fn();

  // Default implementation
  mockGenerateContent.mockImplementation(() => ({
    response: {
      text: () => {
        return `
        {
          "summary": "This is a mock summary of the slide content.",
          "keyPoints": ["Key point 1", "Key point 2", "Key point 3"]
        }
        `;
      }
    }
  }));

  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
      getGenerativeModel: jest.fn().mockImplementation(() => ({
        generateContent: mockGenerateContent
      }))
    }))
  };
});

describe('AI Service', () => {
  const mockSlideContent = {
    title: 'Introduction to AI',
    content: 'Artificial Intelligence (AI) is the simulation of human intelligence in machines.'
  };

  let generateContentMock;

  beforeEach(() => {
    jest.clearAllMocks();
    generateContentMock = require('@google/generative-ai').GoogleGenerativeAI().getGenerativeModel().generateContent;
    
    // Test-specific mocks for different endpoints
    generateContentMock.mockImplementation((prompt) => {
      if (prompt.includes('Extract key concepts')) {
        return {
          response: {
            text: () => {
              return `
              [
                { "id": "concept1", "name": "Concept 1", "definition": "Definition of concept 1" },
                { "id": "concept2", "name": "Concept 2", "definition": "Definition of concept 2" }
              ]
              `;
            }
          }
        };
      } else if (prompt.includes('Generate practice questions')) {
        return {
          response: {
            text: () => {
              return `
              [
                {
                  "id": "q1",
                  "type": "multiple-choice",
                  "question": "Test question?",
                  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                  "correctAnswer": 1
                },
                {
                  "id": "q2",
                  "type": "true-false",
                  "question": "This is a true/false question.",
                  "correctAnswer": true
                }
              ]
              `;
            }
          }
        };
      } else if (prompt.includes('Generate a flowchart')) {
        return {
          response: {
            text: () => {
              return `
              {
                "type": "flowchart",
                "data": {
                  "nodes": [
                    { "id": "node1", "label": "Node 1" },
                    { "id": "node2", "label": "Node 2" }
                  ],
                  "edges": [
                    { "from": "node1", "to": "node2" }
                  ]
                }
              }
              `;
            }
          }
        };
      } else {
        return {
          response: {
            text: () => {
              return `
              {
                "summary": "This is a mock summary of the slide content.",
                "keyPoints": ["Key point 1", "Key point 2", "Key point 3"]
              }
              `;
            }
          }
        };
      }
    });
  });

  describe('generateSlideSummary', () => {
    it('returns a summary and key points for the provided slide', async () => {
      const result = await generateSlideSummary(mockSlideContent);
      expect(result).toEqual({
        summary: "This is a mock summary of the slide content.",
        keyPoints: ["Key point 1", "Key point 2", "Key point 3"]
      });
    });

    it('handles errors gracefully', async () => {
      generateContentMock.mockRejectedValueOnce(new Error('API error'));
      await expect(generateSlideSummary(mockSlideContent)).rejects.toThrow('Failed to generate slide summary');
    });
  });

  describe('extractConcepts', () => {
    it('returns concepts for the provided slide', async () => {
      const concepts = await extractConcepts(mockSlideContent);
      expect(concepts).toEqual([
        { id: "concept1", name: "Concept 1", definition: "Definition of concept 1" },
        { id: "concept2", name: "Concept 2", definition: "Definition of concept 2" }
      ]);
    });
  });

  describe('generatePracticeQuestions', () => {
    it('returns questions for the provided slide', async () => {
      const questions = await generatePracticeQuestions(mockSlideContent);
      expect(questions).toEqual([
        {
          id: "q1",
          type: "multiple-choice",
          question: "Test question?",
          options: ["Option 1", "Option 2", "Option 3", "Option 4"],
          correctAnswer: 1
        },
        {
          id: "q2",
          type: "true-false",
          question: "This is a true/false question.",
          correctAnswer: true
        }
      ]);
    });
  });

  describe('generateVisualAid', () => {
    it('returns a visual aid for the provided slide', async () => {
      const visualAid = await generateVisualAid(mockSlideContent);
      expect(visualAid).toEqual({
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
      });
    });
  });

  describe('processSlide', () => {
    it('processes a slide and returns all enhanced content', async () => {
      const result = await processSlide(mockSlideContent);
      expect(result).toHaveProperty('summary');
      expect(result).toHaveProperty('keyPoints');
      expect(result).toHaveProperty('concepts');
      expect(result).toHaveProperty('questions');
      expect(result).toHaveProperty('visualAid');
    });
  });
}); 