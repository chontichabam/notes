'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<'login' | 'signup'>('login')

  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setError('')

    const action =
      mode === 'login'
        ? supabase.auth.signInWithPassword({
            email,
            password,
          })
        : supabase.auth.signUp({
            email,
            password,
          })

    const { error } = await action

    if (error) {
      setError(error.message)
    } else {
      router.push('/notes')
      router.refresh()
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-rose-50 via-amber-50 to-sky-50">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-pink-200 via-orange-100 to-sky-200">

        {/* Blob Background */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-300/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-200/30 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-center px-20">

          <div className="w-20 h-20 rounded-3xl bg-white/60 backdrop-blur-xl flex items-center justify-center text-5xl shadow-xl mb-8">
            📔
          </div>

          <h1 className="text-5xl font-bold text-slate-700 leading-tight mb-6">
            Capture your
            <br />
            lovely ideas ✨
          </h1>

          <p className="text-slate-600 text-lg max-w-md">
            Keep your notes, thoughts and plans organized
            in one beautiful place.
          </p>

          {/* Note Preview */}
          <div className="mt-12 bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl p-6 w-[420px] shadow-xl">

            <div className="flex gap-2 mb-5">
              <div className="w-3 h-3 rounded-full bg-pink-300" />
              <div className="w-3 h-3 rounded-full bg-yellow-300" />
              <div className="w-3 h-3 rounded-full bg-sky-300" />
            </div>

            <h3 className="font-semibold text-slate-700 mb-4">
              Today's Notes 🌸
            </h3>

            <div className="space-y-3 text-slate-600">
              <div>✨ UI Design Ideas</div>
              <div>📚 Study React & Next.js</div>
              <div>☕ Meeting at 14:00</div>
              <div>🎯 Finish Dashboard</div>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center p-6">

        <div
          className="
          w-full
          max-w-md
          bg-white/70
          backdrop-blur-xl
          border
          border-white/80
          rounded-[32px]
          shadow-xl
          p-8
        "
        >

          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-6">
            <div className="w-20 h-20 rounded-3xl bg-white shadow-lg flex items-center justify-center text-4xl">
              📔
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">

            <h1 className="text-3xl font-bold text-slate-700">
              {mode === 'login'
                ? 'Welcome Back 🌸'
                : 'Create Account ✨'}
            </h1>

            <p className="text-slate-500 mt-2">
              Your notes are waiting for you
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Email
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="
                w-full
                px-4
                py-3.5
                rounded-2xl
                bg-white/80
                border
                border-pink-100
                text-slate-700
                focus:outline-none
                focus:ring-4
                focus:ring-pink-100
                focus:border-pink-300
                transition
              "
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Password
              </label>

              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="
                w-full
                px-4
                py-3.5
                rounded-2xl
                bg-white/80
                border
                border-pink-100
                text-slate-700
                focus:outline-none
                focus:ring-4
                focus:ring-pink-100
                focus:border-pink-300
                transition
              "
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-2xl p-4">
                {error}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="
              w-full
              py-3.5
              rounded-2xl
              bg-gradient-to-r
              from-pink-300
              via-rose-300
              to-orange-200
              text-slate-700
              font-semibold
              shadow-lg
              hover:scale-[1.02]
              transition-all
              disabled:opacity-50
            "
            >
              {loading
                ? 'Please wait...'
                : mode === 'login'
                ? 'Sign In'
                : 'Create Account'}
            </button>

          </form>

          {/* Divider */}
          <div className="relative my-8">

            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-pink-100" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm text-slate-400">
                or
              </span>
            </div>

          </div>

          {/* Switch */}
          <div className="text-center text-sm text-slate-500">

            {mode === 'login'
              ? "Don't have an account?"
              : 'Already have an account?'}

            <button
              type="button"
              onClick={() =>
                setMode(
                  mode === 'login'
                    ? 'signup'
                    : 'login'
                )
              }
              className="ml-2 font-semibold text-pink-500 hover:text-pink-600"
            >
              {mode === 'login'
                ? 'Sign Up'
                : 'Sign In'}
            </button>

          </div>

        </div>
      </div>
    </div>
  )
}