import { useState } from "react"

// Load API key from .env
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY

// Strong system prompt (important for better answers)
const SYSTEM_PROMPT = `
You are HerBot, an assistant for HerLaunch.

You help women with:
- Scholarships (India-focused)
- Government schemes for women
- Internships and career guidance
- Personal finance (saving, SIP, budgeting)

Rules:
- Answer in simple English
- Use bullet points when helpful
- Be practical and clear
- Give examples when possible
`

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm HerBot 👋 Ask me about scholarships, schemes, or saving money."
    }
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
        role: m.role,
        content: m.text
      }))

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
            "HTTP-Referer": window.location.href,
            "X-Title": "HerLaunch - HerBot"
          },
          body: JSON.stringify({
            model: "openrouter/auto",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...apiMessages
            ]
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        console.error("API Error:", data)
        throw new Error(data.error?.message || "Something went wrong")
      }

      const botReply =
        data.choices?.[0]?.message?.content ||
        "Sorry, I couldn't understand that."

      setMessages(prev => [...prev, { role: "assistant", text: botReply }])
    } catch (error) {
      console.error("Chatbot Error:", error)

      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          text:
            "⚠️ Something went wrong. Try asking about scholarships, schemes, or savings."
        }
      ])
    }

    setLoading(false)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-purple-600 text-white w-14 h-14 rounded-full text-2xl shadow-lg hover:bg-purple-700 transition"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-lg flex flex-col">

          {/* Header */}
          <div className="bg-purple-600 text-white p-3 font-semibold rounded-t-xl">
            🤖 HerBot
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto max-h-72">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`mb-2 ${
                  m.role === "user" ? "text-right" : ""
                }`}
              >
                <div
                  className={`inline-block px-3 py-2 rounded-lg text-sm ${
                    m.role === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-gray-400 text-sm">
                HerBot is thinking...
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="px-3 pb-2 flex gap-2 flex-wrap">
            <button
              onClick={() => setInput("Show scholarships for me")}
              className="text-xs bg-gray-200 px-2 py-1 rounded"
            >
              🎓 Scholarships
            </button>
            <button
              onClick={() => setInput("Government schemes for women")}
              className="text-xs bg-gray-200 px-2 py-1 rounded"
            >
              🏛 Schemes
            </button>
            <button
              onClick={() => setInput("How to start saving money")}
              className="text-xs bg-gray-200 px-2 py-1 rounded"
            >
              💰 Saving
            </button>
          </div>

          {/* Input */}
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
              className="bg-purple-600 text-white px-3 rounded hover:bg-purple-700 transition"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  )
}