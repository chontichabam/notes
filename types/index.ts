export interface Folder {
    id: string
    user_id: string
    name: string
    color: string
    created_at: string
    updated_at: string
  }
  
  export interface Note {
    id: string
    user_id: string
    folder_id: string | null
    title: string
    content: string
    is_pinned: boolean
    color: string
    created_at: string
    updated_at: string
    folder?: Folder
  }
  
  export type NoteColor =
    | '#ffffff' | '#fef9c3' | '#dcfce7'
    | '#dbeafe' | '#fce7f3' | '#f3e8ff'