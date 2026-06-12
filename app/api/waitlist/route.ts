import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'waitlist.json')

type Entry = {
  name: string
  email: string
  task: string
  joinedAt: string
}

async function readWaitlist(): Promise<Entry[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, task } = body

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 })
    }

    const list = await readWaitlist()

    if (list.some((e) => e.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json({ error: 'This email is already on the waitlist.' }, { status: 409 })
    }

    const entry: Entry = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      task: typeof task === 'string' ? task.trim() : '',
      joinedAt: new Date().toISOString(),
    }

    list.push(entry)

    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
    await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2))

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
