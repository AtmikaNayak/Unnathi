import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function InvestmentSimulator() {
  const [monthly, setMonthly] = useState(500);
  const [years, setYears] = useState(5);

  const generateData = () => {
    let data = [];
    let total = 0;

    for (let i = 1; i <= years; i++) {
      total += monthly * 12;
      let estimated = total * 1.12; // simple 12% growth assumption

      data.push({
        year: `Year ${i}`,
        invested: total,
        value: Math.round(estimated)
      });
    }

    return data;
  };

  const chartData = generateData();

  return (
    <div className="bg-white shadow-lg p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">Investment Simulator</h2>

      <div className="flex gap-4 mb-4">
        <div>
          <label className="block text-sm">Monthly Investment (₹)</label>
          <input
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
            className="border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm">Years</label>
          <select
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="border p-2 rounded"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="invested" stroke="#8884d8" name="Invested" />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" name="Estimated Value" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}