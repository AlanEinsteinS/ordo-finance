import { MagnifyingGlass, SortAscending } from 'phosphor-react';
import { useState } from 'react';

function SearchFilter({ onSearch, onSort, sortOptions = [] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <MagnifyingGlass
          size={20}
          weight="regular"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Buscar itens..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-3 text-zinc-100 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => handleSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {sortOptions.length > 0 && (
        <div className="relative">
          <SortAscending
            size={20}
            weight="regular"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
          />
          <select
            onChange={(e) => onSort(e.target.value)}
            className="appearance-none bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-10 py-3 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all cursor-pointer"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
            ▼
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchFilter;
