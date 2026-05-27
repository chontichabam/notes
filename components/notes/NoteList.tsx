'use client'
import { useNotes } from '@/lib/hooks/useNotes'
import NoteCard from './NoteCard'
import type { Note } from '@/types'

interface NoteListProps {
  folderId: string | null
  selectedNoteId?: string
  onSelectNote: (note: Note) => void
  onCreateNote: () => void
}

export default function NoteList({ folderId, selectedNoteId, onSelectNote, onCreateNote }: NoteListProps) {
  const { notes, loading, togglePin, deleteNote } = useNotes(folderId)

  const pinned = notes.filter(n => n.is_pinned)
  const unpinned = notes.filter(n => !n.is_pinned)

  return (
    <div className="w-72 flex-shrink-0 flex flex-col bg-[#141420] rounded-2xl border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5">
        <h2 className="font-semibold text-sm">Notes <span className="text-white/30 ml-1">{notes.length}</span></h2>
        <button
          onClick={onCreateNote}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-xs font-semibold transition"
        >
          + New
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {loading ? (
          <div className="text-center text-white/30 text-sm py-8">Loading...</div>
        ) : notes.length === 0 ? (
          <div className="text-center text-white/30 text-sm py-8">No notes yet</div>
        ) : (
          <>
            {pinned.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/30 px-1 mb-2">📌 Pinned</p>
                <div className="space-y-2">
                  {pinned.map(note => (
                    <NoteCard key={note.id} note={note}
                      isSelected={note.id === selectedNoteId}
                      onSelect={() => onSelectNote(note)}
                      onTogglePin={() => togglePin(note.id, note.is_pinned)}
                      onDelete={() => deleteNote(note.id)}
                    />
                  ))}
                </div>
              </div>
            )}
            {unpinned.length > 0 && (
              <div>
                {pinned.length > 0 && (
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/30 px-1 mb-2">All Notes</p>
                )}
                <div className="space-y-2">
                  {unpinned.map(note => (
                    <NoteCard key={note.id} note={note}
                      isSelected={note.id === selectedNoteId}
                      onSelect={() => onSelectNote(note)}
                      onTogglePin={() => togglePin(note.id, note.is_pinned)}
                      onDelete={() => deleteNote(note.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}