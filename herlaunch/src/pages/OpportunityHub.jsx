import { useState, useEffect } from 'react'
import { getFilteredScholarships, getSchemes, getInternships } from '../services/db'

const isClosingSoon = (deadline) => {
  const today = new Date()
  const end = new Date(Date.parse(deadline))
  if (isNaN(end)) return false
  const diffDays = (end - today) / (1000 * 60 * 60 * 24)
  return diffDays <= 7 && diffDays >= 0
}

export default function OpportunityHub() {
  const [tab, setTab] = useState('scholarships')
  const [scholarships, setScholarships] = useState([])
  const [schemes, setSchemes] = useState([])
  const [internships, setInternships] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [bookmarks, setBookmarks] = useState([])
  const [state, setState] = useState('')
  const [category, setCategory] = useState('')
  const [course, setCourse] = useState('')

  useEffect(() => {
    loadData()
  }, [tab])

  const loadData = async () => {
    setLoading(true)
    try {
      if (tab === 'scholarships') {
        const data = await getFilteredScholarships(state, category, course)
        setScholarships(data || [])
      }
      if (tab === 'schemes') {
        const data = await getSchemes()
        setSchemes(data || [])
      }
      if (tab === 'internships') {
        const data = await getInternships()
        setInternships(data || [])
      }
    } catch (err) {
      console.error('Error loading data:', err)
    }
    setLoading(false)
  }

  const handleFilter = async () => {
    setLoading(true)
    const data = await getFilteredScholarships(state, category, course)
    setScholarships(data || [])
    setLoading(false)
  }

  const handleSearch = () => {
    setSearchTerm(search)
  }

  const toggleBookmark = (id) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter((b) => b !== id))
    } else {
      setBookmarks([...bookmarks, id])
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 min-h-screen">

      <h1 className="font-display text-4xl font-bold text-dark mb-2">Opportunity Hub</h1>
      <p className="text-gray-500 mb-6">Find scholarships, government schemes, and internships made for you.</p>

      {/* SEARCH BAR */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search opportunities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="border border-gray-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSearch}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-purple-800"
        >
          Search
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-6 border-b mb-8">
        {['scholarships', 'schemes', 'internships'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 px-2 font-semibold capitalize transition-colors ${
              tab === t
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* FILTERS */}
      {tab === 'scholarships' && (
        <div className="bg-light p-4 rounded-xl shadow mb-8 flex flex-wrap gap-4 items-end">
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">All States</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="West Bengal">West Bengal</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">All Categories</option>
              <option value="OBC/SC/ST">OBC/SC/ST</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="Minority">Minority</option>
              <option value="General">General</option>
              <option value="Women in Tech">Women in Tech</option>
              <option value="Differently Abled">Differently Abled</option>
              <option value="Single Girl Child">Single Girl Child</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Course</label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">All Courses</option>
              <option value="Engineering">Engineering</option>
              <option value="Science">Science</option>
              <option value="Arts">Arts</option>
              <option value="PG">PG</option>
              <option value="Professional">Professional</option>
            </select>
          </div>
          <button
            onClick={handleFilter}
            className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-purple-800"
          >
            Filter
          </button>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        </div>
      )}

      {/* CONTENT */}
      {!loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* SCHOLARSHIPS */}
          {tab === 'scholarships' &&
            scholarships
              .filter((s) =>
                searchTerm === '' ||
                s.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((s) => (
                <div key={s.id} className="border border-purple-100 rounded-xl p-5 shadow-sm hover:shadow-lg bg-white transition">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg text-dark">{s.name}</h3>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        {s.category}
                      </span>
                    </div>
                    <button onClick={() => toggleBookmark(s.id)} className="text-xl">
                      {bookmarks.includes(s.id) ? '⭐' : '☆'}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{s.provider}</p>
                  <p className="text-primary font-bold text-lg mb-1">{s.amount}</p>
                  <p className="text-xs text-gray-400 mb-2">Deadline: {s.deadline} · {s.state}</p>
                  {isClosingSoon(s.deadline) && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded mr-2">
                      Closing Soon
                    </span>
                  )}
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noreferrer"
                    className="block mt-3 text-secondary font-semibold text-sm hover:underline"
                  >
                    Apply Now →
                  </a>
                </div>
              ))}

          {/* SCHEMES */}
          {tab === 'schemes' &&
            schemes
              .filter((s) =>
                searchTerm === '' ||
                s.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((s) => (
                <div key={s.id} className="border border-pink-100 rounded-xl p-5 shadow-sm hover:shadow-lg bg-white transition">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-dark">{s.name}</h3>
                    <span className="text-xs bg-pink-50 text-secondary px-2 py-1 rounded-full">
                      {s.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{s.provider}</p>
                  <p className="text-sm text-gray-600 mb-3">{s.description}</p>
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-secondary font-semibold text-sm hover:underline"
                  >
                    Learn More →
                  </a>
                </div>
              ))}

          {/* INTERNSHIPS */}
          {tab === 'internships' &&
            internships
              .filter((i) =>
                searchTerm === '' ||
                i.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((i) => (
                <div key={i.id} className="border border-purple-100 rounded-xl p-5 shadow-sm hover:shadow-lg bg-white transition">
                  <h3 className="font-semibold text-dark mb-1">{i.name}</h3>
                  <p className="text-sm text-gray-500 mb-1">{i.company} · {i.location}</p>
                  <p className="text-primary font-bold text-lg mb-1">{i.stipend}</p>
                  <p className="text-xs text-gray-400 mb-3">Deadline: {i.deadline}</p>
                  <a
                    href={i.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-secondary font-semibold text-sm hover:underline"
                  >
                    Apply →
                  </a>
                </div>
              ))}

        </div>
      )}

    </main>
  )
}
