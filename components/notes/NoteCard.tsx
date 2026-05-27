'use client'
import type { Note } from '@/types'

interface NoteCardProps {
  note: Note
  isSelected: boolean
  onSelect: () => void
  onTogglePin: () => void
  onDelete: () => void
}

export default function NoteCard({ note, isSelected, onSelect, onTogglePin, onDelete }: NoteCardProps) {
  const preview = note.content.replace(/\n/g, ' ').slice(0, 80)
  const date = new Date(note.updated_at).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })

  return (
    <div
      onClick={onSelect}
      className={`group relative p-3 rounded-xl border cursor-pointer transition-all ${
        isSelected
          ? 'bg-indigo-500/15 border-indigo-500/40'
          : 'bg-white/3 border-white/5 hover:bg-white/7 hover:border-white/10'
      }`}
    >
      {/* Pin badge */}
      {note.is_pinned && (
        <span className="absolute top-2 right-2 text-xs">📌</span>
      )}

      <div className="pr-4">
        <h3 className="font-medium text-sm text-white truncate">{note.title || 'Untitled'}</h3>
        {preview && <p className="text-xs text-white/40 mt-0.5 line-clamp-2">{preview}</p>}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-white/25">{date}</span>
          {note.folder && (
            <span className="text-xs px-1.5 py-0.5 rounded-md" style={{ background: note.folder.color + '33', color: note.folder.color }}>
              {note.folder.name}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="absolute bottom-2 right-2 hidden group-hover:flex items-center gap-1">
        <button
          onClick={e => { e.stopPropagation(); onTogglePin() }}
          className="p-1 rounded-md hover:bg-white/10 text-white/40 hover:text-yellow-400 transition text-xs"
          title={note.is_pinned ? 'Unpin' : 'Pin'}
        >📌</button>
        <button
          onClick={e => { e.stopPropagation(); onDelete() }}
          className="p-1 rounded-md hover:bg-red-500/20 text-white/40 hover:text-red-400 transition text-xs"
        >🗑️</button>
      </div>
    </div>
  )
}