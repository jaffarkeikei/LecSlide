# LecSlide

> **Transform lecture slides into interactive, AI-powered study resources**

LecSlide is a student-centric platform that leverages AI to enhance learning by converting static lecture slides into dynamic study materials with summaries, concept maps, practice questions, and visual aids.

## Table of Contents
- [Vision](#vision)
- [Features](#features)
- [Architecture](#architecture)
- [User Workflow](#user-workflow)
- [Getting Started](#getting-started)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)

## Vision

> "To help students grasp lecture content more fully by generating concise summaries, interactive examples, and custom visual aids from existing slides, ultimately improving study effectiveness."

## Features

### Core Features

1. **AI-Powered Summarization**
   - Extract essential information from slides
   - Generate concise bullet points and paragraphs
   - Create concept maps showing relationships between topics

2. **Interactive Examples & Visual Aids**
   - Automatically generate diagrams, flowcharts, and timelines
   - Create practice questions based on slide content
   - Provide discipline-specific examples (code snippets for CS, problem solutions for STEM)

3. **User-Centric Experience**
   - Simple drag-and-drop interface for slide uploads
   - Support for PDF, PPT, and PPTX formats
   - Customizable outputs and editable AI-generated content

4. **Discipline Customization**
   - Specialized templates for different academic fields
   - Domain-aware AI responses tailored to the subject matter

## Architecture

### System Overview

```mermaid
graph TD
    A[Student] -->|Uploads Slides| B[Web Frontend]
    B -->|API Request| C[Backend API Layer]
    C -->|Process Files| D[File Processing Service]
    C -->|Generate Content| E[AI/NLP Service]
    C -->|Create Visuals| F[Visual Generation Service]
    C -->|Store/Retrieve Data| G[(Database)]
    D -->|Extracted Text/Images| E
    E -->|Generated Content| C
    F -->|Generated Diagrams| C
    C -->|Return Results| B
    B -->|Display Enhanced Content| A
```

### Component Architecture

```mermaid
flowchart TD
    subgraph Frontend
        UI[User Interface] --> Dashboard
        UI --> UploadComponent
        UI --> StudyView
        UI --> ContentEditor
    end

    subgraph Backend
        API[API Gateway] --> FileService
        API --> AIService
        API --> VisualService
        API --> AuthService
        
        FileService --> S3[File Storage]
        AIService --> LLM[Language Models]
        VisualService --> DiagramEngine
    end

    subgraph Database
        Users[(User Data)]
        Files[(File Metadata)]
        Results[(AI Results)]
    end

    Frontend <--> API
    FileService <--> Files
    AIService <--> Results
    AuthService <--> Users
```

## User Workflow

```mermaid
sequenceDiagram
    actor Student
    participant UI as Web Interface
    participant API as Backend API
    participant File as File Processing
    participant AI as AI Engine
    participant DB as Database

    Student->>UI: Upload slides (PDF/PPT)
    UI->>API: Send file
    API->>File: Process file
    File->>AI: Extract text & structure
    AI->>AI: Generate summaries, examples, visuals
    AI->>DB: Store generated content
    DB->>API: Return processed results
    API->>UI: Display enhanced content
    UI->>Student: Show interactive study materials
    Student->>UI: Edit/customize if needed
    Student->>UI: Export or study directly
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB

### Installation

```bash
# Clone the repository
git clone https://github.com/jaffarkeikei/LecSlide.git
cd LecSlide

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev

```

## Tech Stack

```mermaid
graph TD
    subgraph Frontend
        A[React] --> B[Next.js]
        B --> C[TailwindCSS]
        B --> D[React Query]
    end
    
    subgraph Backend
        E[Node.js] --> F[Express]
        F --> G[MongoDB]
        F --> H[Google API]
        F --> I[Cloud Storage]
    end
    
    subgraph DevOps
        J[Docker] --> K[CI/CD Pipeline]
        K --> L[Cloud Deployment]
    end
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 