import ItemCard from '../components/ItemCard';
import { paranormalItems } from '../data/items';
import { Skull } from 'phosphor-react';

function ParanormalItems() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-zinc-800 p-2 rounded-md">
          <Skull size={24} weight="regular" className="text-zinc-100" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-zinc-50">Itens Paranormais</h1>
          <p className="text-sm text-zinc-400">Artefatos de poder oculto</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paranormalItems.map((item, index) => (
          <ItemCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default ParanormalItems;
