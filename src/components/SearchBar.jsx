import { useState } from "react";

function SearchBar({ onSearch, onMuscleFilter, onSort }) {
  const [search, setSearch] = useState("");

  function handleSearch(event) {
    const value = event.target.value;

    setSearch(value);
    onSearch(value);
  }

  return (
    <div className="search-bar">

      <div className="search-group">
        <label>Search Exercise</label>

        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="e.g. Bench Press"
        />
      </div>

      <div className="search-group">
        <label>Muscle Group</label>

        <select
          onChange={(event) => onMuscleFilter(event.target.value)}
        >
          <option value="all">All Muscle Groups</option>
          <option value="Chest">Chest</option>
          <option value="Back">Back</option>
          <option value="Shoulders">Shoulders</option>
          <option value="Biceps">Biceps</option>
          <option value="Triceps">Triceps</option>
          <option value="Legs">Legs</option>
          <option value="Glutes">Glutes</option>
          <option value="Abs">Abs</option>
          <option value="Calves">Calves</option>
          <option value="Full Body">Full Body</option>
        </select>
      </div>

      <div className="search-group">
        <label>Sort</label>

        <select
          onChange={(event) => onSort(event.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="volume-high">Highest Volume</option>
          <option value="volume-low">Lowest Volume</option>
        </select>
      </div>

    </div>
  );
}

export default SearchBar;