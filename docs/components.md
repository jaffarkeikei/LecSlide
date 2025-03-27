# UI Components Documentation

LecSlide uses a set of React components to build its user interface. This document provides detailed information about each component, its props, and its role in the application.

## Component Overview

```mermaid
graph LR
    App[App] --> FileUploader
    App --> ProcessingSteps
    App --> SlideViewer
    SlideViewer --> SummaryCard
    SlideViewer --> ConceptMap
    SlideViewer --> PracticeQuestions
```

## Core Components

### FileUploader

The FileUploader component handles file selection and validation for presentation uploads.

```mermaid
classDiagram
    class FileUploaderProps {
        +File file
        +function onChange(file)
        +boolean disabled
        +string[] acceptedFileTypes
        +number maxSize
    }
    
    class FileUploader {
        +render()
        -onDrop(files)
        -removeFile()
    }
    
    FileUploader --> FileUploaderProps : uses
```

**Key Features:**
- Drag and drop interface
- File type validation (.pdf, .ppt, .pptx)
- Size limit enforcement (default 20MB)
- Visual feedback for file selection
- Error messaging for invalid files

### ProcessingSteps

The ProcessingSteps component displays the current status of file processing.

```mermaid
classDiagram
    class ProcessingStepsProps {
        +string status
        +number currentStep
        +number totalSteps
        +string[] stepLabels
        +Error error
    }
    
    class ProcessingSteps {
        +render()
    }
    
    ProcessingSteps --> ProcessingStepsProps : uses
```

**Key Features:**
- Visual indication of processing stages
- Progress tracking
- Error state handling
- Step completion feedback

### SlideViewer

The SlideViewer component displays the content of individual slides.

```mermaid
classDiagram
    class SlideViewerProps {
        +Slide slide
    }
    
    class SlideViewer {
        +render()
    }
    
    SlideViewer --> SlideViewerProps : uses
```

**Key Features:**
- Clean presentation of slide content
- Responsive layout
- Styling consistent with presentation format

### SummaryCard

The SummaryCard component displays AI-generated summaries of slide content.

```mermaid
classDiagram
    class SummaryCardProps {
        +string summary
        +string[] keyPoints
        +function onRegenerate
        +boolean isRegenerating
    }
    
    class SummaryCard {
        +render()
    }
    
    SummaryCard --> SummaryCardProps : uses
```

**Key Features:**
- Concise presentation of summaries
- Bulleted list of key points
- Optional regeneration button
- Loading state for regeneration

### ConceptMap

The ConceptMap component visualizes relationships between key concepts using a force-directed graph.

```mermaid
classDiagram
    class ConceptMapProps {
        +Concept[] concepts
        +VisualAid visualAid
    }
    
    class ConceptMap {
        +render()
    }
    
    ConceptMap --> ConceptMapProps : uses
```

**Key Features:**
- Interactive graph visualization
- Nodes representing concepts
- Edges representing relationships
- Customizable appearance

### PracticeQuestions

The PracticeQuestions component displays interactive quiz questions based on slide content.

```mermaid
classDiagram
    class PracticeQuestionsProps {
        +Question[] questions
    }
    
    class PracticeQuestions {
        +render()
        -handleAnswerSelect(questionId, answer)
        -checkAnswer(questionId)
        -checkAllAnswers()
        -reset()
        -getScore()
    }
    
    PracticeQuestions --> PracticeQuestionsProps : uses
```

**State Management:**
```mermaid
stateDiagram-v2
    [*] --> Unanswered
    Unanswered --> AnswerSelected: Select answer
    AnswerSelected --> Checked: Check answer
    Checked --> [*]
    
    Unanswered --> Reset: Reset button
    AnswerSelected --> Reset: Reset button
    Checked --> Reset: Reset button
    Reset --> Unanswered
```

**Key Features:**
- Multiple choice questions
- True/false questions
- Immediate feedback
- Score tracking
- Answer validation
- Reset functionality

## Component Interaction Example

The following diagram shows how components interact during a typical user flow:

```mermaid
sequenceDiagram
    participant User
    participant FU as FileUploader
    participant PS as ProcessingSteps
    participant SV as SlideViewer
    participant SC as SummaryCard
    participant CM as ConceptMap
    participant PQ as PracticeQuestions
    
    User->>FU: Upload presentation
    FU->>PS: Update status to "Processing"
    PS-->>User: Display processing steps
    PS->>SV: Display processed slides
    SV->>SC: Display slide summary
    SV->>CM: Display concept map
    SV->>PQ: Display practice questions
    User->>SC: Click "Regenerate"
    SC->>SC: Update with new summary
    User->>PQ: Answer question
    PQ->>PQ: Provide feedback
``` 