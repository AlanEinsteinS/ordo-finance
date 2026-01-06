import { Bag, CurrencyDollar } from 'phosphor-react';
import { useState } from 'react';
import useStore from '../store/useStore';
import { useToast } from '../components/ToastContainer';
import Modal from '../components/Modal';

function Inventory() {
  const { inventory, sellItem } = useStore();
  const toast = useToast();
  const [sellModal, setSellModal] = useState({ isOpen: false, item: null });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const handleSellClick = (item) => {
    setSellModal({ isOpen: true, item });
  };

  const handleSellConfirm = () => {
    const success = sellItem(sellModal.item.id);
    if (success) {
      const sellPrice = sellModal.item.pricePaid * 0.7;
      toast.success(`${sellModal.item.name} vendido por ${formatCurrency(sellPrice)}!`);
    } else {
      toast.error('Erro ao vender o item');
    }
    setSellModal({ isOpen: false, item: null });
  };

  const groupedInventory = inventory.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-3 rounded-lg shadow-lg">
          <Bag size={28} weight="duotone" className="text-emerald-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-zinc-50">Inventário</h1>
          <p className="text-sm text-zinc-400">Seus itens adquiridos - {inventory.length} {inventory.length === 1 ? 'item' : 'itens'}</p>
        </div>
      </div>

      {inventory.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <Bag size={64} weight="regular" className="text-zinc-600 mx-auto mb-4 opacity-50" />
          <p className="text-lg text-zinc-400">Seu inventário está vazio</p>
          <p className="text-sm text-zinc-500 mt-2">Compre itens nas outras seções</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedInventory).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-xl font-bold text-zinc-300 mb-4 px-1">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((item) => (
                  <div key={item.id} className="relative bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-all duration-300 hover:shadow-lg hover:shadow-zinc-950/50 hover:-translate-y-1 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-violet-500/0 group-hover:from-blue-500/5 group-hover:to-violet-500/5 rounded-xl transition-all duration-300 pointer-events-none"></div>

                    <div className="relative">
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-3xl">{item.image}</div>
                        <div className="text-right">
                          <p className="text-xs text-zinc-500">Comprado em</p>
                          <p className="text-xs text-zinc-300 font-medium">{formatDate(item.purchaseDate)}</p>
                        </div>
                      </div>

                      <h3 className="text-base font-semibold text-zinc-100 mb-2 group-hover:text-emerald-400 transition-colors">{item.name}</h3>
                      <p className="text-sm text-zinc-400 mb-4">{item.description}</p>

                      <div className="space-y-2 mb-4 p-3 bg-zinc-800/50 rounded-lg border border-zinc-800/50 text-sm">
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Preço Pago:</span>
                          <span className="text-emerald-400 font-bold">{formatCurrency(item.pricePaid)}</span>
                        </div>
                        {item.discount > 0 && (
                          <div className="flex justify-between">
                            <span className="text-zinc-500">Desconto:</span>
                            <span className="text-emerald-500 font-semibold">{item.discount}%</span>
                          </div>
                        )}
                        <div className="flex justify-between border-t border-zinc-700/50 pt-2">
                          <span className="text-zinc-500">Valor de Venda:</span>
                          <span className="text-yellow-400 font-bold">{formatCurrency(item.pricePaid * 0.7)}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSellClick(item)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 border border-yellow-500/30 hover:border-yellow-500/50 rounded-lg text-yellow-400 font-semibold transition-all hover:scale-105 transform"
                      >
                        <CurrencyDollar size={18} weight="duotone" />
                        Vender Item
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={sellModal.isOpen}
        onClose={() => setSellModal({ isOpen: false, item: null })}
        title="Vender Item"
        actions={
          <>
            <button
              onClick={() => setSellModal({ isOpen: false, item: null })}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-300 font-medium transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={handleSellConfirm}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-zinc-900 font-semibold transition-all"
            >
              Confirmar Venda
            </button>
          </>
        }
      >
        {sellModal.item && (
          <div className="space-y-3">
            <p>Deseja vender <span className="font-semibold text-zinc-100">{sellModal.item.name}</span>?</p>
            <div className="bg-zinc-800/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Preço pago:</span>
                <span className="text-zinc-100 font-semibold">{formatCurrency(sellModal.item.pricePaid)}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-zinc-700 pt-2">
                <span className="text-zinc-400">Você receberá:</span>
                <span className="text-yellow-400 font-bold">{formatCurrency(sellModal.item.pricePaid * 0.7)}</span>
              </div>
            </div>
            <p className="text-xs text-zinc-500">Você receberá 70% do valor pago.</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Inventory;
