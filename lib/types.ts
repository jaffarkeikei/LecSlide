/**
 * Represents a slide extracted from a presentation file
 */
export interface ExtractedSlide {
  title: string;
  content: string;
}

/**
 * Represents the data structure for slides
 */
export interface SlideData {
  title: string;
  subject: string;
  slides: Slide[];
}

/**
 * Represents a single slide with enhanced content
 */
export interface Slide {
  title: string;
  content: string;
  summary?: string;
  keyPoints?: string[];
  keyConcepts?: string[];
  practiceQuestions?: PracticeQuestion[];
}

/**
 * Represents a practice question
 */
export interface PracticeQuestion {
  question: string;
  type: 'multiple-choice' | 'true-false' | 'open-ended';
  options?: string[];
  answer?: string | number | boolean;
} 