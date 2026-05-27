'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import SearchBar from '@/components/notes/SearchBar'

interface TopBarProps {
  onToggleSidebar: () => void
}

export default function TopBar({
  onToggleSidebar,
}: TopBarProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <header
      className="
      h-16
      flex
      items-center
      gap-4
      px-6
      bg-transparent
    "
    >
      {/* Toggle Sidebar */}
      <button
        onClick={onToggleSidebar}
        className="
        w-11
        h-11
        flex
        items-center
        justify-center
        rounded-2xl
        bg-white/70
        border
        border-white/80
        shadow-md
        text-slate-600
        hover:bg-pink-50
        hover:scale-105
        transition
      "
      >
        ☰
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <SearchBar />
      </div>

      {/* Right */}
      <div className="ml-auto flex items-center gap-3">

        <div
          className="
          hidden
          md:flex
          items-center
          gap-2
          px-4
          py-2
          rounded-2xl
          bg-white/70
          border
          border-white/80
          text-slate-600
          shadow-sm
        "
        >
          <span>🌸</span>
          <span className="text-sm font-medium">
            My Notes
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-2xl
          bg-gradient-to-r
          from-pink-200
          via-rose-200
          to-orange-100
          text-slate-700
          font-medium
          shadow-md
          hover:scale-105
          transition
        "
        >
          <span>🚪</span>
          Logout
        </button>

      </div>
    </header>
  )
}