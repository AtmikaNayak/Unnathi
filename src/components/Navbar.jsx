// P1's FILE
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/opportunities', label: 'Opportunities' },
    { to: '/money-lab', label: 'Money Lab' },
    { to: '/simulator', label: 'Simulator' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-purple-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl font-bold text-primary">
          Un<span className="text-secondary">nathi</span>
        </Link>
        <div className="flex gap-6">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-body text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
