'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Folder } from '@/types'

export function useFolders() {
  const [folders, setFolders] = useState<Folder[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchFolders = async () => {
      const { data } = await supabase
        .from('folders')
        .select('*')
        .order('created_at', { ascending: true })
      setFolders(data || [])
      setLoading(false)
    }
    fetchFolders()
  }, [])

  const createFolder = async (name: string, color: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase.from('folders').insert({
      name, color, user_id: user!.id
    }).select().single()
    if (!error && data) setFolders(prev => [...prev, data])
    return { data, error }
  }

  const deleteFolder = async (id: string) => {
    const { error } = await supabase.from('folders').delete().eq('id', id)
    if (!error) setFolders(prev => prev.filter(f => f.id !== id))
    return { error }
  }

  return { folders, loading, createFolder, deleteFolder }
}