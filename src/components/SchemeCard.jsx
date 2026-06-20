function SchemeCard() {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg">
      <h3 className="text-lg font-semibold">Mudra Loan</h3>
      <p className="text-gray-600">
        Government loan scheme for women entrepreneurs.
      </p>

      <button className="mt-3 bg-green-500 text-white px-3 py-1 rounded">
        Learn More
      </button>
    </div>
  );
}

export default SchemeCard;