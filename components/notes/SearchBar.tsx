'use client'
import { useState, useCallback } from 'react'
import { useNotes } from '@/lib/hooks/useNotes'
import { debounce } from 'lodash'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const { searchNotes, refetch } = useNotes()

  const doSearch = useCallback(
    debounce((q: string) => {
      if (q.trim()) searchNotes(q)
      else refetch()
    }, 400),
    []
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    doSearch(e.target.value)
  }

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">🔍</span>
      <input
        value={query} onChange={handleChange}
        placeholder="Search notes..."
        className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
      />
    </div>
  )
}