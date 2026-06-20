function ScholarshipCard() {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg">
      <h3 className="text-lg font-semibold">Pragati Scholarship</h3>
      <p className="text-gray-600">Provider: AICTE</p>
      <p>Amount: ₹50,000</p>
      <p className="text-red-500">Deadline: 30 April 2026</p>

      <button className="mt-3 bg-blue-500 text-white px-3 py-1 rounded">
        Apply Now
      </button>
    </div>
  );
}

export default ScholarshipCard;