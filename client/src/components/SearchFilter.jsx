function SearchFilter({
  search,
  setSearch,
  filter,
  setFilter,
}) {
  return (
    <div className="row mb-4">

      <div className="col-md-8">

        <input
          className="form-control"
          placeholder="Search Subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="col-md-4">

        <select
          className="form-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Present</option>
          <option>Absent</option>
        </select>

      </div>

    </div>
  );
}

export default SearchFilter;