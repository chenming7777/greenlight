'use client'

import { useState } from 'react'
import { Message } from '@/types/chat'

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = async (content: string) => {
    try {
      setIsLoading(true)
      setError(null)

      // Add user message immediately
      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        role: 'user',
        timestamp: new Date().toISOString(),
      }
      setMessages(prev => [...prev, userMessage])

      // Mock API call - replace with actual FastAPI endpoint
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock response - replace with actual API response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `This is a mock response to: ${content}`,
        role: 'assistant',
        timestamp: new Date().toISOString(),
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      setError('Failed to send message. Please try again.')
    } finally {
      setIsLoading(false)
    }
  };

  return { messages, isLoading, error, sendMessage };
}

