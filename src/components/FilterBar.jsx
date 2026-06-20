function FilterBar() {
  return (
    <div className="flex gap-4 mb-8">
      <select className="border p-2 rounded">
        <option>State</option>
        <option>Karnataka</option>
        <option>Maharashtra</option>
        <option>Tamil Nadu</option>
      </select>

      <select className="border p-2 rounded">
        <option>Course</option>
        <option>Engineering</option>
        <option>Medical</option>
        <option>Commerce</option>
      </select>

      <select className="border p-2 rounded">
        <option>Year</option>
        <option>1st</option>
        <option>2nd</option>
        <option>3rd</option>
        <option>4th</option>
      </select>
    </div>
  );
}

export default FilterBar;