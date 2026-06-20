// P2's FILE
import InvestmentSimulator from '../components/InvestmentSimulator'

export default function Simulator() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl font-bold text-dark mb-2">Investment Simulator 📊</h1>
      <p className="text-gray-500 mb-10">See how your monthly SIP grows over time.</p>

      <InvestmentSimulator showHeading={false} showDescription={false} showDisclaimer={true} />
    </main>
  )
}
