// P2's FILE
import { Link } from 'react-router-dom'

const topics = [
  { emoji: "🏦", title: "Emergency Fund", desc: "Before investing anything, save 3–6 months of expenses. This is your safety net.", level: 1 },
  { emoji: "📊", title: "SIP (Systematic Investment Plan)", desc: "Invest a fixed amount monthly in mutual funds. Start with just ₹500/month.", level: 2 },
  { emoji: "🏛️", title: "Fixed Deposit (FD)", desc: "Safe, guaranteed returns. Good for short-term goals. Typically 6–7% per year.", level: 2 },
  { emoji: "📮", title: "PPF (Public Provident Fund)", desc: "Long-term savings with tax benefits. Lock-in of 15 years but great returns.", level: 3 },
  { emoji: "📈", title: "Stocks", desc: "Higher risk, higher reward. Only invest money you don't need for 5+ years.", level: 4 },
  { emoji: "🛡️", title: "Insurance", desc: "Health insurance first, always. Protects you from unexpected medical bills.", level: 3 },
]

const milestones = [
  { label: "Emergency Fund", done: false },
  { label: "First SIP", done: false },
  { label: "Health Insurance", done: false },
  { label: "First Investment", done: false },
]

export default function MoneyLab() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl font-bold text-dark mb-2">Money Lab 💰</h1>
      <p className="text-gray-500 mb-10">Your beginner-friendly guide to budgeting, saving, and investing.</p>

      {/* Milestones */}
      <section className="bg-gradient-to-r from-primary to-purple-700 rounded-2xl p-8 text-white mb-12">
        <h2 className="font-display text-2xl font-bold mb-6">Your Financial Milestones</h2>
        <div className="flex flex-wrap gap-4">
          {milestones.map((m, i) => (
            <div key={i} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              m.done ? 'bg-accent text-dark' : 'bg-white/20 text-white'
            }`}>
              <span>{m.done ? '✅' : '⭕'}</span>
              <span>{m.label}</span>
            </div>
          ))}
        </div>
        <p className="text-purple-200 text-sm mt-4">Complete each milestone to level up your financial health!</p>
      </section>

      {/* Simulator CTA */}
      <section className="bg-light border border-purple-100 rounded-2xl p-8 mb-12 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-dark mb-2">Investment Simulator 📊</h2>
          <p className="text-gray-500">See how ₹500/month can grow into lakhs over time. Try it now!</p>
        </div>
        <Link to="/simulator"
          className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-800 transition">
          Open Simulator →
        </Link>
      </section>

      {/* Topics Grid */}
      <h2 className="font-display text-2xl font-bold text-dark mb-6">Learn the Basics</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {topics.map((t, i) => (
          <div key={i} className="bg-white border border-purple-100 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-3">{t.emoji}</div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-dark">{t.title}</h3>
              <span className="text-xs bg-light text-primary px-2 py-1 rounded-full">Level {t.level}</span>
            </div>
            <p className="text-sm text-gray-500">{t.desc}</p>
          </div>
        ))}
      </div>

      {/* 50/30/20 Rule */}
      <section className="mt-12 bg-white border border-purple-100 rounded-2xl p-8 shadow-sm">
        <h2 className="font-display text-2xl font-bold text-dark mb-4">The 50/30/20 Rule 🎯</h2>
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
