'use client'

import { useState, useCallback } from 'react'

interface Tool {
  id: string
  name: string
  tagline: string
  category: string
  url: string
  pricing_inr: string
  free_tier: boolean
  upi_supported: boolean
  vpn_required: boolean
  india_accessible: boolean
  languages: string[]
  match_reason: string
}

const NOISE = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"

const CHIPS = [
  'Edit Instagram Reels',
  'Write a blog post',
  'Remove photo background',
  'Transcribe a meeting',
  'Build a website',
  'Generate AI images',
]

const RANKS = ['01', '02', '03']

export default function Home() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Tool[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'empty'>('idle')

  const runSearch = useCallback(async (q: string) => {
    if (!q.trim()) return
    setStatus('loading')
    setResults([])
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      })
      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      if (!data.results || data.results.length === 0) {
        setStatus('empty')
      } else {
        setResults(data.results)
        setStatus('success')
      }
    } catch {
      setStatus('error')
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    runSearch(query)
  }

  const handleChip = (chip: string) => {
    setQuery(chip)
    runSearch(chip)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="min-h-screen flex flex-col relative">
        {/* Paper texture */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ backgroundImage: `url("${NOISE}")` }}
        />

        {/* Header */}
        <header className="relative flex items-center px-6 sm:px-10 lg:px-16 py-6">
          <span className="font-serif text-3xl sm:text-4xl text-foreground">dhundo</span>
        </header>

        {/* Content */}
        <section className="relative flex-1 px-4 sm:px-6 lg:px-8 pb-20 pt-2">
          <div className="w-full max-w-3xl mx-auto">

            {/* Title */}
            <div className="text-center mb-10">
              <h1 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight mb-3">
                Find the right AI tool
              </h1>
              <p className="font-sans text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Dhundo matches you to the exact right AI tool — by what you want to do instantly.
              </p>
            </div>

            {/* Search bar */}
            <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What do you want to do? e.g. edit my Instagram reels, write a blog post..."
                className="h-12 flex-1 px-4 rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all font-sans text-base"
                autoFocus
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="h-12 px-6 rounded-md bg-foreground hover:bg-foreground/90 text-background font-sans text-base font-medium transition-all duration-200 disabled:opacity-70 whitespace-nowrap"
              >
                {status === 'loading' ? '...' : 'Find Tools'}
              </button>
            </form>

            {/* Example chips */}
            {status === 'idle' && (
              <div className="flex flex-wrap gap-2 justify-center mb-16">
                {CHIPS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleChip(chip)}
                    className="font-sans text-sm text-muted-foreground hover:text-foreground border border-border hover:border-accent/50 bg-card hover:bg-secondary px-4 py-1.5 rounded-full transition-all"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Loading */}
            {status === 'loading' && (
              <div className="text-center py-20">
                <div className="inline-block w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4" />
                <p className="font-sans text-sm text-muted-foreground">Finding the best tools for you…</p>
              </div>
            )}

            {/* Error */}
            {status === 'error' && (
              <div className="text-center py-16">
                <p className="font-serif text-2xl text-accent/60 mb-2">Something went wrong.</p>
                <p className="font-sans text-sm text-muted-foreground">Please try again.</p>
              </div>
            )}

            {/* Empty */}
            {status === 'empty' && (
              <div className="text-center py-16">
                <p className="font-serif text-2xl text-accent/60 mb-2">No tools found.</p>
                <p className="font-sans text-sm text-muted-foreground">Try describing your task differently.</p>
              </div>
            )}

            {/* Results */}
            {status === 'success' && results.length > 0 && (
              <>
                <p className="font-sans text-xs text-muted-foreground mb-5 text-center">
                  Top {results.length} matches for &ldquo;{query}&rdquo;
                </p>
                <div className="flex flex-col gap-4">
                  {results.map((tool, i) => (
                    <div
                      key={tool.id}
                      className="bg-card border border-border rounded-xl overflow-hidden hover:border-accent/40 transition-colors"
                    >
                      {/* Top row */}
                      <div className="flex items-start gap-4 p-5 pb-4">
                        <span className="font-serif text-4xl text-accent/20 leading-none select-none shrink-0 mt-1">
                          {RANKS[i]}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-1">
                            <h3 className="font-serif text-2xl text-foreground leading-tight">{tool.name}</h3>
                            <span className="shrink-0 font-sans text-xs text-accent border border-accent/30 bg-accent/5 px-2.5 py-1 rounded-full mt-0.5">
                              {tool.category}
                            </span>
                          </div>
                          <p className="font-sans text-sm text-muted-foreground">{tool.tagline}</p>
                        </div>
                      </div>

                      {/* Why this fits */}
                      <div className="mx-5 mb-4 rounded-lg bg-secondary/70 border border-border px-4 py-3">
                        <p className="font-sans text-xs font-semibold text-accent uppercase tracking-widest mb-1.5">
                          Why this fits you
                        </p>
                        <p className="font-sans text-sm text-foreground/80 leading-relaxed">{tool.match_reason}</p>
                      </div>

                      {/* Bottom row */}
                      <div className="flex items-center justify-between gap-3 px-5 pb-5">
                        <div className="flex flex-wrap items-center gap-2">
                          {tool.free_tier ? (
                            <span className="font-sans text-xs font-semibold text-green-700">Free available</span>
                          ) : (
                            <span className="font-sans text-xs text-muted-foreground">{tool.pricing_inr}</span>
                          )}
                          {tool.upi_supported && (
                            <span className="font-sans text-xs text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                              ✓ UPI
                            </span>
                          )}
                          {tool.vpn_required && (
                            <span className="font-sans text-xs text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                              ⚠ VPN needed
                            </span>
                          )}
                          {tool.india_accessible && !tool.vpn_required && (
                            <span className="font-sans text-xs text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                              ✓ Works in India
                            </span>
                          )}
                          <span className="font-sans text-xs text-muted-foreground/60">
                            {tool.languages.slice(0, 3).join(', ')}
                            {tool.languages.length > 3 ? ' +more' : ''}
                          </span>
                        </div>
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 h-9 px-5 inline-flex items-center rounded-md bg-foreground hover:bg-foreground/90 text-background font-sans text-sm font-medium transition-all duration-200"
                        >
                          Visit Tool →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="font-serif text-lg text-accent/50 text-center mt-12">
                  dhundo = find
                </p>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
