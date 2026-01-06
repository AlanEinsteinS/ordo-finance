import { ShoppingCart, Tag, Percent } from 'phosphor-react';
import { useState } from 'react';
import useStore from '../store/useStore';

function ItemCard({ item }) {
  const { addToCart } = useStore();
  const [discount, setDiscount] = useState(0);
  const [showDiscountInput, setShowDiscountInput] = useState(false);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const finalPrice = item.price - (item.price * discount / 100);

  const handleAddToCart = () => {
    addToCart(item, discount);
    setDiscount(0);
    setShowDiscountInput(false);
  };

  return (
    <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 hover:border-zinc-700 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-zinc-50 mb-1">{item.name}</h3>
          <p className="text-xs text-zinc-500 uppercase tracking-wide">{item.category}</p>
        </div>
        {discount > 0 && (
          <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded text-xs font-semibold">
            <Percent size={12} weight="bold" />
            {discount}%
          </div>
        )}
      </div>

      <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{item.description}</p>

      {(item.damage || item.range || item.quantity || item.uses || item.defense || item.effect || item.element) && (
        <div className="space-y-2 mb-4 p-3 bg-zinc-800/50 rounded border border-zinc-800">
          {item.damage && (
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Dano</span>
              <span className="text-red-400 font-medium">{item.damage}</span>
            </div>
          )}
          {item.range && (
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Alcance</span>
              <span className="text-zinc-300 font-medium">{item.range}</span>
            </div>
          )}
          {item.quantity && (
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Quantidade</span>
              <span className="text-zinc-300 font-medium">{item.quantity}un</span>
            </div>
          )}
          {item.uses && (
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Usos</span>
              <span className="text-zinc-300 font-medium">{item.uses}x</span>
            </div>
          )}
          {item.defense && (
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Defesa</span>
              <span className="text-blue-400 font-medium">{item.defense}</span>
            </div>
          )}
          {item.element && (
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Elemento</span>
              <span className="text-violet-400 font-medium">{item.element}</span>
            </div>
          )}
          {item.effect && (
            <div className="text-sm pt-2 border-t border-zinc-700">
              <p className="text-zinc-500 mb-1">Efeito</p>
              <p className="text-violet-400 text-xs">{item.effect}</p>
            </div>
          )}
        </div>
      )}

      <div className="border-t border-zinc-800 pt-4 mt-auto">
        <div className="flex items-center justify-between mb-3">
          <div>
            {discount > 0 && (
              <p className="text-xs text-zinc-600 line-through">{formatCurrency(item.price)}</p>
            )}
            <p className="text-2xl font-bold text-zinc-50">{formatCurrency(finalPrice)}</p>
          </div>
          <button
            onClick={() => setShowDiscountInput(!showDiscountInput)}
            className={`p-2 rounded-md transition-colors ${
              showDiscountInput ? 'bg-zinc-700 text-zinc-100' : 'hover:bg-zinc-800 text-zinc-400'
            }`}
            title="Aplicar desconto"
          >
            <Tag size={20} weight="regular" />
          </button>
        </div>

        {showDiscountInput && (
          <div className="mb-3">
            <div className="relative">
              <input
                type="number"
                min="0"
                max="100"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md pl-3 pr-10 py-2 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600"
                placeholder="0"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">%</span>
            </div>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md font-medium transition-all bg-zinc-50 text-zinc-900 hover:bg-white"
        >
          <ShoppingCart size={20} weight="regular" />
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
