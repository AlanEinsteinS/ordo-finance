import ItemCard from '../components/ItemCard';
import { weapons } from '../data/items';
import { Sword } from 'phosphor-react';

function Weapons() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-zinc-800 p-2 rounded-md">
          <Sword size={24} weight="regular" className="text-zinc-100" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-zinc-50">Armas</h1>
          <p className="text-sm text-zinc-400">Equipamentos de combate</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {weapons.map((weapon, index) => (
          <ItemCard key={index} item={weapon} />
        ))}
      </div>
    </div>
  );
}

export default Weapons;
