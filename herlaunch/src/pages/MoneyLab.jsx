// P2's FILE
import { useState } from 'react'
import { Link } from 'react-router-dom'
import InvestmentSimulator from '../components/InvestmentSimulator'

const topics = [
  {
    emoji: "🏦",
    title: "Emergency Fund",
    desc: "Before investing anything, save 3–6 months of expenses. This is your safety net.",
    level: 1,
    details:
      "Goal: cover essentials like rent, groceries, transport, and bills for 3–6 months. Keep it liquid in a savings account or short-term RD so you can access it immediately. Build it first, even before aggressive investing."
  },
  {
    emoji: "📊",
    title: "SIP (Systematic Investment Plan)",
    desc: "Invest a fixed amount monthly in mutual funds. Start with just ₹500/month.",
    level: 2,
    details:
      "Best for consistent, long-term growth. SIPs help average your purchase price and reduce timing risk. Start small, increase yearly, and pick a diversified mutual fund rather than single-sector funds at the beginning."
  },
  {
    emoji: "🏛️",
    title: "Fixed Deposit (FD)",
    desc: "Safe, guaranteed returns. Good for short-term goals. Typically 6–7% per year.",
    level: 2,
    details:
      "Use for goals within 1–3 years (fees, gadgets, emergency buffer top‑ups). Compare interest rates and lock-in periods. Check penalties for early withdrawal and whether the FD is cumulative or monthly payout."
  },
  {
    emoji: "📮",
    title: "PPF (Public Provident Fund)",
    desc: "Long-term savings with tax benefits. Lock-in of 15 years but great returns.",
    level: 3,
    details:
      "Great for long-term, low-risk wealth building. Government-backed, tax benefits on contribution and interest. Ideal for goals like higher education, home down payment, or retirement."
  },
  {
    emoji: "📈",
    title: "Stocks",
    desc: "Higher risk, higher reward. Only invest money you don't need for 5+ years.",
    level: 4,
    details:
      "Build this only after your emergency fund and insurance are set. Prefer diversified index funds or blue‑chip stocks early on. Avoid short-term trading until you understand risk, volatility, and research basics."
  },
  {
    emoji: "🛡️",
    title: "Insurance",
    desc: "Health insurance first, always. Protects you from unexpected medical bills.",
    level: 3,
    details:
      "Insurance protects your savings from sudden shocks. Start with health insurance, then consider term life if you have dependents. Keep insurance and investments separate so you know exactly what you're protecting vs. growing."
  },
]

const initialMilestones = [
  { id: 'emergency', label: "Emergency Fund", done: false },
  { id: 'sip', label: "First SIP", done: false },
  { id: 'insurance', label: "Health Insurance", done: false },
  { id: 'investment', label: "First Investment", done: false },
  { id: 'quiz', label: "Complete Money Quiz", done: false },
]

const quizQuestions = [
  {
    id: 1,
    question: "What is a good emergency fund target?",
    options: ["1 month of expenses", "3â€“6 months of expenses", "12 months of expenses"],
    answer: 1,
    tip: "Most experts recommend saving 3â€“6 months of essential expenses."
  },
  {
    id: 2,
    question: "A SIP helps you:",
    options: ["Invest a fixed amount regularly", "Guarantee returns", "Avoid all market risk"],
    answer: 0,
    tip: "SIP = Systematic Investment Plan (regular investing)."
  },
  {
    id: 3,
    question: "PPF is best for:",
    options: ["Short-term trading", "Long-term savings with tax benefits", "Daily spending"],
    answer: 1,
    tip: "PPF has a long lock-in and tax benefits."
  },
  {
    id: 4,
    question: "Before investing, you should prioritize:",
    options: ["Luxury shopping", "Health insurance and emergency fund", "Speculative stocks"],
    answer: 1,
    tip: "Protection and safety nets come first."
  },
  {
    id: 5,
    question: "Risk and returns are generally:",
    options: ["Unrelated", "Inversely related", "Directly related"],
    answer: 2,
    tip: "Higher potential returns usually come with higher risk."
  },
]

export default function MoneyLab() {
  const [milestones, setMilestones] = useState(initialMilestones)
  const [quizIndex, setQuizIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [activeTopic, setActiveTopic] = useState(null)

  const completedCount = milestones.filter(m => m.done).length
  const progressPct = Math.round((completedCount / milestones.length) * 100)

  const toggleMilestone = (id) => {
    setMilestones(prev => prev.map(m => m.id === id ? { ...m, done: !m.done } : m))
  }

  const currentQ = quizQuestions[quizIndex]

  const handleAnswer = (idx) => {
    if (selected !== null) return
    setSelected(idx)
    if (idx === currentQ.answer) setScore(s => s + 1)
  }

  const nextQuestion = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(i => i + 1)
      setSelected(null)
      return
    }
    setShowResult(true)
    setMilestones(prev => prev.map(m => m.id === 'quiz' ? { ...m, done: true } : m))
  }

  const resetQuiz = () => {
    setQuizIndex(0)
    setSelected(null)
    setScore(0)
    setShowResult(false)
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl font-bold text-dark mb-2">Money Lab ðŸ’°</h1>
      <p className="text-gray-500 mb-10">Your beginner-friendly guide to budgeting, saving, and investing.</p>

      {/* Milestones */}
      <section className="bg-gradient-to-r from-primary to-purple-700 rounded-2xl p-8 text-white mb-12">
        <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
          <h2 className="font-display text-2xl font-bold">Your Financial Milestones</h2>
          <div className="text-sm text-purple-200">
            Progress: {completedCount}/{milestones.length} ({progressPct}%)
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2 mb-6">
          <div className="bg-accent h-2 rounded-full" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="flex flex-wrap gap-4">
          {milestones.map((m) => (
            <button
              type="button"
              key={m.id}
              onClick={() => toggleMilestone(m.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                m.done ? 'bg-accent text-dark' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              aria-pressed={m.done}
            >
              <span>{m.done ? 'âœ…' : 'â­•'}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>
        <p className="text-purple-200 text-sm mt-4">Click a milestone to mark it done. Complete each one to level up your financial health.</p>
      </section>

      {/* Simulator CTA */}
      <section className="bg-light border border-purple-100 rounded-2xl p-8 mb-12 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-dark mb-2">Investment Simulator ðŸ“Š</h2>
          <p className="text-gray-500">See how â‚¹500/month can grow into lakhs over time. Try it now!</p>
        </div>
        <Link to="/simulator"
          className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-800 transition">
          Open Simulator â†’
        </Link>
      </section>

      {/* Quick Simulator */}
      <section className="mb-12">
        <InvestmentSimulator />
      </section>

      {/* Topics Grid */}
      <h2 className="font-display text-2xl font-bold text-dark mb-6">Learn the Basics</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {topics.map((t, i) => (
          <button
            type="button"
            key={i}
            onClick={() => setActiveTopic(t)}
            className="text-left bg-white border border-purple-100 rounded-xl p-6 shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <div className="text-3xl mb-3">{t.emoji}</div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-dark">{t.title}</h3>
              <span className="text-xs bg-light text-primary px-2 py-1 rounded-full">Level {t.level}</span>
            </div>
            <p className="text-sm text-gray-500">{t.desc}</p>
            <p className="text-xs text-primary mt-3">Click to learn more</p>
          </button>
        ))}
      </div>

      {activeTopic && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="topic-title"
          onClick={() => setActiveTopic(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-purple-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{activeTopic.emoji}</span>
                <h3 id="topic-title" className="font-display text-xl font-bold text-dark">
                  {activeTopic.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveTopic(null)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">{activeTopic.desc}</p>
            {activeTopic.details && (
              <div className="bg-light rounded-xl p-4 text-sm text-gray-600">
                {activeTopic.details}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quiz Flow */}
      <section className="mt-12 bg-white border border-purple-100 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <h2 className="font-display text-2xl font-bold text-dark">Money Quiz</h2>
          <div className="text-sm text-gray-500">
            Question {quizIndex + 1} of {quizQuestions.length}
          </div>
        </div>

        {!showResult ? (
          <>
            <p className="text-lg font-semibold text-dark mb-4">{currentQ.question}</p>
            <div className="grid gap-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selected === idx
                const isCorrect = selected !== null && idx === currentQ.answer
                const isWrong = selected !== null && isSelected && idx !== currentQ.answer
                return (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className={`text-left px-4 py-3 rounded-xl border transition ${
                      isCorrect ? 'bg-green-50 border-green-300' :
                      isWrong ? 'bg-red-50 border-red-300' :
                      isSelected ? 'bg-purple-50 border-purple-300' :
                      'bg-white border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>

            <div className="flex items-center justify-between mt-6 gap-4 flex-wrap">
              <p className="text-sm text-gray-500">
                {selected !== null ? currentQ.tip : "Pick an answer to see a quick tip."}
              </p>
              <button
                type="button"
                onClick={nextQuestion}
                disabled={selected === null}
                className={`px-5 py-2 rounded-full font-semibold transition ${
                  selected === null ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-purple-800'
                }`}
              >
                {quizIndex === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next'}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-2xl font-bold text-dark mb-2">You scored {score}/{quizQuestions.length}</p>
            <p className="text-gray-500 mb-6">Great job! You just completed the Money Quiz.</p>
            <button
              type="button"
              onClick={resetQuiz}
              className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-800 transition"
            >
              Retry Quiz
            </button>
          </div>
        )}
      </section>
      {/* 50/30/20 Rule */}
      <section className="mt-12 bg-white border border-purple-100 rounded-2xl p-8 shadow-sm">
        <h2 className="font-display text-2xl font-bold text-dark mb-4">The 50/30/20 Rule ðŸŽ¯</h2>
        <p className="text-gray-500 mb-6">A simple way to split your income or pocket money every month:</p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-primary text-white rounded-xl p-5">
            <p className="font-display text-3xl font-bold">50%</p>
            <p className="text-purple-200 text-sm mt-1">Needs</p>
            <p className="text-xs text-purple-300 mt-2">Rent, food, transport</p>
          </div>
          <div className="bg-secondary text-white rounded-xl p-5">
            <p className="font-display text-3xl font-bold">30%</p>
            <p className="text-pink-200 text-sm mt-1">Wants</p>
            <p className="text-xs text-pink-300 mt-2">Dining out, shopping, fun</p>
          </div>
          <div className="bg-dark text-white rounded-xl p-5">
            <p className="font-display text-3xl font-bold">20%</p>
            <p className="text-gray-300 text-sm mt-1">Savings</p>
            <p className="text-xs text-gray-400 mt-2">SIP, FD, emergency fund</p>
          </div>
        </div>
      </section>
    </main>
  )
}

