'use client'

import { useState } from 'react'
import { Smile, Paperclip, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ChatInputProps {
  onSendMessage: (message: string) => void
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSendMessage(input)
      setInput('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t bg-white p-4">
      <div className="max-w-4xl mx-auto flex items-center gap-2">
        <Button type="button" variant="ghost" size="sm">
          <Smile className="h-5 w-5 text-gray-500" />
        </Button>
        <Button type="button" variant="ghost" size="sm">
          <Paperclip className="h-5 w-5 text-gray-500" />
        </Button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a prompt here"
          className="flex-1 p-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <Button type="submit" disabled={!input.trim()}>
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  )
}

