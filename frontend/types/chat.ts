export interface Message {
    id: string
    content: string
    role: 'user' | 'assistant'
    timestamp: string
    file?: File;
    image?: File;
  }
  
  export interface ChatResponse {
    message: Message
  }
  
  