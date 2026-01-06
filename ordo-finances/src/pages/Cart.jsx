import { ShoppingCart, Trash, CreditCard, X } from 'phosphor-react';
import useStore from '../store/useStore';

function Cart() {
  const { cart, balance, removeFromCart, clearCart, checkout } = useStore();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const total = cart.reduce((sum, item) => {
    const finalPrice = item.price - (item.price * item.discount / 100);
    return sum + finalPrice;
  }, 0);

  const canCheckout = balance >= total && cart.length > 0;

  const handleCheckout = () => {
    const result = checkout();
    if (result.success) {
      alert(`Compra finalizada! Total: ${formatCurrency(result.total)}`);
    } else {
      alert('Saldo insuficiente!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-zinc-800 p-2 rounded-md">
            <ShoppingCart size={24} weight="regular" className="text-zinc-100" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-zinc-50">Carrinho</h1>
            <p className="text-sm text-zinc-400">{cart.length} {cart.length === 1 ? 'item' : 'itens'}</p>
          </div>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-md text-zinc-300 font-medium"
          >
            <Trash size={16} weight="regular" />
            Limpar Carrinho
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-md p-12 text-center">
          <ShoppingCart size={64} weight="regular" className="text-zinc-600 mx-auto mb-4" />
          <p className="text-lg text-zinc-400">Carrinho vazio</p>
          <p className="text-sm text-zinc-500 mt-2">Adicione itens para começar sua compra</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {cart.map((item) => {
              const finalPrice = item.price - (item.price * item.discount / 100);
              return (
                <div key={item.cartId} className="bg-zinc-900 border border-zinc-800 rounded-md p-4 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-zinc-50">{item.name}</h3>
                        <p className="text-xs text-zinc-500 uppercase tracking-wide">{item.category}</p>
                      </div>
                      {item.discount > 0 && (
                        <span className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded text-xs font-semibold">
                          -{item.discount}%
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">{item.description}</p>
                    <div className="flex items-center gap-4">
                      {item.discount > 0 && (
                        <span className="text-sm text-zinc-600 line-through">{formatCurrency(item.price)}</span>
                      )}
                      <span className="text-lg font-bold text-zinc-50">{formatCurrency(finalPrice)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.cartId)}
                    className="p-2 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-zinc-300 transition-colors"
                  >
                    <X size={20} weight="regular" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-zinc-800 rounded-md p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-zinc-100 mb-4">Resumo</h2>

              <div className="space-y-3 mb-4 pb-4 border-b border-zinc-800">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Subtotal</span>
                  <span className="text-zinc-300">{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Itens</span>
                  <span className="text-zinc-300">{cart.length}</span>
                </div>
              </div>

              <div className="flex justify-between mb-4">
                <span className="text-lg font-semibold text-zinc-100">Total</span>
                <span className="text-2xl font-bold text-zinc-50">{formatCurrency(total)}</span>
              </div>

              <div className="mb-4 p-3 bg-zinc-800/50 rounded border border-zinc-800">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-zinc-400">Saldo disponível</span>
                  <span className={balance >= total ? 'text-emerald-400' : 'text-red-400'}>
                    {formatCurrency(balance)}
                  </span>
                </div>
                {balance >= total && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Saldo após compra</span>
                    <span className="text-zinc-400">{formatCurrency(balance - total)}</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleCheckout}
                disabled={!canCheckout}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md font-semibold transition-all ${
                  canCheckout
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                }`}
              >
                <CreditCard size={20} weight="regular" />
                {canCheckout ? 'Finalizar Compra' : 'Saldo Insuficiente'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
