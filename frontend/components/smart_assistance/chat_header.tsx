import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ChatHeader() {
  return (
    <header className="border-b bg-white">
      <div className="flex items-center justify-between px-6 h-16">
        <Button variant="ghost" size="sm">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}

