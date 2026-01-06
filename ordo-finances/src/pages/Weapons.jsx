import ItemCard from '../components/ItemCard';
import SearchFilter from '../components/SearchFilter';
import { weapons } from '../data/items';
import { Sword } from 'phosphor-react';
import { useState, useMemo } from 'react';

function Weapons() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const sortOptions = [
    { value: 'name', label: 'Nome (A-Z)' },
    { value: 'price-asc', label: 'Preço (Menor)' },
    { value: 'price-desc', label: 'Preço (Maior)' },
  ];

  const filteredAndSortedWeapons = useMemo(() => {
    let filtered = weapons.filter((weapon) =>
      weapon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      weapon.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, sortBy]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-3 rounded-lg shadow-lg">
          <Sword size={28} weight="duotone" className="text-emerald-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-zinc-50">Armas</h1>
          <p className="text-sm text-zinc-400">Equipamentos de combate - {filteredAndSortedWeapons.length} {filteredAndSortedWeapons.length === 1 ? 'item' : 'itens'}</p>
        </div>
      </div>

      <SearchFilter
        onSearch={setSearchTerm}
        onSort={setSortBy}
        sortOptions={sortOptions}
      />

      {filteredAndSortedWeapons.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <Sword size={64} weight="regular" className="text-zinc-600 mx-auto mb-4 opacity-50" />
          <p className="text-lg text-zinc-400">Nenhuma arma encontrada</p>
          <p className="text-sm text-zinc-500 mt-2">Tente ajustar sua busca</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAndSortedWeapons.map((weapon, index) => (
            <ItemCard key={index} item={weapon} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Weapons;
