'use client'

import React from 'react'
import { useChat } from '@/hooks/use_chats'
import { ChatHeader } from './chat_header'
import { ChatMessages } from './chat_messages'
import { ChatInput } from './chat_input'
import { QuickActions } from './quick_actions'
export function Chat() {
  const { messages, isLoading, error, sendMessage } = useChat()

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-semibold text-green-600">
              Hello, I'm your Energy Analyst
            </h1>
            <p className="text-2xl text-gray-400">
              How can I help you today?
            </p>
          </div>
          <QuickActions />
          <ChatMessages messages={messages} isLoading={isLoading} error={error} />
        </div>
      </div>
      <ChatInput onSendMessage={sendMessage} />
    </div>
  )
}

