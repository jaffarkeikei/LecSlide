# File Processing and Export Documentation

LecSlide includes robust file processing capabilities for both input (PDF, PowerPoint) and output (markdown, HTML, PDF) documents. This document details these processes.

## File Processing Architecture

```mermaid
graph TD
    Upload[Upload File] --> Validate[Validate File]
    Validate --> Process{Process by File Type}
    
    Process -->|PDF| PDF[Extract from PDF]
    Process -->|PowerPoint| PPT[Extract from PowerPoint]
    
    PDF --> Normalize[Normalize Slide Format]
    PPT --> Normalize
    
    Normalize --> Store[Store Extracted Content]
```

## File Processing Flow

```mermaid
sequenceDiagram
    participant User
    participant UI as User Interface
    participant API as API Routes
    participant FP as File Processing
    participant Storage as Data Storage
    
    User->>UI: Upload presentation file
    UI->>API: POST /slides/upload with file
    API->>FP: extractTextFromFile(file)
    
    alt PDF file
        FP->>FP: extractTextFromPdf(buffer)
    else PowerPoint file
        FP->>FP: extractTextFromPowerPoint(buffer)
    end
    
    FP-->>API: Return extracted slides
    API->>Storage: Store slides
    Storage-->>API: Return session ID
    API-->>UI: Return session details
    UI-->>User: Display processing success
```

## Input File Processing

### PDF Processing

LecSlide uses `pdf-lib` to extract content from PDF files.

```mermaid
classDiagram
    class PDFDocument {
        +getPageCount()
        +getPage(index)
    }
    
    class PDFPage {
        +getTextContent()
    }
    
    class ExtractedSlide {
        +string title
        +string content
    }
    
    PDFDocument --> PDFPage : contains
    PDFPage --> ExtractedSlide : transforms to
```

### PowerPoint Processing

For PowerPoint files, LecSlide uses specialized libraries to extract slide content.

```mermaid
flowchart TB
    PPTXFile[PPTX File] --> Buffer[ArrayBuffer]
    Buffer --> Parser[PPTX Parser]
    Parser --> Slides[Slides Collection]
    Slides --> Process[Process Each Slide]
    Process --> Extract[Extract Title & Content]
    Extract --> Format[Format as ExtractedSlide]
```

## Export Functionality

LecSlide provides multiple export formats for enhanced slide content.

```mermaid
graph TD
    Export[Export Request] --> Format{Format Type}
    
    Format -->|Markdown| MD[Generate Markdown]
    Format -->|HTML| HTML[Generate HTML]
    Format -->|PDF| PDF[Generate PDF]
    
    MD --> MDFile[Markdown File]
    HTML --> HTMLFile[HTML File]
    PDF --> PDFFile[PDF File]
    
    MDFile --> Download[Download File]
    HTMLFile --> Download
    PDFFile --> Download
```

### Export Service Functions

The export utilities in `exportUtils.ts` provide functions for generating different output formats:

```mermaid
classDiagram
    class ExportUtils {
        +generateMarkdown(slideData) string
        +generateHTML(slideData) string
        +generatePDF(slideData) Buffer
    }
    
    class SlideData {
        +string title
        +string subject
        +Slide[] slides
    }
    
    ExportUtils --> SlideData : processes
```

### Markdown Generation

The markdown export creates a structured document with all slide content:

```mermaid
flowchart TD
    Start[Start Markdown Generation] --> Title[Add Document Title]
    Title --> Meta[Add Metadata]
    Meta --> Iterate[Iterate Through Slides]
    
    subgraph "For Each Slide"
        SlideTitle[Add Slide Title]
        SlideContent[Add Slide Content]
        Summary[Add Summary]
        KeyPoints[Add Key Points]
        Concepts[Add Key Concepts]
        Questions[Add Practice Questions]
    end
    
    Iterate --> SlideTitle
    SlideTitle --> SlideContent
    SlideContent --> Summary
    Summary --> KeyPoints
    KeyPoints --> Concepts
    Concepts --> Questions
    
    Questions --> Next{More Slides?}
    Next -->|Yes| Iterate
    Next -->|No| Complete[Return Markdown String]
```

### HTML Generation

The HTML export creates a styled, interactive document:

```mermaid
flowchart TD
    Start[Start HTML Generation] --> Structure[Create Document Structure]
    Structure --> Style[Add CSS Styling]
    Style --> Header[Create Document Header]
    Header --> Iterate[Iterate Through Slides]
    
    subgraph "For Each Slide"
        Section[Create Slide Section]
        SlideTitle[Add Slide Title]
        SlideContent[Add Slide Content]
        Summary[Add Summary]
        KeyPoints[Add Key Points]
        Concepts[Add Key Concepts]
        Questions[Add Practice Questions]
    end
    
    Iterate --> Section
    Section --> SlideTitle
    SlideTitle --> SlideContent
    SlideContent --> Summary
    Summary --> KeyPoints
    KeyPoints --> Concepts
    Concepts --> Questions
    
    Questions --> Next{More Slides?}
    Next -->|Yes| Iterate
    Next -->|No| Footer[Add Document Footer]
    Footer --> Complete[Return HTML String]
```

### PDF Generation

The PDF export builds on the HTML output and converts it to a PDF document:

```mermaid
sequenceDiagram
    participant EU as Export Utils
    participant HTML as HTML Generator
    participant PDF as PDF Converter
    
    EU->>HTML: generateHTML(slideData)
    HTML-->>EU: Return HTML string
    EU->>PDF: Convert HTML to PDF
    PDF-->>EU: Return PDF buffer
    EU->>EU: Apply metadata and formatting
    EU-->>Caller: Return complete PDF buffer
```

## Handling Different Question Types

When exporting content, question formats are handled differently based on the export format:

```mermaid
graph TD
    Question[Question] --> Type{Question Type}
    
    Type -->|Multiple Choice| MC[Format Multiple Choice]
    Type -->|True/False| TF[Format True/False]
    
    MC --> MCMarkdown[Format for Markdown]
    MC --> MCHTML[Format for HTML]
    MC --> MCPDF[Format for PDF]
    
    TF --> TFMarkdown[Format for Markdown]
    TF --> TFHTML[Format for HTML]
    TF --> TFPDF[Format for PDF]
```

## Error Handling

```mermaid
flowchart TD
    Process[Process File] --> Error{Error Occurs?}
    
    Error -->|Yes| Type{Error Type}
    Error -->|No| Success[Return Results]
    
    Type -->|Invalid Format| Format[Return Format Error]
    Type -->|Processing Failed| Processing[Return Processing Error]
    Type -->|Export Failed| Export[Return Export Error]
    
    Format --> Log[Log Error Details]
    Processing --> Log
    Export --> Log
    
    Log --> Return[Return Error to Client]
``` 