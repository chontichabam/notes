'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import NoteList from '@/components/notes/NoteList'
import NoteEditor from '@/components/notes/NoteEditor'
import type { Note } from '@/types'

export default function NotesPage() {
  const searchParams = useSearchParams()
  const folderId = searchParams.get('folder')

  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  return (
    <div className="flex h-full gap-6">

      {/* Sidebar Note List */}
      <div className="w-[350px] shrink-0">
        <NoteList
          folderId={folderId}
          onSelectNote={(note) => {
            setSelectedNote(note)
            setIsCreating(false)
          }}
          onCreateNote={() => {
            setSelectedNote(null)
            setIsCreating(true)
          }}
          selectedNoteId={selectedNote?.id}
        />
      </div>

      {/* Editor */}
      <div className="flex-1">

        {(selectedNote || isCreating) ? (

          <div
            className="
            h-full
            bg-white/70
            backdrop-blur-xl
            border
            border-white/80
            rounded-[28px]
            shadow-lg
            overflow-hidden
          "
          >
            <NoteEditor
              note={selectedNote}
              folderId={folderId || undefined}
              onClose={() => {
                setSelectedNote(null)
                setIsCreating(false)
              }}
              onSaved={(note) => setSelectedNote(note)}
            />
          </div>

        ) : (

          <div
            className="
            h-full
            flex
            flex-col
            items-center
            justify-center
            rounded-[28px]
            bg-white/60
            backdrop-blur-xl
            border
            border-white/80
            shadow-lg
            text-slate-500
          "
          >

            <div className="text-8xl mb-6">
              📔
            </div>

            <h2 className="text-2xl font-semibold text-slate-700 mb-2">
              No note selected
            </h2>

            <p className="text-slate-500">
              Select a note or create a new one ✨
            </p>

          </div>

        )}

      </div>

    </div>
  )
}