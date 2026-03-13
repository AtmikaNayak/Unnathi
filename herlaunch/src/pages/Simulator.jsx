// P2's FILE
import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export default function Simulator() {
  const [monthly, setMonthly] = useState(500)
  const [years, setYears] = useState(5)
  const [rate, setRate] = useState(12)

  const data = useMemo(() => {
    const points = []
    for (let y = 1; y <= years; y++) {
      const months = y * 12
      // SIP formula: M * [(1 + r)^n - 1] / r * (1 + r)
      const r = rate / 100 / 12
      const invested = monthly * months
      const value = monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r)
      points.push({
        year: `Year ${y}`,
        Invested: Math.round(invested),
        'Estimated Value': Math.round(value),
      })
    }
    return points
  }, [monthly, years, rate])

  const finalValue = data[data.length - 1]?.['Estimated Value'] || 0
  const totalInvested = data[data.length - 1]?.Invested || 0
  const gains = finalValue - totalInvested

  const fmt = (n) => n >= 100000
    ? `₹${(n / 100000).toFixed(1)}L`
    : `₹${(n / 1000).toFixed(1)}K`

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl font-bold text-dark mb-2">Investment Simulator 📊</h1>
      <p className="text-gray-500 mb-10">See how your monthly SIP grows over time.</p>

      {/* Controls */}
      <div className="bg-light rounded-2xl p-8 mb-8 grid md:grid-cols-3 gap-8">
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-2">
            Monthly Investment: <span className="text-primary">₹{monthly.toLocaleString()}</span>
          </label>
          <input type="range" min="500" max="50000" step="500" value={monthly}
            onChange={e => setMonthly(Number(e.target.value))}
            className="w-full accent-primary" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>₹500</span><span>₹50,000</span>
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-2">
            Duration: <span className="text-primary">{years} years</span>
          </label>
          <input type="range" min="1" max="30" step="1" value={years}
            onChange={e => setYears(Number(e.target.value))}
            className="w-full accent-primary" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1 yr</span><span>30 yrs</span>
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-2">
            Expected Return: <span className="text-primary">{rate}% p.a.</span>
          </label>
          <input type="range" min="6" max="20" step="1" value={rate}
            onChange={e => setRate(Number(e.target.value))}
            className="w-full accent-primary" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>6%</span><span>20%</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        <div className="bg-white border border-purple-100 rounded-xl p-5 text-center shadow-sm">
          <p className="text-sm text-gray-400 mb-1">Total Invested</p>
          <p className="font-display text-2xl font-bold text-dark">{fmt(totalInvested)}</p>
        </div>
        <div className="bg-primary text-white rounded-xl p-5 text-center shadow-sm">
          <p className="text-sm text-purple-200 mb-1">Estimated Value</p>
          <p className="font-display text-2xl font-bold">{fmt(finalValue)}</p>
        </div>
        <div className="bg-white border border-green-100 rounded-xl p-5 text-center shadow-sm">
          <p className="text-sm text-gray-400 mb-1">Estimated Gains</p>
          <p className="font-display text-2xl font-bold text-green-600">{fmt(gains)}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white border border-purple-100 rounded-2xl p-6 shadow-sm">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0e6ff" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={fmt} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => fmt(v)} />
            <Legend />
            <Line type="monotone" dataKey="Invested" stroke="#CBD5E0" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Estimated Value" stroke="#7B2D8B" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-gray-400 mt-4 text-center">
        * This is an estimate based on constant returns. Actual returns may vary. Not financial advice.
      </p>
    </main>
  )
}
