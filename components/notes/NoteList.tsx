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

export default function NoteList({
  folderId,
  selectedNoteId,
  onSelectNote,
  onCreateNote,
}: NoteListProps) {
  const {
    notes,
    loading,
    togglePin,
    deleteNote,
  } = useNotes(folderId)

  const pinned = notes.filter(
    (n) => n.is_pinned
  )

  const unpinned = notes.filter(
    (n) => !n.is_pinned
  )

  return (
    <div
      className="
      w-80
      flex-shrink-0
      flex
      flex-col
      bg-white/70
      backdrop-blur-xl
      rounded-[28px]
      border
      border-pink-100
      overflow-hidden
      shadow-lg
    "
    >
      {/* Header */}
      <div
        className="
        flex
        items-center
        justify-between
        p-5
        border-b
        border-pink-100
      "
      >
        <div>
          <h2 className="font-bold text-slate-700">
            Notes
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            {notes.length} notes
          </p>
        </div>

        <button
          onClick={onCreateNote}
          className="
          px-4
          py-2
          rounded-2xl
          bg-gradient-to-r
          from-pink-300
          via-rose-200
          to-orange-200
          text-slate-700
          font-semibold
          text-sm
          shadow-md
          hover:scale-105
          transition
        "
        >
          ✨ New
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="text-slate-400 text-sm">
              Loading...
            </div>
          </div>
        ) : notes.length === 0 ? (
          <div
            className="
            flex
            flex-col
            items-center
            justify-center
            py-16
          "
          >
            <div className="text-5xl mb-3">
              📔
            </div>

            <p className="text-slate-500 font-medium">
              No notes yet
            </p>

            <p className="text-slate-400 text-sm mt-1">
              Create your first note
            </p>
          </div>
        ) : (
          <div className="space-y-5">

            {/* Pinned */}
            {pinned.length > 0 && (
              <div>

                <div
                  className="
                  flex
                  items-center
                  gap-2
                  mb-3
                "
                >
                  <span>📌</span>

                  <span
                    className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-400
                  "
                  >
                    Pinned
                  </span>
                </div>

                <div className="space-y-3">
                  {pinned.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      isSelected={
                        note.id ===
                        selectedNoteId
                      }
                      onSelect={() =>
                        onSelectNote(note)
                      }
                      onTogglePin={() =>
                        togglePin(
                          note.id,
                          note.is_pinned
                        )
                      }
                      onDelete={() =>
                        deleteNote(note.id)
                      }
                    />
                  ))}
                </div>

              </div>
            )}

            {/* All Notes */}
            {unpinned.length > 0 && (
              <div>

                {pinned.length > 0 && (
                  <div
                    className="
                    flex
                    items-center
                    gap-2
                    mb-3
                    mt-5
                  "
                  >
                    <span>📝</span>

                    <span
                      className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider
                      text-slate-400
                    "
                    >
                      All Notes
                    </span>
                  </div>
                )}

                <div className="space-y-3">
                  {unpinned.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      isSelected={
                        note.id ===
                        selectedNoteId
                      }
                      onSelect={() =>
                        onSelectNote(note)
                      }
                      onTogglePin={() =>
                        togglePin(
                          note.id,
                          note.is_pinned
                        )
                      }
                      onDelete={() =>
                        deleteNote(note.id)
                      }
                    />
                  ))}
                </div>

              </div>
            )}

          </div>
        )}
      </div>
    </div>
  )
}