'use client'

import { useState, useEffect, useRef } from 'react'
import { useNotes } from '@/lib/hooks/useNotes'
import { useFolders } from '@/lib/hooks/useFolders'
import type { Note } from '@/types'

const NOTE_COLORS = [
  { label: 'Default', value: '#fffaf8' },
  { label: 'Pink', value: '#ffe4ec' },
  { label: 'Peach', value: '#fff1e6' },
  { label: 'Yellow', value: '#fff9db' },
  { label: 'Mint', value: '#e8fff1' },
  { label: 'Blue', value: '#eef7ff' },
]

interface NoteEditorProps {
  note: Note | null
  folderId?: string
  onClose: () => void
  onSaved: (note: Note) => void
}

export default function NoteEditor({
  note,
  folderId,
  onClose,
  onSaved,
}: NoteEditorProps) {
  const { createNote, updateNote } = useNotes()
  const { folders } = useFolders()

  const [title, setTitle] = useState(note?.title || '')
  const [content, setContent] = useState(note?.content || '')
  const [color, setColor] = useState(
    note?.color || NOTE_COLORS[0].value
  )
  const [selectedFolder, setSelectedFolder] = useState(
    note?.folder_id || folderId || ''
  )

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const saveTimeout =
    useRef<ReturnType<typeof setTimeout> | null>(
      null
    )

  useEffect(() => {
    setTitle(note?.title || '')
    setContent(note?.content || '')
    setColor(
      note?.color || NOTE_COLORS[0].value
    )
    setSelectedFolder(
      note?.folder_id || folderId || ''
    )
  }, [note?.id, folderId])

  // Auto Save
  useEffect(() => {
    if (!note) return

    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current)
    }

    saveTimeout.current = setTimeout(
      async () => {
        setSaving(true)

        await updateNote(note.id, {
          title,
          content,
          color,
          folder_id:
            selectedFolder || null,
        })

        setSaving(false)
        setSaved(true)

        setTimeout(
          () => setSaved(false),
          2000
        )
      },
      800
    )

    return () => {
      if (saveTimeout.current) {
        clearTimeout(
          saveTimeout.current
        )
      }
    }
  }, [
    title,
    content,
    color,
    selectedFolder,
  ])

  const handleCreate = async () => {
    if (
      !title.trim() &&
      !content.trim()
    )
      return

    setSaving(true)

    const { data } =
      await createNote(
        title || 'Untitled Note',
        content,
        selectedFolder,
        color
      )

    setSaving(false)

    if (data) {
      onSaved(data)
    }
  }

  const date = note
    ? new Date(
        note.updated_at
      ).toLocaleString('th-TH', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : null

  return (
    <div
      className="
      h-full
      flex
      flex-col
      rounded-[28px]
      overflow-hidden
      border
      border-pink-100
      shadow-lg
    "
      style={{
        backgroundColor: color,
      }}
    >
      {/* Toolbar */}
      <div
        className="
        flex
        items-center
        gap-3
        px-5
        py-4
        border-b
        border-pink-100
        bg-white/40
        backdrop-blur-xl
      "
      >
        {/* Color Picker */}
        <div className="flex items-center gap-2">
          {NOTE_COLORS.map((c) => (
            <button
              key={c.value}
              onClick={() =>
                setColor(c.value)
              }
              className={`
                w-6
                h-6
                rounded-full
                border-2
                transition
                ${
                  color === c.value
                    ? 'border-slate-500 scale-110'
                    : 'border-white'
                }
              `}
              style={{
                backgroundColor:
                  c.value,
              }}
              title={c.label}
            />
          ))}
        </div>

        {/* Folder */}
        <select
          value={selectedFolder}
          onChange={(e) =>
            setSelectedFolder(
              e.target.value
            )
          }
          className="
          ml-auto
          px-3
          py-2
          rounded-xl
          bg-white
          border
          border-pink-100
          text-slate-600
          text-sm
          outline-none
          focus:ring-2
          focus:ring-pink-200
        "
        >
          <option value="">
            No folder
          </option>

          {folders.map((f) => (
            <option
              key={f.id}
              value={f.id}
            >
              {f.name}
            </option>
          ))}
        </select>

        {/* Status */}
        <span
          className={`
          text-xs
          font-medium
          ${
            saved
              ? 'text-green-500'
              : saving
              ? 'text-orange-400'
              : 'text-transparent'
          }
        `}
        >
          {saving
            ? 'Saving...'
            : saved
            ? '✓ Saved'
            : '.'}
        </span>

        {/* Create */}
        {!note && (
          <button
            onClick={handleCreate}
            disabled={saving}
            className="
            px-4
            py-2
            rounded-xl
            bg-gradient-to-r
            from-pink-300
            to-orange-200
            text-slate-700
            font-medium
            shadow-sm
            hover:scale-105
            transition
            disabled:opacity-50
          "
          >
            Save Note
          </button>
        )}

        {/* Close */}
        <button
          onClick={onClose}
          className="
          w-9
          h-9
          rounded-xl
          hover:bg-pink-50
          text-slate-400
          hover:text-slate-700
          transition
        "
        >
          ✕
        </button>
      </div>

      {/* Title */}
      <input
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        placeholder="Untitled Note ✨"
        className="
        px-6
        pt-6
        pb-2
        text-3xl
        font-bold
        text-slate-700
        placeholder:text-slate-300
        bg-transparent
        outline-none
        w-full
      "
      />

      {/* Date */}
      {date && (
        <p
          className="
          px-6
          text-sm
          text-slate-400
          mb-2
        "
        >
          {date}
        </p>
      )}

      {/* Content */}
      <textarea
        value={content}
        onChange={(e) =>
          setContent(
            e.target.value
          )
        }
        placeholder="Start writing your ideas here... 🌸"
        className="
        flex-1
        px-6
        py-4
        text-base
        leading-8
        text-slate-600
        placeholder:text-slate-300
        bg-transparent
        outline-none
        resize-none
      "
        style={{
          backgroundImage:
            'linear-gradient(to bottom, transparent 31px, rgba(0,0,0,0.05) 32px)',
          backgroundSize:
            '100% 32px',
        }}
      />
    </div>
  )
}