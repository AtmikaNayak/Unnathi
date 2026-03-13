// P1's FILE
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-light via-white to-purple-50 py-24 px-6 text-center">
        <h1 className="font-display text-5xl font-bold text-dark mb-4">
          Find the money.<br />
          <span className="text-primary">Grow the money.</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-10">
          A one-stop platform for women to discover scholarships, schemes & internships —
          and learn to smartly save, budget & invest.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/opportunities"
            className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-800 transition">
            Find Opportunities →
          </Link>
          <Link to="/money-lab"
            className="border-2 border-primary text-primary px-8 py-3 rounded-full font-semibold hover:bg-light transition">
            Explore Money Lab
          </Link>
        </div>
      </section>

      {/* Two Modules Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-8">
        <div className="bg-white border border-purple-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="font-display text-2xl font-bold text-dark mb-2">Opportunity Hub</h2>
          <p className="text-gray-500 mb-6">Discover scholarships, government schemes, and internships tailored exactly to your profile.</p>
          <Link to="/opportunities" className="text-primary font-semibold hover:underline">Explore →</Link>
        </div>
        <div className="bg-white border border-pink-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
          <div className="text-4xl mb-4">📈</div>
          <h2 className="font-display text-2xl font-bold text-dark mb-2">Money Lab</h2>
          <p className="text-gray-500 mb-6">Learn to budget, invest, and grow your money with a personalized financial roadmap.</p>
          <Link to="/money-lab" className="text-secondary font-semibold hover:underline">Start Learning →</Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-white py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="font-display text-4xl font-bold">50+</p>
            <p className="text-purple-200 mt-1">Scholarships Listed</p>
          </div>
          <div>
            <p className="font-display text-4xl font-bold">20+</p>
            <p className="text-purple-200 mt-1">Govt Schemes</p>
          </div>
          <div>
            <p className="font-display text-4xl font-bold">100%</p>
            <p className="text-purple-200 mt-1">Built for Women</p>
          </div>
        </div>
      </section>
    </main>
  )
}
