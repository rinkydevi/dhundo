'use client'

import { useState } from 'react'

const NOISE = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"

export default function Home() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong')
      }
      setStatus('success')
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Paper texture */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ backgroundImage: `url("${NOISE}")` }}
        />

        {/* Header */}
        <header className="relative flex items-center justify-between px-6 sm:px-10 lg:px-16 py-6">
          <span className="font-serif text-3xl sm:text-4xl text-foreground">dhundo</span>
        </header>

        {/* Hero */}
        <section className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pb-20">
          <div className="w-full max-w-2xl mx-auto text-center">
            <h1 className="leading-tight mb-6">
              <span className="block font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
                50,000 AI tools exist.
              </span>
              <span className="block font-serif text-3xl sm:text-4xl lg:text-5xl text-accent leading-tight mt-2">
                You just can&apos;t find it.
              </span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed mb-10">
              Dhundo matches you to the exact right AI tool — by what you want to do instantly.
            </p>

            {status === 'success' ? (
              <p className="font-sans text-base text-accent">
                You&apos;re on the list! We&apos;ll be in touch.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="h-12 flex-1 px-4 rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all font-sans text-base"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="h-12 px-6 rounded-md bg-foreground hover:bg-foreground/90 text-background font-sans text-base font-medium transition-all duration-200 disabled:opacity-70 whitespace-nowrap"
                >
                  {status === 'loading' ? '...' : 'Join waitlist'}
                </button>
              </form>
            )}

            {status === 'error' && (
              <p className="mt-2 font-sans text-sm text-red-500">{errorMsg}</p>
            )}

            <p className="mt-6 font-sans text-sm text-muted-foreground">
              <span className="inline-block w-2 h-2 bg-accent rounded-full mr-2 animate-pulse" />
              127 people already waiting
            </p>

            <p className="mt-16 font-serif text-xl text-accent/70">dhundo = find</p>
          </div>
        </section>
      </div>
    </main>
  )
}
