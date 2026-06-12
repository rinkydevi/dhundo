import { NextRequest, NextResponse } from 'next/server'

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
  keywords: string[]
  match_reason: string
}

const TOOLS: Tool[] = [
  {
    id: '1',
    name: 'CapCut',
    tagline: 'Professional AI video editor for creators',
    category: 'Video Editing',
    url: 'https://www.capcut.com',
    pricing_inr: 'Free / ₹799/mo',
    free_tier: true,
    upi_supported: false,
    vpn_required: false,
    india_accessible: true,
    languages: ['Hindi', 'English', 'Tamil', 'Telugu', 'Marathi'],
    keywords: ['video', 'edit', 'reel', 'instagram', 'short', 'tiktok', 'youtube', 'clip', 'trim', 'cut', 'reels'],
    match_reason: 'CapCut is purpose-built for short-form social video with AI auto-cut, captions, and transitions that make Reels editing fast and professional.',
  },
  {
    id: '2',
    name: 'Canva',
    tagline: 'Design anything — graphics, presentations, videos',
    category: 'Design',
    url: 'https://www.canva.com',
    pricing_inr: 'Free / ₹3,999/yr',
    free_tier: true,
    upi_supported: true,
    vpn_required: false,
    india_accessible: true,
    languages: ['Hindi', 'English', 'Tamil', 'Telugu', 'Bengali', 'Marathi'],
    keywords: ['design', 'graphic', 'poster', 'social', 'banner', 'presentation', 'template', 'logo', 'flyer', 'thumbnail', 'image'],
    match_reason: 'Canva offers thousands of India-specific templates, accepts UPI payments, and its free tier is generous enough for most creators and small businesses.',
  },
  {
    id: '3',
    name: 'Copy.ai',
    tagline: 'AI writing assistant for blogs, emails and marketing',
    category: 'Writing',
    url: 'https://www.copy.ai',
    pricing_inr: 'Free / ₹1,650/mo',
    free_tier: true,
    upi_supported: false,
    vpn_required: false,
    india_accessible: true,
    languages: ['English', 'Hindi'],
    keywords: ['write', 'blog', 'article', 'content', 'copy', 'text', 'marketing', 'email', 'post', 'draft'],
    match_reason: 'Copy.ai generates complete blog posts, intros, and outlines in seconds. The free tier gives 2,000 words per month — enough to test it on your next post.',
  },
  {
    id: '4',
    name: 'ChatGPT',
    tagline: 'General-purpose AI assistant by OpenAI',
    category: 'AI Assistant',
    url: 'https://chatgpt.com',
    pricing_inr: 'Free / ₹1,660/mo',
    free_tier: true,
    upi_supported: false,
    vpn_required: false,
    india_accessible: true,
    languages: ['Hindi', 'English', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati'],
    keywords: ['write', 'chat', 'general', 'assistant', 'help', 'blog', 'email', 'code', 'summarize', 'explain', 'translate', 'answer'],
    match_reason: 'ChatGPT handles almost any task — writing, coding, summarizing, translating. Free version works well and understands Hindi and other Indian languages.',
  },
  {
    id: '5',
    name: 'Remove.bg',
    tagline: 'Remove image backgrounds instantly with AI',
    category: 'Image Editing',
    url: 'https://www.remove.bg',
    pricing_inr: 'Free / ₹699/mo',
    free_tier: true,
    upi_supported: false,
    vpn_required: false,
    india_accessible: true,
    languages: ['English'],
    keywords: ['remove', 'background', 'photo', 'image', 'product', 'ecommerce', 'cutout', 'transparent', 'bg'],
    match_reason: 'Remove.bg uses AI to cleanly cut out subjects from any photo in seconds — perfect for product listings, profile pictures, or social media posts.',
  },
  {
    id: '6',
    name: 'Otter.ai',
    tagline: 'AI meeting transcription and smart notes',
    category: 'Productivity',
    url: 'https://otter.ai',
    pricing_inr: 'Free / ₹830/mo',
    free_tier: true,
    upi_supported: false,
    vpn_required: false,
    india_accessible: true,
    languages: ['English'],
    keywords: ['transcribe', 'meeting', 'audio', 'voice', 'record', 'notes', 'zoom', 'call', 'podcast', 'speech', 'transcript'],
    match_reason: "Otter.ai automatically transcribes meetings in real time, identifies speakers, and generates summaries. Free plan covers 600 minutes/month — plenty for daily stand-ups.",
  },
  {
    id: '7',
    name: 'Framer',
    tagline: 'AI-powered website builder for designers',
    category: 'Website Builder',
    url: 'https://www.framer.com',
    pricing_inr: 'Free / ₹1,660/mo',
    free_tier: true,
    upi_supported: false,
    vpn_required: false,
    india_accessible: true,
    languages: ['English'],
    keywords: ['website', 'build', 'web', 'landing', 'page', 'portfolio', 'design', 'site', 'create'],
    match_reason: 'Framer lets you go from idea to a published website using AI prompts. The free tier lets you publish a custom site — no code required.',
  },
  {
    id: '8',
    name: 'Midjourney',
    tagline: 'Stunning AI image and art generation',
    category: 'Image Generation',
    url: 'https://www.midjourney.com',
    pricing_inr: '₹830/mo',
    free_tier: false,
    upi_supported: false,
    vpn_required: false,
    india_accessible: true,
    languages: ['English'],
    keywords: ['image', 'generate', 'art', 'illustration', 'ai art', 'picture', 'creative', 'artwork', 'visual'],
    match_reason: 'Midjourney produces the most visually stunning AI images available. Works over Discord — no app install needed. Basic plan at ₹830/mo gives 200 images/month.',
  },
  {
    id: '9',
    name: 'Murf.ai',
    tagline: 'Realistic AI voice generator with Indian language support',
    category: 'Voice & Audio',
    url: 'https://murf.ai',
    pricing_inr: 'Free / ₹2,490/mo',
    free_tier: true,
    upi_supported: false,
    vpn_required: false,
    india_accessible: true,
    languages: ['Hindi', 'English', 'Tamil', 'Telugu', 'Bengali', 'Marathi'],
    keywords: ['voice', 'text to speech', 'audio', 'narration', 'podcast', 'voiceover', 'tts', 'speak', 'dub', 'hindi', 'generate'],
    match_reason: 'Murf.ai has natural-sounding Indian language voices (Hindi, Tamil, Telugu, and more). Great for YouTube voiceovers, e-learning, or dubbing videos into Hindi.',
  },
  {
    id: '10',
    name: 'Descript',
    tagline: 'Edit audio and video by editing text',
    category: 'Podcast Editing',
    url: 'https://www.descript.com',
    pricing_inr: 'Free / ₹1,660/mo',
    free_tier: true,
    upi_supported: false,
    vpn_required: false,
    india_accessible: true,
    languages: ['English', 'Hindi'],
    keywords: ['podcast', 'audio', 'edit', 'video', 'transcribe', 'record', 'filler', 'remove', 'silence'],
    match_reason: 'Descript transcribes your recording and lets you edit audio/video by editing the text — delete filler words and silences by just deleting lines.',
  },
  {
    id: '11',
    name: 'Grammarly',
    tagline: 'AI writing assistant for grammar, clarity and tone',
    category: 'Writing Assistant',
    url: 'https://www.grammarly.com',
    pricing_inr: 'Free / ₹1,100/mo',
    free_tier: true,
    upi_supported: false,
    vpn_required: false,
    india_accessible: true,
    languages: ['English'],
    keywords: ['grammar', 'writing', 'edit', 'proofread', 'english', 'spell', 'check', 'correct', 'improve', 'blog'],
    match_reason: 'Grammarly catches grammar errors, suggests clearer phrasing, and adjusts your tone. The free version works across Gmail, Docs, and any website.',
  },
  {
    id: '12',
    name: 'Runway ML',
    tagline: 'Generate and edit videos with AI from text or images',
    category: 'Video Generation',
    url: 'https://runwayml.com',
    pricing_inr: 'Free / ₹1,244/mo',
    free_tier: true,
    upi_supported: false,
    vpn_required: false,
    india_accessible: true,
    languages: ['English'],
    keywords: ['video', 'generate', 'edit', 'film', 'visual', 'effects', 'ai video', 'create', 'animate', 'motion'],
    match_reason: 'Runway Gen-3 creates high-quality AI videos from text prompts or images. Free plan gives 125 credits — enough to test video generation for your projects.',
  },
  {
    id: '13',
    name: 'Notion AI',
    tagline: 'AI assistant built inside your notes and docs',
    category: 'Productivity',
    url: 'https://www.notion.so',
    pricing_inr: 'Free / ₹830/mo',
    free_tier: true,
    upi_supported: false,
    vpn_required: false,
    india_accessible: true,
    languages: ['English', 'Hindi'],
    keywords: ['notes', 'organize', 'write', 'document', 'summarize', 'productivity', 'draft', 'wiki', 'meeting', 'plan'],
    match_reason: 'Notion AI lives inside your workspace — summarize meeting notes, draft documents, or brainstorm ideas without switching apps.',
  },
  {
    id: '14',
    name: 'Adobe Firefly',
    tagline: 'Commercially safe AI image generation by Adobe',
    category: 'Image Generation',
    url: 'https://firefly.adobe.com',
    pricing_inr: 'Free / ₹4,230/mo',
    free_tier: true,
    upi_supported: true,
    vpn_required: false,
    india_accessible: true,
    languages: ['English'],
    keywords: ['image', 'generate', 'photo', 'design', 'creative', 'art', 'adobe', 'background', 'texture', 'edit'],
    match_reason: 'Adobe Firefly generates commercially safe AI images (no copyright concerns) and integrates directly with Photoshop and Illustrator. UPI payments accepted.',
  },
  {
    id: '15',
    name: 'ElevenLabs',
    tagline: 'Hyper-realistic AI voice cloning and generation',
    category: 'Voice & Audio',
    url: 'https://elevenlabs.io',
    pricing_inr: 'Free / ₹830/mo',
    free_tier: true,
    upi_supported: false,
    vpn_required: false,
    india_accessible: true,
    languages: ['Hindi', 'English', 'Tamil', 'Telugu'],
    keywords: ['voice', 'clone', 'audio', 'narration', 'podcast', 'voiceover', 'tts', 'speak', 'dub', 'realistic', 'hindi'],
    match_reason: 'ElevenLabs creates the most realistic AI voices available — including Indian-accented English and Hindi. Free tier gives 10,000 characters/month.',
  },
]

function searchTools(query: string): Omit<Tool, 'keywords'>[] {
  const q = query.toLowerCase()
  const words = q.split(/\s+/).filter(Boolean)

  const scored = TOOLS.map((tool) => {
    let score = 0
    for (const kw of tool.keywords) {
      if (q.includes(kw)) score += 3
      else for (const word of words) {
        if (kw.includes(word) || word.includes(kw)) score += 1
      }
    }
    if (q.includes(tool.name.toLowerCase())) score += 8
    if (q.includes(tool.category.toLowerCase())) score += 4
    if (tool.languages.some((l) => q.includes(l.toLowerCase()))) score += 2
    return { tool, score }
  })

  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ tool }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { keywords: _k, ...rest } = tool
      return rest
    })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { query } = body
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json({ error: 'Query is required.' }, { status: 400 })
    }
    const results = searchTools(query.trim())
    return NextResponse.json({ results })
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
