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
