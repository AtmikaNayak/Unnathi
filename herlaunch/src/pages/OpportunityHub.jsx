// P1's FILE
// Calls db.js functions written by P3 — don't touch db.js!
import { useState, useEffect } from 'react'
import { getFilteredScholarships, getSchemes, getInternships } from '../services/db'

export default function OpportunityHub() {
  const [tab, setTab] = useState('scholarships')
  const [scholarships, setScholarships] = useState([])
  const [schemes, setSchemes] = useState([])
  const [internships, setInternships] = useState([])
  const [loading, setLoading] = useState(false)

  // Filters
  const [state, setState] = useState('')
  const [category, setCategory] = useState('')
  const [course, setCourse] = useState('')

  useEffect(() => {
    loadData()
  }, [tab])

  const loadData = async () => {
    setLoading(true)
    if (tab === 'scholarships') {
      const data = await getFilteredScholarships(state, category, course)
      setScholarships(data)
    } else if (tab === 'schemes') {
      const data = await getSchemes()
      setSchemes(data)
    } else {
      const data = await getInternships()
      setInternships(data)
    }
    setLoading(false)
  }

  const handleFilter = async () => {
    setLoading(true)
    const data = await getFilteredScholarships(state, category, course)
    setScholarships(data)
    setLoading(false)
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl font-bold text-dark mb-2">Opportunity Hub</h1>
      <p className="text-gray-500 mb-8">Find scholarships, government schemes, and internships made for you.</p>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-200">
        {['scholarships', 'schemes', 'internships'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`pb-3 px-2 font-semibold capitalize transition-colors ${
              tab === t ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-gray-600'
            }`}>
            {t}
          </button>
        ))}
      </div>

      {/* Filters — only for scholarships */}
      {tab === 'scholarships' && (
        <div className="bg-light rounded-xl p-5 mb-8 flex flex-wrap gap-4 items-end">
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">State</label>
            <select value={state} onChange={e => setState(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
              <option value="">All States</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
              <option value="">All Categories</option>
              <option value="OBC/SC/ST">OBC/SC/ST</option>
              <option value="Minority">Minority</option>
              <option value="General">General</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Course</label>
            <select value={course} onChange={e => setCourse(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
              <option value="">All Courses</option>
              <option value="Engineering">Engineering</option>
              <option value="Science">Science</option>
              <option value="Arts">Arts</option>
            </select>
          </div>
          <button onClick={handleFilter}
            className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-purple-800 transition">
            Filter
          </button>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <p className="text-gray-400 text-center py-12">Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {tab === 'scholarships' && scholarships.map(s => (
            <div key={s.id} className="bg-white border border-purple-100 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-dark">{s.name}</h3>
                <span className="text-xs bg-light text-primary px-2 py-1 rounded-full">{s.category}</span>
              </div>
              <p className="text-sm text-gray-500 mb-1">{s.provider}</p>
              <p className="text-lg font-bold text-primary mb-1">{s.amount}</p>
              <p className="text-xs text-gray-400 mb-3">Deadline: {s.deadline} · {s.state}</p>
              <a href={s.link} className="text-sm text-secondary font-semibold hover:underline">Apply Now →</a>
            </div>
          ))}

          {tab === 'schemes' && schemes.map(s => (
            <div key={s.id} className="bg-white border border-pink-100 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-dark">{s.name}</h3>
                <span className="text-xs bg-pink-50 text-secondary px-2 py-1 rounded-full">{s.category}</span>
              </div>
              <p className="text-sm text-gray-500 mb-1">{s.provider}</p>
              <p className="text-sm text-gray-600 mb-3">{s.description}</p>
              <a href={s.link} className="text-sm text-secondary font-semibold hover:underline">Learn More →</a>
            </div>
          ))}

          {tab === 'internships' && internships.map(i => (
            <div key={i.id} className="bg-white border border-purple-100 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-dark mb-1">{i.name}</h3>
              <p className="text-sm text-gray-500 mb-1">{i.company} · {i.location}</p>
              <p className="text-lg font-bold text-primary mb-1">{i.stipend}</p>
              <p className="text-xs text-gray-400 mb-3">Deadline: {i.deadline}</p>
              <a href={i.link} className="text-sm text-secondary font-semibold hover:underline">Apply Now →</a>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
