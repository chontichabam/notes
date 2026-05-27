'use client'

import type { Note } from '@/types'

interface NoteCardProps {
  note: Note
  isSelected: boolean
  onSelect: () => void
  onTogglePin: () => void
  onDelete: () => void
}

export default function NoteCard({
  note,
  isSelected,
  onSelect,
  onTogglePin,
  onDelete,
}: NoteCardProps) {
  const preview = note.content
    .replace(/\n/g, ' ')
    .slice(0, 80)

  const date = new Date(
    note.updated_at
  ).toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'short',
  })

  return (
    <div
      onClick={onSelect}
      className={`
        group
        relative
        p-4
        rounded-3xl
        border
        cursor-pointer
        transition-all
        shadow-sm
        hover:shadow-md
        hover:-translate-y-0.5

        ${
          isSelected
            ? `
              bg-gradient-to-r
              from-pink-100
              to-orange-50
              border-pink-200
            `
            : `
              bg-white/80
              border-pink-100
              hover:bg-pink-50
            `
        }
      `}
    >
      {/* Pin */}
      {note.is_pinned && (
        <div className="absolute top-3 right-3">
          <span className="text-base">
            📌
          </span>
        </div>
      )}

      <div className="pr-8">

        {/* Title */}
        <h3 className="font-semibold text-slate-700 truncate">
          {note.title || 'Untitled Note'}
        </h3>

        {/* Preview */}
        {preview && (
          <p className="text-sm text-slate-500 mt-2 line-clamp-2">
            {preview}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">

          <span className="text-xs text-slate-400">
            {date}
          </span>

          {note.folder && (
            <span
              className="
              text-xs
              px-2.5
              py-1
              rounded-full
              font-medium
            "
              style={{
                backgroundColor:
                  note.folder.color + '22',
                color: note.folder.color,
              }}
            >
              {note.folder.name}
            </span>
          )}

        </div>
      </div>

      {/* Actions */}
      <div
        className="
        absolute
        bottom-3
        right-3
        opacity-0
        group-hover:opacity-100
        transition
        flex
        items-center
        gap-1
      "
      >

        <button
          onClick={(e) => {
            e.stopPropagation()
            onTogglePin()
          }}
          className="
          w-8
          h-8
          rounded-xl
          bg-yellow-50
          hover:bg-yellow-100
          transition
        "
          title={
            note.is_pinned
              ? 'Unpin'
              : 'Pin'
          }
        >
          📌
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="
          w-8
          h-8
          rounded-xl
          bg-red-50
          hover:bg-red-100
          transition
        "
        >
          🗑️
        </button>

      </div>
    </div>
  )
}