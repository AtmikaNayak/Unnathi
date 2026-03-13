// P4's FILE
// Uses Gemini API for AI responses
// Get your FREE Gemini API key from: https://aistudio.google.com/app/apikey
import { useState } from 'react'

const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY" // P4: Replace with your key

const SYSTEM_PROMPT = `You are HerBot, a helpful assistant on HerLaunch — a platform for women to find scholarships, government schemes, internships, and learn about personal finance.

Only answer questions related to:
- Scholarships and education funding for women in India
- Government schemes for women (Mudra Loan, Stree Shakti, Beti Bachao, etc.)
- Basic personal finance: SIP, FD, PPF, budgeting, investing
- Internship and career advice for women

Keep answers short, friendly, and in simple English. Use bullet points when listing things.
If asked something unrelated, politely redirect to these topics.`

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm HerBot 👋 Ask me about scholarships, government schemes, or how to start investing!" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMsg = { role: 'user', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
              ...messages.filter(m => m.role !== 'assistant' || messages.indexOf(m) === 0).map(m => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.text }]
              })),
              { role: 'user', parts: [{ text: input }] }
            ]
          })
        }
      )
      const data = await response.json()
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that. Try again!"
      setMessages(prev => [...prev, { role: 'assistant', text: reply }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Oops! Something went wrong. Please try again." }])
    }
    setLoading(false)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-primary text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-purple-800 transition"
      >
        {open ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-purple-100 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-white px-4 py-3 flex items-center gap-2">
            <span className="text-xl">🤖</span>
            <div>
              <p className="font-semibold text-sm">HerBot</p>
              <p className="text-xs text-purple-200">Ask me anything!</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 max-h-72">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${
                  m.role === 'user'
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-light text-dark rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-light px-3 py-2 rounded-xl text-sm text-gray-400">Thinking...</div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 p-3 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask HerBot..."
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary"
            />
            <button onClick={sendMessage}
              className="bg-primary text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-purple-800 transition">
              →
            </button>
          </div>
        </div>
      )}
    </>
  )
}
