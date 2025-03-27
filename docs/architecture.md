# LecSlide Architecture Documentation

LecSlide is a Next.js application designed to transform presentation files (PDF, PowerPoint) into interactive learning materials with AI-enhanced features.

## System Architecture

```mermaid
graph TB
    subgraph "Frontend"
        UI[User Interface]
        Components[React Components]
        Hooks[Custom Hooks]
        Context[Context API]
    end
    
    subgraph "Backend"
        API[Next.js API Routes]
        AI[AI Service]
        File[File Processing]
        Export[Export Utils]
    end
    
    subgraph "External Services"
        Gemini[Google Gemini AI]
        Storage[File Storage]
    end
    
    UI --> Components
    Components --> Hooks
    Components --> Context
    UI --> API
    API --> AI
    API --> File
    API --> Export
    AI --> Gemini
    File --> Storage
    Export --> Storage
```

## Application Flow

```mermaid
sequenceDiagram
    participant User
    participant UI as User Interface
    participant API as API Routes
    participant FP as File Processing
    participant AI as AI Service
    participant Export as Export Utils
    
    User->>UI: Upload slide presentation
    UI->>API: POST /slides/upload
    API->>FP: Extract slides from file
    FP-->>API: Return extracted slides
    API->>AI: Process slide content
    AI-->>API: Return enhanced content
    API-->>UI: Return processed session
    UI->>User: Display enhanced slides
    
    User->>UI: Request export
    UI->>API: GET /slides/{id}/export
    API->>Export: Generate export file
    Export-->>API: Return download URL
    API-->>UI: Return download URL
    UI->>User: Provide download link
```

## Component Architecture

```mermaid
graph TD
    subgraph "Core Components"
        FileUploader[FileUploader]
        ProcessingSteps[ProcessingSteps]
        SlideViewer[SlideViewer]
        SummaryCard[SummaryCard]
        PracticeQuestions[PracticeQuestions]
        ConceptMap[ConceptMap]
    end
    
    subgraph "Pages"
        HomePage[Home Page]
        DashboardPage[Dashboard]
        ResultsPage[Results Page]
    end
    
    HomePage --> FileUploader
    HomePage --> ProcessingSteps
    ResultsPage --> SlideViewer
    ResultsPage --> SummaryCard
    ResultsPage --> PracticeQuestions
    ResultsPage --> ConceptMap
    
    FileUploader -.-> |Props| ProcessingSteps
    SlideViewer -.-> |Props| SummaryCard
    SlideViewer -.-> |Props| PracticeQuestions
    SlideViewer -.-> |Props| ConceptMap
```

## Data Model

```mermaid
classDiagram
    class SlideData {
        +string title
        +string subject
        +Slide[] slides
    }
    
    class Slide {
        +number id
        +string title
        +string content
        +string summary
        +string[] keyPoints
        +Concept[] concepts
        +Question[] questions
        +VisualAid visualAid
    }
    
    class Concept {
        +string id
        +string name
        +string definition
    }
    
    class Question {
        +string id
        +string type
        +string question
        +string[] options
        +any correctAnswer
    }
    
    class VisualAid {
        +string type
        +object data
    }
    
    SlideData "1" --> "*" Slide
    Slide "1" --> "*" Concept
    Slide "1" --> "*" Question
    Slide "1" --> "0..1" VisualAid
```

## Technology Stack

```mermaid
flowchart TB
    subgraph "Frontend"
        Next.js
        React
        TailwindCSS
        Axios
    end
    
    subgraph "Backend"
        NextAPI[Next.js API Routes]
        NodeJS
    end
    
    subgraph "AI/ML"
        GoogleGemini[Google Gemini AI]
    end
    
    subgraph "Testing"
        Jest
        RTL[React Testing Library]
    end
    
    subgraph "Build Tools"
        TypeScript
        ESLint
        SWC
    end
``` 