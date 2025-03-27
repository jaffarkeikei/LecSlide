# Testing Documentation

LecSlide implements a comprehensive testing strategy using Jest and React Testing Library. This document outlines the testing approach, coverage, and examples.

## Testing Architecture

```mermaid
graph TB
    subgraph "Test Types"
        Unit[Unit Tests]
        Integration[Integration Tests]
        Component[Component Tests]
    end
    
    subgraph "Test Tools"
        Jest[Jest]
        RTL[React Testing Library]
        UserEvent[User Event]
        MockAxios[Mock Axios]
        MockGemini[Mock Gemini AI]
    end
    
    Unit --> Jest
    Integration --> Jest
    Component --> RTL
    RTL --> UserEvent
    Unit --> MockAxios
    Unit --> MockGemini
```

## Test Directory Structure

```mermaid
graph TD
    TestsRoot["__tests__/"] --> Components["components/"]
    TestsRoot --> Lib["lib/"]
    
    Components --> FileUploaderTest["FileUploader.test.tsx"]
    Components --> ProcessingStepsTest["ProcessingSteps.test.tsx"]
    Components --> SlideViewerTest["SlideViewer.test.tsx"]
    Components --> SummaryCardTest["SummaryCard.test.tsx"]
    Components --> ConceptMapTest["ConceptMap.test.tsx"]
    Components --> PracticeQuestionsTest["PracticeQuestions.test.tsx"]
    
    Lib --> ApiTest["api.test.ts"]
    Lib --> AiServiceTest["aiService.test.ts"]
    Lib --> FileProcessingTest["fileProcessing.test.ts"]
    Lib --> ExportUtilsTest["exportUtils.test.ts"]
```

## Testing Approach

### Component Testing

Components are tested using React Testing Library to ensure they render correctly and respond to user interactions as expected. The following diagram illustrates the component testing flow:

```mermaid
flowchart LR
    Render[Render Component] --> Query[Query DOM Elements]
    Query --> Interact[Interact with Elements]
    Interact --> Assert[Assert Expected Behavior]
    
    style Render fill:#f9d,stroke:#333,stroke-width:2px
    style Query fill:#bbf,stroke:#333,stroke-width:2px
    style Interact fill:#bfb,stroke:#333,stroke-width:2px
    style Assert fill:#fbb,stroke:#333,stroke-width:2px
```

Example pattern for component testing:

```jsx
// 1. Render the component with test props
render(<Component {...testProps} />);

// 2. Query elements from the rendered output
const element = screen.getByText('Expected text');

// 3. Interact with elements (if needed)
await userEvent.click(element);

// 4. Assert expected behavior
expect(screen.getByText('New state')).toBeInTheDocument();
```

### API Service Testing

API services are tested by mocking the Axios library to ensure proper request formation and response handling.

```mermaid
sequenceDiagram
    participant Test as Test Case
    participant API as API Function
    participant Mock as Mock Axios
    
    Test->>Mock: Set up mock response
    Test->>API: Call API function
    API->>Mock: Make HTTP request
    Mock-->>API: Return mocked response
    API-->>Test: Return processed data
    Test->>Test: Assert expectations
```

### AI Service Testing

The AI service is tested by mocking the Google Generative AI client to ensure proper prompt construction and response parsing.

```mermaid
flowchart TD
    Setup[Set Up Mocks] --> Call[Call AI Service]
    Call --> Parse[Parse Response]
    Parse --> Assert[Assert Result]
    
    subgraph "Mock Setup"
        MockClient[Mock Gemini Client]
        MockResponse[Mock JSON Response]
    end
    
    Setup --> MockClient
    Setup --> MockResponse
```

## Test Coverage

```mermaid
pie title Test Coverage by Module
    "Components" : 85
    "API Services" : 90
    "AI Services" : 80
    "File Processing" : 75
    "Export Utils" : 85
```

## Mock Strategies

### Mocking Axios

Axios is mocked to simulate API responses without making actual HTTP requests:

```mermaid
classDiagram
    class AxiosMock {
        +create() MockInstance
        +get() Promise
        +post() Promise
        +patch() Promise
    }
    
    class MockInstance {
        +get() Promise
        +post() Promise
        +patch() Promise
    }
    
    AxiosMock --> MockInstance : creates
```

### Mocking Google Generative AI

The Google Generative AI client is mocked to provide consistent responses for AI-driven features:

```mermaid
classDiagram
    class GoogleGenerativeAIMock {
        +getGenerativeModel() ModelMock
    }
    
    class ModelMock {
        +generateContent() ContentResponse
    }
    
    class ContentResponse {
        +response TextResponse
    }
    
    class TextResponse {
        +text() string
    }
    
    GoogleGenerativeAIMock --> ModelMock : creates
    ModelMock --> ContentResponse : returns
    ContentResponse --> TextResponse : contains
```

## Testing Examples

### Component Tests

Here's a visualization of the PracticeQuestions component test:

```mermaid
sequenceDiagram
    participant Test as Test
    participant PQ as PracticeQuestions
    participant DOM as DOM
    
    Test->>PQ: Render with mock questions
    PQ->>DOM: Render questions UI
    Test->>DOM: Query for question text
    DOM-->>Test: Return matching elements
    Test->>Test: Assert questions displayed
    Test->>DOM: Click answer option
    DOM->>PQ: Trigger state update
    PQ->>DOM: Render "Check Answer" button
    Test->>DOM: Query for "Check Answer"
    DOM-->>Test: Return button element
    Test->>Test: Assert button exists
```

### API Tests

Here's a visualization of the API test flow:

```mermaid
sequenceDiagram
    participant Test as Test
    participant API as API Function
    participant Mock as Mock Axios
    
    Test->>Mock: Mock successful response
    Test->>API: Call API function with params
    API->>Mock: Make HTTP request
    Mock-->>API: Return mocked success
    API-->>Test: Return processed data
    Test->>Test: Assert expected outcome
    
    Test->>Mock: Mock error response
    Test->>API: Call API function
    API->>Mock: Make HTTP request
    Mock-->>API: Return mocked error
    API-->>Test: Throw error
    Test->>Test: Assert error handling
```

## Test Configuration

LecSlide uses Jest's Next.js integration for seamless testing of Next.js components and API routes:

```mermaid
graph LR
    Jest --> NextJest[Next.js Jest]
    NextJest --> TestEnv[jsdom Environment]
    NextJest --> Setup[jest.setup.js]
    NextJest --> Config[jest.config.js]
    
    Setup --> DOM[DOM Testing Library]
    Setup --> JestDOM[jest-dom]
``` 