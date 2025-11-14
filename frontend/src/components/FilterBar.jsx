const FilterBar = ({ filters, onFilterChange, stats }) => {
  const categories = stats?.data?.categories || [];
  const projects = stats?.data?.projects || [];
  const teams = stats?.data?.teams || [];

  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 mb-4 sm:mb-6 border border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={filters.category || ''}
            onChange={(e) => onFilterChange('category', e.target.value || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat._id}>
                {cat._id} ({cat.count})
              </option>
            ))}
          </select>
        </div>

        {/* Project Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project
          </label>
          <select
            value={filters.project || ''}
            onChange={(e) => onFilterChange('project', e.target.value || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Projects</option>
            {projects.map((proj, index) => (
              <option key={index} value={proj._id}>
                {proj._id} ({proj.count})
              </option>
            ))}
          </select>
        </div>

        {/* Team Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Team
          </label>
          <select
            value={filters.team || ''}
            onChange={(e) => onFilterChange('team', e.target.value || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Teams</option>
            {teams.map((team, index) => (
              <option key={index} value={team._id}>
                {team._id} ({team.count})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters */}
      {(filters.category || filters.project || filters.team) && (
        <div className="mt-3 sm:mt-4">
          <button
            onClick={() => {
              onFilterChange('category', null);
              onFilterChange('project', null);
              onFilterChange('team', null);
            }}
            className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;

