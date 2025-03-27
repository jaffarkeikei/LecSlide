# AI Integration Documentation

LecSlide leverages Google's Gemini AI to transform presentation content into valuable learning materials. This document details how AI is integrated into the application.

## AI Service Architecture

```mermaid
graph TB
    subgraph "Application"
        API[API Layer]
        AIService[AI Service]
        FileProc[File Processing]
        UI[User Interface]
    end
    
    subgraph "External AI"
        Gemini[Google Gemini AI]
    end
    
    FileProc --"Extracted Text"--> AIService
    AIService --"Prompts"--> Gemini
    Gemini --"Responses"--> AIService
    AIService --"Enhanced Content"--> API
    API --"Processed Data"--> UI
```

## AI Processing Pipeline

```mermaid
flowchart TB
    Upload[File Upload] --> Extract[Extract Text]
    Extract --> Process[AI Processing]
    
    subgraph "AI Processing"
        Summary[Generate Summary]
        KeyPoints[Extract Key Points]
        Concepts[Extract Concepts]
        Questions[Generate Questions]
        Visual[Generate Visual Aid]
    end
    
    Process --> Summary
    Process --> KeyPoints
    Process --> Concepts
    Process --> Questions
    Process --> Visual
    
    Summary --> Combine[Combine Results]
    KeyPoints --> Combine
    Concepts --> Combine
    Questions --> Combine
    Visual --> Combine
    
    Combine --> Display[Display Results]
```

## AI Service Functions

The AI service (`aiService.ts`) provides several functions that interact with the Gemini AI model:

```mermaid
classDiagram
    class AIService {
        +generateSlideSummary(slideContent)
        +extractConcepts(slideContent)
        +generatePracticeQuestions(slideContent)
        +generateVisualAid(slideContent)
        +processSlide(slideContent)
    }
    
    class GoogleGenerativeAI {
        +getGenerativeModel()
    }
    
    class GenerativeModel {
        +generateContent(prompt)
    }
    
    AIService --> GoogleGenerativeAI : uses
    GoogleGenerativeAI --> GenerativeModel : creates
```

### Function Details

#### generateSlideSummary

This function creates a concise summary and key points from slide content.

```mermaid
sequenceDiagram
    participant App as Application
    participant AIS as AI Service
    participant Gemini as Gemini AI
    
    App->>AIS: generateSlideSummary(slideContent)
    AIS->>AIS: Create prompt with slide content
    AIS->>Gemini: Send prompt to model
    Gemini->>Gemini: Process content
    Gemini-->>AIS: Return JSON response
    AIS->>AIS: Parse response
    AIS-->>App: Return summary object
```

Input/Output:
```javascript
// Input
const slideContent = {
  title: "Introduction to AI",
  content: "Artificial intelligence (AI) is intelligence demonstrated by machines..."
};

// Output
const result = {
  summary: "AI refers to the simulation of human intelligence in machines...",
  keyPoints: [
    "AI uses algorithms to process data",
    "Machine learning is a subset of AI",
    "Neural networks are inspired by the human brain"
  ]
};
```

#### extractConcepts

This function identifies and defines key concepts from the slide content.

```mermaid
sequenceDiagram
    participant App as Application
    participant AIS as AI Service
    participant Gemini as Gemini AI
    
    App->>AIS: extractConcepts(slideContent)
    AIS->>AIS: Create prompt with slide content
    AIS->>Gemini: Send prompt to model
    Gemini->>Gemini: Process content
    Gemini-->>AIS: Return JSON array
    AIS->>AIS: Parse response
    AIS-->>App: Return concepts array
```

#### generatePracticeQuestions

This function creates interactive quiz questions based on slide content.

```mermaid
sequenceDiagram
    participant App as Application
    participant AIS as AI Service
    participant Gemini as Gemini AI
    
    App->>AIS: generatePracticeQuestions(slideContent)
    AIS->>AIS: Create prompt with slide content
    AIS->>Gemini: Send prompt to model
    Gemini->>Gemini: Process content
    Gemini-->>AIS: Return JSON array
    AIS->>AIS: Parse response
    AIS-->>App: Return questions array
```

#### generateVisualAid

This function creates a visual representation of the concepts or process described in the slide.

```mermaid
sequenceDiagram
    participant App as Application
    participant AIS as AI Service
    participant Gemini as Gemini AI
    
    App->>AIS: generateVisualAid(slideContent)
    AIS->>AIS: Create prompt with slide content
    AIS->>Gemini: Send prompt to model
    Gemini->>Gemini: Process content
    Gemini-->>AIS: Return JSON object
    AIS->>AIS: Parse response
    AIS-->>App: Return visualAid object
```

#### processSlide

This function combines all AI processing for a single slide.

```mermaid
sequenceDiagram
    participant App as Application
    participant PS as processSlide
    participant SS as generateSlideSummary
    participant EC as extractConcepts
    participant GPQ as generatePracticeQuestions
    participant GVA as generateVisualAid
    
    App->>PS: processSlide(slideContent)
    par Parallel processing
        PS->>SS: generateSlideSummary(slideContent)
        PS->>EC: extractConcepts(slideContent)
        PS->>GPQ: generatePracticeQuestions(slideContent)
        PS->>GVA: generateVisualAid(slideContent)
    end
    SS-->>PS: Return summary and key points
    EC-->>PS: Return concepts
    GPQ-->>PS: Return questions
    GVA-->>PS: Return visual aid
    PS->>PS: Combine results
    PS-->>App: Return enhanced slide
```

## Prompt Engineering

LecSlide uses structured prompts to get consistent, formatted responses from the Gemini AI model.

```mermaid
graph TD
    subgraph "Prompt Structure"
        Instruction[Clear Instruction]
        Content[Content Context]
        ResponseFormat[Response Format]
        Example[Example if needed]
    end
    
    Prompt[Final Prompt] --> Instruction
    Prompt --> Content
    Prompt --> ResponseFormat
    Prompt --> Example
```

Example prompt for summary generation:
```
Generate a concise summary and key points for the following slide content:

Title: {slide.title}
Content: {slide.content}

Respond with a JSON object with the following format:
{
  "summary": "A one-paragraph summary of the slide content",
  "keyPoints": ["Key point 1", "Key point 2", "Key point 3", "Key point 4"]
}
```

## Response Parsing

```mermaid
flowchart TD
    AI[AI Response] --> Text[Extract Text]
    Text --> Pattern[Match JSON Pattern]
    Pattern --> Parse[Parse JSON]
    Parse --> Validate[Validate Structure]
    Validate --> Return[Return Data]
    
    Pattern -- No Match --> Error[Throw Error]
    Parse -- Invalid JSON --> Error
    Validate -- Invalid Structure --> Error
```

## Error Handling

```mermaid
flowchart TD
    Try[Try AI Operation] --> Error{Error?}
    Error -- Yes --> Log[Log Error]
    Log --> Throw[Throw Application Error]
    Error -- No --> Success[Return Result]
``` 