'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useFolders } from '@/lib/hooks/useFolders'

const FOLDER_COLORS = ['#6366f1','#ec4899','#f59e0b','#10b981','#3b82f6','#8b5cf6']

export default function FolderSidebar() {
  const { folders, createFolder, deleteFolder } = useFolders()
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState('')
  const [newColor, setNewColor] = useState(FOLDER_COLORS[0])
  const searchParams = useSearchParams()
  const currentFolder = searchParams.get('folder')

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim()) return
    await createFolder(newName.trim(), newColor)
    setNewName('')
    setShowCreate(false)
  }

  return (
    <div className="h-full flex flex-col bg-[#141420] border-r border-white/5 p-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-6 px-1">
        <span className="text-xl">📝</span>
        <span className="font-bold text-lg tracking-tight">NoteFlow</span>
      </div>

      {/* All Notes */}
      <Link
        href="/notes"
        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm mb-1 transition ${
          !currentFolder ? 'bg-indigo-500/20 text-indigo-300' : 'text-white/60 hover:text-white hover:bg-white/5'
        }`}
      >
        <span>🗒️</span> All Notes
      </Link>

      {/* Folders Header */}
      <div className="flex items-center justify-between px-1 mt-4 mb-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-white/30">Folders</span>
        <button
          onClick={() => setShowCreate(o => !o)}
          className="text-white/40 hover:text-white transition text-lg leading-none"
        >+</button>
      </div>

      {/* Create Folder Form */}
      {showCreate && (
        <form onSubmit={handleCreate} className="mb-3 p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
          <input
            autoFocus value={newName} onChange={e => setNewName(e.target.value)}
            placeholder="Folder name..."
            className="w-full bg-transparent text-sm text-white placeholder-white/30 outline-none"
          />
          <div className="flex gap-1.5">
            {FOLDER_COLORS.map(c => (
              <button key={c} type="button" onClick={() => setNewColor(c)}
                className={`w-5 h-5 rounded-full transition ${newColor === c ? 'ring-2 ring-white ring-offset-1 ring-offset-[#141420]' : ''}`}
                style={{ background: c }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button type="submit" className="flex-1 py-1 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-xs font-medium transition">
              Create
            </button>
            <button type="button" onClick={() => setShowCreate(false)}
              className="flex-1 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium transition">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Folder List */}
      <div className="flex-1 overflow-y-auto space-y-0.5">
        {folders.map(folder => (
          <div key={folder.id} className="group flex items-center">
            <Link
              href={`/notes?folder=${folder.id}`}
              className={`flex-1 flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition ${
                currentFolder === folder.id
                  ? 'bg-white/10 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: folder.color }} />
              <span className="truncate">{folder.name}</span>
            </Link>
            <button
              onClick={() => deleteFolder(folder.id)}
              className="opacity-0 group-hover:opacity-100 p-1.5 mr-1 rounded-lg hover:bg-red-500/20 text-white/30 hover:text-red-400 transition text-xs"
            >✕</button>
          </div>
        ))}
      </div>
    </div>
  )
}