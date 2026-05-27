'use client'
import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Note } from '@/types'

export function useNotes(folderId?: string | null) {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchNotes = useCallback(async () => {
    setLoading(true)
    let query = supabase
      .from('notes')
      .select('*, folder:folders(id, name, color)')
      .order('is_pinned', { ascending: false })
      .order('updated_at', { ascending: false })

    if (folderId) query = query.eq('folder_id', folderId)

    const { data } = await query
    setNotes(data || [])
    setLoading(false)
  }, [folderId])

  useEffect(() => { fetchNotes() }, [fetchNotes])

  const createNote = async (title: string, content: string, folderId?: string, color?: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase.from('notes').insert({
      title, content,
      folder_id: folderId || null,
      color: color || '#ffffff',
      user_id: user!.id,
    }).select().single()
    if (!error && data) setNotes(prev => [data, ...prev])
    return { data, error }
  }

  const updateNote = async (id: string, updates: Partial<Note>) => {
    const { data, error } = await supabase
      .from('notes').update(updates).eq('id', id).select().single()
    if (!error && data) setNotes(prev => prev.map(n => n.id === id ? { ...n, ...data } : n))
    return { data, error }
  }

  const deleteNote = async (id: string) => {
    const { error } = await supabase.from('notes').delete().eq('id', id)
    if (!error) setNotes(prev => prev.filter(n => n.id !== id))
    return { error }
  }

  const togglePin = async (id: string, isPinned: boolean) => {
    return updateNote(id, { is_pinned: !isPinned })
  }

  const searchNotes = async (query: string) => {
    const { data } = await supabase
      .from('notes')
      .select('*, folder:folders(id, name, color)')
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .order('is_pinned', { ascending: false })
    setNotes(data || [])
  }

  return { notes, loading, createNote, updateNote, deleteNote, togglePin, searchNotes, refetch: fetchNotes }
}