'use client'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import SearchBar from '@/components/notes/SearchBar'

interface TopBarProps {
  onToggleSidebar: () => void
}

export default function TopBar({ onToggleSidebar }: TopBarProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="h-14 flex items-center gap-4 px-6 border-b border-white/5 bg-[#0f0f13]/80 backdrop-blur-sm flex-shrink-0">
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-lg hover:bg-white/5 transition text-white/60 hover:text-white"
      >
        ☰
      </button>

      <div className="flex-1 max-w-sm">
        <SearchBar />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition"
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </header>
  )
}