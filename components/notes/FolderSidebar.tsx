'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useFolders } from '@/lib/hooks/useFolders'

const FOLDER_COLORS = [
  '#f9a8d4', // pink
  '#fdba74', // orange
  '#93c5fd', // blue
  '#86efac', // green
  '#c4b5fd', // purple
  '#fcd34d', // yellow
]

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

    await createFolder(
      newName.trim(),
      newColor
    )

    setNewName('')
    setShowCreate(false)
  }

  return (
    <div className="h-full flex flex-col p-5">

      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">

        <div
          className="
          w-12
          h-12
          rounded-2xl
          bg-gradient-to-br
          from-pink-200
          via-rose-200
          to-orange-100
          flex
          items-center
          justify-center
          shadow-md
        "
        >
          📔
        </div>

        <div>
          <h1 className="font-bold text-slate-700 text-lg">
            NoteFlow
          </h1>

          <p className="text-xs text-slate-400">
            My Notes
          </p>
        </div>

      </div>

      {/* All Notes */}
      <Link
        href="/notes"
        className={`
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-2xl
          mb-2
          transition-all
          ${
            !currentFolder
              ? 'bg-gradient-to-r from-pink-200 to-orange-100 text-slate-700 shadow-md'
              : 'text-slate-600 hover:bg-pink-50'
          }
        `}
      >
        <span>🗒️</span>
        <span className="font-medium">
          All Notes
        </span>
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between mt-6 mb-3 px-1">

        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Folders
        </span>

        <button
          onClick={() => setShowCreate((o) => !o)}
          className="
          w-8
          h-8
          rounded-xl
          bg-pink-100
          hover:bg-pink-200
          text-slate-600
          transition
        "
        >
          +
        </button>

      </div>

      {/* Create Folder */}
      {showCreate && (
        <form
          onSubmit={handleCreate}
          className="
          mb-4
          p-4
          rounded-3xl
          bg-white/70
          border
          border-pink-100
          shadow-sm
          space-y-3
        "
        >
          <input
            autoFocus
            value={newName}
            onChange={(e) =>
              setNewName(e.target.value)
            }
            placeholder="Folder name..."
            className="
            w-full
            px-3
            py-2
            rounded-xl
            bg-white
            border
            border-pink-100
            text-slate-700
            placeholder:text-slate-400
            outline-none
            focus:ring-2
            focus:ring-pink-200
          "
          />

          <div className="flex gap-2">

            {FOLDER_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setNewColor(c)}
                className={`
                  w-7
                  h-7
                  rounded-full
                  transition
                  ${
                    newColor === c
                      ? 'ring-2 ring-slate-400 ring-offset-2'
                      : ''
                  }
                `}
                style={{
                  background: c,
                }}
              />
            ))}

          </div>

          <div className="flex gap-2">

            <button
              type="submit"
              className="
              flex-1
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
            "
            >
              Create
            </button>

            <button
              type="button"
              onClick={() =>
                setShowCreate(false)
              }
              className="
              flex-1
              py-2
              rounded-xl
              bg-slate-100
              text-slate-600
              hover:bg-slate-200
              transition
            "
            >
              Cancel
            </button>

          </div>
        </form>
      )}

      {/* Folder List */}
      <div className="flex-1 overflow-y-auto space-y-2">

        {folders.map((folder) => (
          <div
            key={folder.id}
            className="group flex items-center"
          >

            <Link
              href={`/notes?folder=${folder.id}`}
              className={`
                flex-1
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-2xl
                transition-all
                ${
                  currentFolder === folder.id
                    ? 'bg-gradient-to-r from-pink-100 to-orange-50 shadow-sm text-slate-700'
                    : 'text-slate-600 hover:bg-pink-50'
                }
              `}
            >
              <span
                className="
                w-3
                h-3
                rounded-full
                flex-shrink-0
              "
                style={{
                  background:
                    folder.color,
                }}
              />

              <span className="truncate">
                {folder.name}
              </span>

            </Link>

            <button
              onClick={() =>
                deleteFolder(folder.id)
              }
              className="
              opacity-0
              group-hover:opacity-100
              transition
              p-2
              rounded-xl
              text-slate-400
              hover:bg-red-50
              hover:text-red-500
              ml-1
            "
            >
              ✕
            </button>

          </div>
        ))}

      </div>
    </div>
  )
}