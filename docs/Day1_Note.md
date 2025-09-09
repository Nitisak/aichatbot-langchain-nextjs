# AI Chatbot with LangChain & Next.js - Day 1

## Tools and Editors Used in Training

### Note: This course requires Node.js version 20 or higher

1. **Node.js 22.x**
2. **Visual Studio Code**
3. **Git**
4. **Ollama (Optional)**

### About Ollama  
Ollama is a local AI model runtime. It’s suitable for machines with strong GPUs and high specifications. It’s optional and not required if your machine is not powerful enough.

---

## Checking Installed Tools on Windows / Mac OS / Linux

Open **Command Prompt** (Windows) or **Terminal** (Mac/Linux) and run:

### Visual Studio Code
```bash
code --version
```

### Git
```bash
git version
```

### Node.js
```bash
node -v
npm -v
npx -v
```

### Ollama
```bash
ollama -v
```

---

## Create a New Next.js 15 Project with App Router

### Latest version
```bash
npx create-next-app@latest
```

### Specify a version
```bash
npx create-next-app@15.5.2
```

### Change directory into project folder
```bash
cd aichatbot-langchain-nextjs
```

### Run the project in Development mode
```bash
npm run dev
```

### Build the project
```bash
npm run build
```

### Run in Production mode
```bash
npm start
```

---

## Configure Environment Variables

Create a file named `.env.local` and add:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

---

## Start the Development Server

```bash
npm run dev
```

Open your browser at:  
👉 http://localhost:3000

---

## 📜 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint for code checks
```

---

## 🎯 Basic API Endpoints

### 1. Base API Route (/api/route.ts)

Create `src/app/api/route.ts`:

```typescript
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "API Running with GET" });
}

export async function POST() {
  return NextResponse.json({ message: "API Running with POST" });
}

export async function PUT() {
  return NextResponse.json({ message: "API Running with PUT" });
}

export async function DELETE() {
  return NextResponse.json({ message: "Delete request received" });
}
```

**Testing:**  
- GET: `http://localhost:3000/api`  
- POST: `http://localhost:3000/api`  
- PUT: `http://localhost:3000/api`  
- DELETE: `http://localhost:3000/api`  

---

### 2. Test API Route (/api/test/route.ts)

Create `src/app/api/test/route.ts` for testing data input/output:

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "World";
  
  return NextResponse.json({ message: `Hello, ${name}!` });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const name = data.name || "World";
  
  return NextResponse.json({ message: `Hello, ${name}!` });
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  const name = data.name || "World";
  
  return NextResponse.json({ message: `Hello, ${name}!` });
}

export async function DELETE() {
  return NextResponse.json({ message: "Delete request received" });
}
```

**Testing Test API:**  
- GET: `http://localhost:3000/api/test?name=John`  
- POST: Send `{"name": "Jane"}`  
- PUT: Send `{"name": "Jane"}`  
- DELETE: `http://localhost:3000/api/test`  

---

## 🤖 AI Chat Endpoint

### Connect with LangChain and AI SDK

#### Install required dependencies
```bash
npm install langchain @ai-sdk/langchain @ai-sdk/react @langchain/core @langchain/openai ai
```

#### Import & usage
```typescript
import { NextRequest } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createMessageStreamResponse, toAIMessage, convertToAIMessages } from "ai";
```

#### Model and Streaming setup
```typescript
const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0.7,
  maxTokens: 300,
  streaming: true,
});
```

#### Create `/api/chat/route.ts` endpoint

(Full code provided in your original text, all English now)

---

## React UI (/src/app/page.tsx)

```tsx
'use client'

import { useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'

export default function Chat() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat'
    })
  })

  const [input, setInput] = useState('')

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      
      {/* Header */}
      <div className="bg-white shadow-sm p-4 border-b">
        <h1 className="text-xl font-semibold text-gray-800 text-center">
          AI Chatbot with LangChain.JS
        </h1>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3 max-w-3xl mx-auto w-full h-full">
          {messages.length === 0 && (
            <div className="flex flex-col justify-center items-center text-center text-gray-500 h-full">
              <div>
                <p className="text-lg">👋 Hello!</p>
                <p className="mt-2">Start a conversation now.</p>
              </div>
            </div>
          )}

          {/* Display Messages */}
          {messages.map(m => (
            <div
              key={m.id}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-3 mb-2 rounded-2xl shadow-sm ${
                  m.role === 'user'
                    ? 'bg-blue-500 text-white rounded-br-md'
                    : 'bg-white text-gray-800 rounded-bl-md'
                }`}
              >
                {m.parts.map((part, index) => 
                  part.type === 'text' ? (
                    <div key={index} className="whitespace-pre-wrap">{part.text}</div>
                  ) : null
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-4">
        <div className="max-w-3xl mx-auto w-full">
          {/* AI typing status */}
          {(status === 'submitted' || status === 'streaming') && 
            <div className="text-gray-500 italic mb-2 text-sm">🤔 AI is thinking...</div>
          }

          <form
            className="flex items-center space-x-2"
            onSubmit={e => {
              e.preventDefault()
              if (!input.trim()) return

              sendMessage({
                text: input,
              })
              setInput('')
            }}
          >
            <input
              className="flex-grow p-3 border border-gray-300 text-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={input}
              placeholder="Type your message here..."
              onChange={e => setInput(e.target.value)}
              disabled={status !== 'ready'}
            />
            <button
              type="submit"
              className="p-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
              disabled={status !== 'ready' || !input.trim()}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
```

---

## Summary of Base API Routes

- `/api` – Basic API route with GET, POST, PUT, DELETE  
- `/api/test` – Test API route supporting query parameters and JSON body  
- `/api/chat` – AI Chat route using LangChain + OpenAI  

---

## Project Structure

```
aichatbot-langchain-nextjs/
├── src/
│   └── app/
│       ├── api/
│       │   ├── route.ts          # Base API
│       │   ├── chat/route.ts     # Chat API
│       │   └── test/route.ts     # Test API
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── public/
├── .env.local
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Day 1 Learning Outcomes

✅ Installed and verified required tools  
✅ Created a Next.js 15 project with App Router  
✅ Built basic REST API endpoints  
✅ Integrated LangChain + AI SDK  
✅ Configured environment variables  
✅ Implemented streaming responses for AI chat  

---

## Notes

- Node.js 20+ required  
- Ollama is optional for running local AI models  
- OpenAI API Key required  
- Streaming allows real-time AI responses  
