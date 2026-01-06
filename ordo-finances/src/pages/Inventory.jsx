import { Bag, CurrencyDollar } from 'phosphor-react';
import useStore from '../store/useStore';

function Inventory() {
  const { inventory, sellItem } = useStore();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const handleSell = (itemId, itemName) => {
    if (confirm(`Deseja vender ${itemName}? Você receberá 70% do valor pago.`)) {
      sellItem(itemId);
      alert('Item vendido com sucesso!');
    }
  };

  const groupedInventory = inventory.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-zinc-800 p-2 rounded-md">
          <Bag size={24} weight="regular" className="text-zinc-100" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-zinc-50">Inventário</h1>
          <p className="text-sm text-zinc-400">Seus itens adquiridos</p>
        </div>
      </div>

      {inventory.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-md p-12 text-center">
          <Bag size={64} weight="regular" className="text-zinc-600 mx-auto mb-4" />
          <p className="text-lg text-zinc-400">Seu inventário está vazio</p>
          <p className="text-sm text-zinc-500 mt-2">Compre itens nas outras seções</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedInventory).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-lg font-semibold text-zinc-300 mb-4">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-md p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-3xl">{item.image}</div>
                      <div className="text-right">
                        <p className="text-xs text-zinc-400">Comprado em</p>
                        <p className="text-xs text-zinc-100">{formatDate(item.purchaseDate)}</p>
                      </div>
                    </div>

                    <h3 className="text-base font-semibold text-zinc-100 mb-2">{item.name}</h3>
                    <p className="text-sm text-zinc-400 mb-3">{item.description}</p>

                    <div className="space-y-1 mb-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Preço Pago:</span>
                        <span className="text-green-400 font-semibold">{formatCurrency(item.pricePaid)}</span>
                      </div>
                      {item.discount > 0 && (
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Desconto:</span>
                          <span className="text-green-500">{item.discount}%</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Valor de Venda:</span>
                        <span className="text-yellow-400 font-semibold">{formatCurrency(item.pricePaid * 0.7)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSell(item.id, item.name)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-md text-zinc-300 font-medium"
                    >
                      <CurrencyDollar size={16} weight="regular" />
                      Vender Item
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Inventory;
