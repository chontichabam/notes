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
      <NoteList
        folderId={folderId}
        onSelectNote={(note) => { setSelectedNote(note); setIsCreating(false) }}
        onCreateNote={() => { setSelectedNote(null); setIsCreating(true) }}
        selectedNoteId={selectedNote?.id}
      />

      <div className="flex-1">
        {(selectedNote || isCreating) ? (
          <NoteEditor
            note={selectedNote}
            folderId={folderId || undefined}
            onClose={() => { setSelectedNote(null); setIsCreating(false) }}
            onSaved={(note) => setSelectedNote(note)}
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-white/20 select-none">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-lg font-medium">Select a note or create new</p>
          </div>
        )}
      </div>
    </div>
  )
}