'use client'

import { useState } from 'react'
import FolderSidebar from '@/components/notes/FolderSidebar'
import TopBar from '@/components/layout/TopBar'

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-amber-50 to-sky-50">

      {/* Background Blur */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl" />

        <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl" />

        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-orange-200/20 rounded-full blur-3xl" />

      </div>

      <div className="relative z-10 flex h-full">

        {/* Sidebar */}
        <aside
          className={`
            ${sidebarOpen ? 'w-72' : 'w-0'}
            transition-all
            duration-300
            overflow-hidden
            flex-shrink-0
            p-4
          `}
        >
          <div
            className="
            h-full
            bg-white/60
            backdrop-blur-xl
            border
            border-white/80
            rounded-[28px]
            shadow-xl
            overflow-hidden
          "
          >
            <FolderSidebar />
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0 p-4">

          {/* TopBar */}
          <div
            className="
            mb-4
            bg-white/60
            backdrop-blur-xl
            border
            border-white/80
            rounded-[24px]
            shadow-lg
          "
          >
            <TopBar
              onToggleSidebar={() =>
                setSidebarOpen((o) => !o)
              }
            />
          </div>

          {/* Content */}
          <main
            className="
            flex-1
            overflow-auto
            bg-white/30
            backdrop-blur-xl
            border
            border-white/60
            rounded-[28px]
            shadow-lg
            p-6
          "
          >
            {children}
          </main>

        </div>
      </div>
    </div>
  )
}