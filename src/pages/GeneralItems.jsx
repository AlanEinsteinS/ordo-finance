import ItemCard from '../components/ItemCard';
import { generalItems } from '../data/items';
import { Package } from 'phosphor-react';

function GeneralItems() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-zinc-800 p-2 rounded-md">
          <Package size={24} weight="regular" className="text-zinc-100" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-zinc-50">Itens Gerais</h1>
          <p className="text-sm text-zinc-400">Equipamentos úteis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {generalItems.map((item, index) => (
          <ItemCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default GeneralItems;
