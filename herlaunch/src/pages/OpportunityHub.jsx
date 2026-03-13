import { useState, useEffect } from "react";
import {
  getFilteredScholarships,
  getSchemes,
  getInternships
} from "../services/db";

const isClosingSoon = (deadline) => {
  const today = new Date()

  // force proper parsing
  const end = new Date(Date.parse(deadline))

  if (isNaN(end)) return false

  const diffDays = (end - today) / (1000 * 60 * 60 * 24)

  return diffDays <= 7 && diffDays >= 0
}

export default function OpportunityHub() {

  const [tab, setTab] = useState("scholarships");
  const [scholarships, setScholarships] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(false);

  const [bookmarks, setBookmarks] = useState([])
  const [search, setSearch] = useState("")
  const [state, setState] = useState("");
  const [category, setCategory] = useState("");
  const [course, setCourse] = useState("");

  useEffect(() => {
    loadData();
  }, [tab]);

  const loadData = async () => {
    setLoading(true);

    if (tab === "scholarships") {
      const data = await getFilteredScholarships(state, category, course);
      setScholarships(data);
    }

    if (tab === "schemes") {
      const data = await getSchemes();
      setSchemes(data);
    }

    if (tab === "internships") {
      const data = await getInternships();
      setInternships(data);
    }

    setLoading(false);
  };

  const handleFilter = async () => {
    setLoading(true);
    const data = await getFilteredScholarships(state, category, course);
    setScholarships(data);
    setLoading(false);
  };

  const toggleBookmark = (id) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter((b) => b !== id))
    } else {
      setBookmarks([...bookmarks, id])
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 bg-gray-50 min-h-screen">

      <h1 className="text-4xl font-bold mb-2">
        Opportunity Hub
      </h1>

      <p className="text-gray-500 mb-8">
        Find scholarships, government schemes, and internships made for you.
      </p>

      <input
          type="text"
          placeholder="Search scholarships..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2 mb-6 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-8">

        {["scholarships", "schemes", "internships"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 capitalize font-semibold ${
              tab === t
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-400"
            }`}
          >
            {t}
          </button>
        ))}

      </div>

      {/* Filters */}
      {tab === "scholarships" && (

        <div className="bg-gray-50 p-5 rounded-lg mb-8 flex flex-wrap gap-4">

          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All States</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Categories</option>
            <option value="OBC/SC/ST">OBC/SC/ST</option>
            <option value="Minority">Minority</option>
            <option value="General">General</option>
          </select>

          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Courses</option>
            <option value="Engineering">Engineering</option>
            <option value="Science">Science</option>
            <option value="Arts">Arts</option>
          </select>

          <button
            onClick={handleFilter}
            className="bg-purple-600 text-white px-5 py-2 rounded"
          >
            Filter
          </button>

        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Content */}

      {!loading && (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {tab === "scholarships" &&
            scholarships
              .filter((s) =>
                s.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((s) => (

              <div
                key={s.id}
                className="border border-purple-100 rounded-xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 bg-white"
              >

                <div className="flex justify-between items-start mb-2">

                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {s.name}
                  </h3>

                  <span className="text-xs font-medium bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                    {s.category}
                  </span>
                </div>

                <button
                  onClick={() => toggleBookmark(s.id)}
                  className="text-xl"
                >
                  {bookmarks.includes(s.id) ? "⭐" : "☆"}
                </button>

              </div>

                <p className="text-gray-500 text-sm mb-1">
                  {s.provider}
                </p>

                <p className="text-purple-700 font-bold text-xl mb-1">
                  {s.amount}
                </p>

                <p className="text-sm text-gray-400 mb-1">
                  Deadline: {s.deadline}
                </p>

                {isClosingSoon(s.deadline) && (
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                    ⏳ Closing Soon
                  </span>
                )}

                <a
                  href={s.link}
                  className="block mt-3 text-sm font-semibold text-purple-600 hover:underline"
                >
                  Apply Now →
                </a>

              </div>
            ))}

            {tab === "scholarships" && scholarships.filter((s) =>
              s.name.toLowerCase().includes(search.toLowerCase())
              ).length === 0 && (
              <p className="text-gray-400 text-center col-span-3">
                No scholarships match your filters.
              </p>
            )}

          {tab === "schemes" &&
            schemes.map((s) => (

              <div
                key={s.id}
                className="border rounded-xl p-5 shadow hover:shadow-lg"
              >

                <h3 className="font-semibold">
                  {s.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  {s.provider}
                </p>

                <p className="text-sm mt-2">
                  {s.description}
                </p>

                <a
                  href={s.link}
                  className="text-pink-500 text-sm mt-3 inline-block"
                >
                  Learn More →
                </a>

              </div>
            ))}

          {tab === "internships" &&
            internships.map((i) => (

              <div
                key={i.id}
                className="border rounded-xl p-5 shadow hover:shadow-lg"
              >

                <h3 className="font-semibold">
                  {i.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  {i.company}
                </p>

                <p className="text-purple-600 font-bold">
                  {i.stipend}
                </p>

                <p className="text-gray-400 text-sm">
                  Deadline: {i.deadline}
                </p>

                <a
                  href={i.link}
                  className="text-purple-600 text-sm mt-3 inline-block"
                >
                  Apply →
                </a>

              </div>
            ))}

        </div>
      )}
    </main>
  );
}