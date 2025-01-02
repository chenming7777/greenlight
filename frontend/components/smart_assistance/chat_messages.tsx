import { Message } from '@/types/chat'
import { cn } from '@/lib/utils'

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean
  error: string | null
}

export function ChatMessages({ messages, isLoading, error }: ChatMessagesProps) {
  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex gap-3 p-4 rounded-lg",
            message.role === 'user' 
              ? "bg-blue-500 text-white ml-auto" 
              : "bg-gray-100"
          )}
        >
          <div className="flex-1">{message.content}</div>
        </div>
      ))}
      {isLoading && (
        <div className="flex gap-3 p-4 rounded-lg bg-gray-100">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
      )}
    </div>
  )
}

