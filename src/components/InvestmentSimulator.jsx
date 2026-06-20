import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function InvestmentSimulator({
  showHeading = true,
  showDescription = true,
  showDisclaimer = true,
  className = ""
}) {
  const [monthly, setMonthly] = useState(500);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(12);
  const [stepUp, setStepUp] = useState(0);

  const data = useMemo(() => {
    const points = [];
    const r = rate / 100 / 12;
    const stepRate = stepUp / 100;
    let valueNormal = 0;
    let valueStep = 0;
    let investedNormal = 0;
    let investedStep = 0;

    for (let y = 1; y <= years; y++) {
      const stepMonthly = monthly * Math.pow(1 + stepRate, y - 1);
      for (let m = 0; m < 12; m++) {
        valueNormal = valueNormal * (1 + r) + monthly;
        investedNormal += monthly;
        valueStep = valueStep * (1 + r) + stepMonthly;
        investedStep += stepMonthly;
      }
      points.push({
        year: `Year ${y}`,
        "SIP Invested": Math.round(investedNormal),
        "SIP Value": Math.round(valueNormal),
        "Step-Up Invested": Math.round(investedStep),
        "Step-Up Value": Math.round(valueStep)
      });
    }
    return points;
  }, [monthly, years, rate, stepUp]);

  const finalValue = data[data.length - 1]?.["SIP Value"] || 0;
  const totalInvested = data[data.length - 1]?.["SIP Invested"] || 0;
  const finalValueStep = data[data.length - 1]?.["Step-Up Value"] || 0;
  const totalInvestedStep = data[data.length - 1]?.["Step-Up Invested"] || 0;

  const fmt = (n) => n >= 100000
    ? `₹${(n / 100000).toFixed(1)}L`
    : `₹${(n / 1000).toFixed(1)}K`;

  const tips = useMemo(() => {
    const list = [];
    if (monthly < 1000 && years >= 10) {
      list.push("Small SIPs grow steadily over long periods — consider increasing by ₹500 when possible.");
    }
    if (years < 5) {
      list.push("Short durations can limit compounding. Try 7–10 years for stronger growth.");
    }
    if (rate <= 8) {
      list.push("A lower return assumption is safer. Long-term equity SIPs often target higher averages.");
    }
    if (stepUp >= 10) {
      list.push("Great! A 10%+ step-up can significantly boost long-term wealth.");
    } else if (stepUp > 0 && stepUp < 5) {
      list.push("Even a small step-up helps. Try 5–10% if your income grows yearly.");
    } else if (stepUp === 0 && years >= 10) {
      list.push("Consider adding a step-up to beat inflation and grow faster over long horizons.");
    }
    if (monthly >= 10000 && years >= 15) {
      list.push("Strong commitment — review your goals yearly and rebalance if needed.");
    }
    return list.slice(0, 4);
  }, [monthly, years, rate, stepUp]);

  return (
    <section className={`bg-white border border-purple-100 rounded-2xl p-6 shadow-sm ${className}`}>
      {showHeading && (
        <h2 className="font-display text-2xl font-bold text-dark mb-2">Investment Simulator</h2>
      )}
      {showDescription && (
        <p className="text-gray-500 mb-6">See how your monthly SIP grows over time.</p>
      )}

      {/* Controls */}
      <div className="bg-light rounded-2xl p-6 mb-6 grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label className="text-sm font-semibold text-gray-600">
              Monthly Investment
            </label>
            <span className="text-sm font-semibold text-primary">₹{monthly.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="500"
            max="50000"
            step="500"
            value={monthly}
            onChange={e => setMonthly(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>₹500</span><span>₹50,000</span>
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label className="text-sm font-semibold text-gray-600">
              Duration
            </label>
            <span className="text-sm font-semibold text-primary">{years} yrs</span>
          </div>
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={years}
            onChange={e => setYears(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>1 yr</span><span>30 yrs</span>
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label className="text-sm font-semibold text-gray-600">
              Expected Return (assumed)
            </label>
            <span className="text-sm font-semibold text-primary">{rate}% p.a.</span>
          </div>
          <input
            type="range"
            min="6"
            max="20"
            step="1"
            value={rate}
            onChange={e => setRate(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>6%</span><span>20%</span>
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label className="text-sm font-semibold text-gray-600">
              Annual SIP Increase
            </label>
            <span className="text-sm font-semibold text-primary">{stepUp}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            step="1"
            value={stepUp}
            onChange={e => setStepUp(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>0%</span><span>20%</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6">
        <div className="bg-white border border-purple-100 rounded-xl p-5 text-center shadow-sm">
          <p className="text-sm text-gray-400 mb-1">Total Invested (SIP)</p>
          <p className="font-display text-2xl font-bold text-dark">{fmt(totalInvested)}</p>
        </div>
        <div className="bg-white border border-purple-100 rounded-xl p-5 text-center shadow-sm">
          <p className="text-sm text-gray-400 mb-1">Total Invested (Step-Up)</p>
          <p className="font-display text-2xl font-bold text-dark">{fmt(totalInvestedStep)}</p>
        </div>
        <div className="bg-primary text-white rounded-xl p-5 text-center shadow-sm">
          <p className="text-sm text-purple-200 mb-1">Estimated Value (SIP)</p>
          <p className="font-display text-2xl font-bold">{fmt(finalValue)}</p>
        </div>
        <div className="bg-secondary text-white rounded-xl p-5 text-center shadow-sm">
          <p className="text-sm text-pink-200 mb-1">Estimated Value (Step-Up)</p>
          <p className="font-display text-2xl font-bold">{fmt(finalValueStep)}</p>
        </div>
      </div>

      {/* Smart Tips */}
      <div className="bg-light border border-purple-100 rounded-2xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-dark">Smart Tips</h3>
          <span className="text-xs text-gray-400">Based on your inputs</span>
        </div>
        {tips.length > 0 ? (
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            {tips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">Looks good! Try adjusting values to see personalized tips.</p>
        )}
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
            <Line type="monotone" dataKey="SIP Value" name="SIP Value" stroke="#7B2D8B" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="Step-Up Value" name="Step-Up Value" stroke="#E36B8B" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {showDisclaimer && (
        <p className="text-xs text-gray-400 mt-4 text-center">
          * This simulator uses a fixed average annual return to show how SIP compounding works.
          It is for education only and does not predict actual market results.
        </p>
      )}
    </section>
  );
}
