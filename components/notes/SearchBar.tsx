'use client'

import { useState, useCallback } from 'react'
import { useNotes } from '@/lib/hooks/useNotes'
import { debounce } from 'lodash'

export default function SearchBar() {
  const [query, setQuery] = useState('')

  const { searchNotes, refetch } =
    useNotes()

  const doSearch = useCallback(
    debounce((q: string) => {
      if (q.trim()) {
        searchNotes(q)
      } else {
        refetch()
      }
    }, 400),
    []
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuery(e.target.value)
    doSearch(e.target.value)
  }

  return (
    <div className="relative">

      {/* Search Icon */}
      <span
        className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-slate-400
        text-sm
      "
      >
        🔍
      </span>

      <input
        value={query}
        onChange={handleChange}
        placeholder="Search notes..."
        className="
        w-full
        pl-11
        pr-4
        py-3
        rounded-2xl

        bg-white/80
        backdrop-blur-xl

        border
        border-pink-100

        text-slate-700
        placeholder:text-slate-400

        shadow-sm

        focus:outline-none
        focus:ring-4
        focus:ring-pink-100
        focus:border-pink-200

        transition-all
      "
      />

    </div>
  )
}