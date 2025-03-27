import { extractTextFromFile, extractTextFromPdf, extractTextFromPowerPoint } from '@/lib/fileProcessing';

// Mock Buffer and File implementations
global.File = class MockFile {
  name: string;
  type: string;
  buffer: Buffer;

  constructor(buffer: Buffer[], name: string, options: { type: string }) {
    this.name = name;
    this.type = options.type;
    this.buffer = Buffer.concat(buffer);
  }

  async arrayBuffer() {
    return this.buffer;
  }
} as any;

// Mock implementations for the pdf-lib and pptxgenjs libraries
jest.mock('pdf-lib', () => ({
  PDFDocument: {
    load: jest.fn().mockResolvedValue({
      getPageCount: jest.fn().mockReturnValue(2),
      getPage: jest.fn().mockReturnValue({
        getTextContent: jest.fn().mockReturnValue('Sample PDF text'),
      }),
    }),
  },
}));

// Create a mock instance with a load method that can be mocked for error testing
const mockPptxLoad = jest.fn().mockResolvedValue({
  getSlides: jest.fn().mockReturnValue([
    {
      getTitle: jest.fn().mockReturnValue('Slide 1'),
      getTextContent: jest.fn().mockReturnValue('Sample PowerPoint text 1'),
    },
    {
      getTitle: jest.fn().mockReturnValue('Slide 2'),
      getTextContent: jest.fn().mockReturnValue('Sample PowerPoint text 2'),
    },
  ]),
});

jest.mock('pptxgenjs', () => {
  return jest.fn().mockImplementation(() => ({
    load: mockPptxLoad
  }));
});

describe('File Processing Utilities', () => {
  describe('extractTextFromPdf', () => {
    it('successfully extracts text from a PDF file', async () => {
      const mockPdfBuffer = Buffer.from('mock PDF content');
      const result = await extractTextFromPdf(mockPdfBuffer);
      
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('title');
      expect(result[0]).toHaveProperty('content');
    });
    
    it('handles errors gracefully', async () => {
      const { PDFDocument } = require('pdf-lib');
      PDFDocument.load.mockRejectedValueOnce(new Error('PDF load error'));
      
      const mockPdfBuffer = Buffer.from('corrupt PDF content');
      
      await expect(extractTextFromPdf(mockPdfBuffer)).rejects.toThrow('Error extracting text from PDF');
    });
  });
  
  describe('extractTextFromPowerPoint', () => {
    it('successfully extracts text from a PowerPoint file', async () => {
      const mockPptxBuffer = Buffer.from('mock PowerPoint content');
      const result = await extractTextFromPowerPoint(mockPptxBuffer);
      
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('title');
      expect(result[0]).toHaveProperty('content');
    });
    
    it('handles errors gracefully', async () => {
      // Set up mockPptxLoad to reject
      mockPptxLoad.mockRejectedValueOnce(new Error('PowerPoint load error'));
      
      const mockPptxBuffer = Buffer.from('corrupt PowerPoint content');
      
      await expect(extractTextFromPowerPoint(mockPptxBuffer)).rejects.toThrow('Error extracting text from PowerPoint');
    });
  });
  
  describe('extractTextFromFile', () => {
    it('processes PDF files correctly', async () => {
      const mockPdfFile = new File([Buffer.from('mock PDF content')], 'test.pdf', { type: 'application/pdf' });
      
      const result = await extractTextFromFile(mockPdfFile);
      
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
    });
    
    it('processes PowerPoint files correctly', async () => {
      const mockPptxFile = new File(
        [Buffer.from('mock PowerPoint content')], 
        'test.pptx', 
        { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' }
      );
      
      const result = await extractTextFromFile(mockPptxFile);
      
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
    });
    
    it('rejects unsupported file types', async () => {
      const mockTextFile = new File([Buffer.from('Plain text content')], 'test.txt', { type: 'text/plain' });
      
      await expect(extractTextFromFile(mockTextFile)).rejects.toThrow('Unsupported file type');
    });
  });
}); 