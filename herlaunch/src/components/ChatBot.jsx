import { useState } from "react"

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

const SYSTEM_PROMPT = `You are HerBot, a helpful assistant on HerLaunch — a platform for women to find scholarships, government schemes, internships, and learn about personal finance.

Answer briefly in simple English with bullet points when useful.`

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm HerBot 👋 Ask me about scholarships, government schemes, or investing." }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMsg = { role: "user", text: input }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput("")
    setLoading(true)

    try {
      const apiMessages = updatedMessages.map(m => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.text
      }))

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": window.location.href,
          "X-Title": "HerLaunch - HerBot"
        },
        body: JSON.stringify({
          model: "openrouter/auto",  // free model, no cost
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...apiMessages
          ]
        })
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("OpenRouter error:", data)
        throw new Error(data.error?.message || "API error")
      }

      const text = data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response."
      setMessages(prev => [...prev, { role: "assistant", text }])

    } catch (error) {
      console.error("HerBot error:", error)
      setMessages(prev => [
        ...prev,
        { role: "assistant", text: `Error: ${error.message}` }
      ])
    }

    setLoading(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-purple-600 text-white w-14 h-14 rounded-full text-2xl shadow-lg hover:bg-purple-700 transition-colors"
      >
        {open ? "✕" : "💬"}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-lg flex flex-col">

          <div className="bg-purple-600 text-white p-3 font-semibold rounded-t-xl">
            🤖 HerBot
          </div>

          <div className="flex-1 p-3 overflow-y-auto max-h-72">
            {messages.map((m, i) => (
              <div key={i} className={`mb-2 ${m.role === "user" ? "text-right" : ""}`}>
                <div className={`inline-block px-3 py-2 rounded-lg text-sm ${
                  m.role === "user" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-800"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-gray-400 text-sm">Thinking...</div>}
          </div>

          <div className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              className="flex-1 border rounded px-2 py-1 text-sm"
              placeholder="Ask HerBot..."
            />
            <button
              onClick={sendMessage}
              className="bg-purple-600 text-white px-3 rounded hover:bg-purple-700 transition-colors"
            >
              →
            </button>
          </div>

        </div>
      )}
    </>
  )
}
