'use client'
import { useState, useEffect, useRef } from 'react'
import { useNotes } from '@/lib/hooks/useNotes'
import { useFolders } from '@/lib/hooks/useFolders'
import type { Note } from '@/types'

const NOTE_COLORS = [
  { label: 'Default', value: '#1a1a28' },
  { label: 'Yellow', value: '#2a2410' },
  { label: 'Green', value: '#0d2318' },
  { label: 'Blue', value: '#0d1f2d' },
  { label: 'Pink', value: '#2d0d1f' },
  { label: 'Purple', value: '#1a0d2d' },
]

interface NoteEditorProps {
  note: Note | null
  folderId?: string
  onClose: () => void
  onSaved: (note: Note) => void
}

export default function NoteEditor({ note, folderId, onClose, onSaved }: NoteEditorProps) {
  const { createNote, updateNote } = useNotes()
  const { folders } = useFolders()
  const [title, setTitle] = useState(note?.title || '')
  const [content, setContent] = useState(note?.content || '')
  const [color, setColor] = useState(note?.color || NOTE_COLORS[0].value)
  const [selectedFolder, setSelectedFolder] = useState(note?.folder_id || folderId || '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setTitle(note?.title || '')
    setContent(note?.content || '')
    setColor(note?.color || NOTE_COLORS[0].value)
    setSelectedFolder(note?.folder_id || folderId || '')
  }, [note?.id])

  // Auto-save
  useEffect(() => {
    if (!note) return
    if (saveTimeout.current) clearTimeout(saveTimeout.current)
    saveTimeout.current = setTimeout(async () => {
      setSaving(true)
      await updateNote(note.id, { title, content, color, folder_id: selectedFolder || null })
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }, 800)
    return () => { if (saveTimeout.current) clearTimeout(saveTimeout.current) }
  }, [title, content, color, selectedFolder])

  const handleCreate = async () => {
    if (!title.trim() && !content.trim()) return
    setSaving(true)
    const { data } = await createNote(title || 'Untitled', content, selectedFolder, color)
    setSaving(false)
    if (data) onSaved(data)
  }

  const date = note
    ? new Date(note.updated_at).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' })
    : null

  return (
    <div className="h-full flex flex-col rounded-2xl border border-white/5 overflow-hidden" style={{ background: color }}>
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5">
        {/* Color picker */}
        <div className="flex items-center gap-1">
          {NOTE_COLORS.map(c => (
            <button key={c.value} onClick={() => setColor(c.value)}
              className={`w-4 h-4 rounded-full transition border-2 ${color === c.value ? 'border-white scale-110' : 'border-transparent'}`}
              style={{ background: c.value === '#1a1a28' ? '#4f4f6f' : c.value }}
              title={c.label}
            />
          ))}
        </div>

        {/* Folder selector */}
        <select
          value={selectedFolder}
          onChange={e => setSelectedFolder(e.target.value)}
          className="ml-auto text-xs bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white/60 focus:outline-none focus:border-indigo-500 transition"
        >
          <option value="">No folder</option>
          {folders.map(f => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>

        {/* Save status */}
        <span className={`text-xs transition ${saved ? 'text-green-400' : saving ? 'text-white/30' : 'text-transparent'}`}>
          {saving ? 'Saving...' : saved ? '✓ Saved' : '.'}
        </span>

        {/* Save / Close */}
        {!note && (
          <button onClick={handleCreate} disabled={saving}
            className="px-3 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-xs font-semibold transition disabled:opacity-50">
            Save Note
          </button>
        )}
        <button onClick={onClose} className="text-white/30 hover:text-white text-lg transition">✕</button>
      </div>

      {/* Title */}
      <input
        value={title} onChange={e => setTitle(e.target.value)}
        placeholder="Note title..."
        className="px-6 pt-5 pb-2 text-2xl font-bold text-white placeholder-white/20 bg-transparent outline-none w-full"
      />

      {/* Date */}
      {date && <p className="px-6 text-xs text-white/25 mb-2">{date}</p>}

      {/* Content */}
      <textarea
        value={content} onChange={e => setContent(e.target.value)}
        placeholder="Start writing..."
        className="flex-1 px-6 py-3 text-sm text-white/80 placeholder-white/20 bg-transparent outline-none resize-none leading-relaxed"
      />
    </div>
  )
}