import { ShoppingCart, Trash, CreditCard, X } from 'phosphor-react';
import { useState } from 'react';
import useStore from '../store/useStore';
import { useToast } from '../components/ToastContainer';
import Modal from '../components/Modal';

function Cart() {
  const { cart, balance, removeFromCart, clearCart, checkout } = useStore();
  const toast = useToast();
  const [showClearModal, setShowClearModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

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
      toast.success(`Compra finalizada! Total: ${formatCurrency(result.total)}`);
      setShowCheckoutModal(false);
    } else {
      toast.error('Saldo insuficiente!');
      setShowCheckoutModal(false);
    }
  };

  const handleClearCart = () => {
    clearCart();
    toast.info('Carrinho limpo com sucesso');
    setShowClearModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-3 rounded-lg shadow-lg">
            <ShoppingCart size={28} weight="duotone" className="text-emerald-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-50">Carrinho</h1>
            <p className="text-sm text-zinc-400">{cart.length} {cart.length === 1 ? 'item' : 'itens'}</p>
          </div>
        </div>

        {cart.length > 0 && (
          <button
            onClick={() => setShowClearModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-zinc-300 font-medium transition-all hover:scale-105"
          >
            <Trash size={16} weight="regular" />
            Limpar Carrinho
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <ShoppingCart size={64} weight="regular" className="text-zinc-600 mx-auto mb-4 opacity-50" />
          <p className="text-lg text-zinc-400">Carrinho vazio</p>
          <p className="text-sm text-zinc-500 mt-2">Adicione itens para começar sua compra</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {cart.map((item) => {
              const finalPrice = item.price - (item.price * item.discount / 100);
              return (
                <div key={item.cartId} className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex items-start justify-between gap-4 hover:border-zinc-700 transition-all animate-fade-in">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-zinc-50">{item.name}</h3>
                        <p className="text-xs text-zinc-500 uppercase tracking-wide">{item.category}</p>
                      </div>
                      {item.discount > 0 && (
                        <span className="bg-gradient-to-r from-emerald-500/20 to-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-md text-xs font-bold">
                          -{item.discount}%
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">{item.description}</p>
                    <div className="flex items-center gap-4">
                      {item.discount > 0 && (
                        <span className="text-sm text-zinc-600 line-through">{formatCurrency(item.price)}</span>
                      )}
                      <span className="text-lg font-bold text-emerald-400">{formatCurrency(finalPrice)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.cartId)}
                    className="p-2 hover:bg-red-500/10 rounded-lg text-zinc-400 hover:text-red-400 transition-all"
                  >
                    <X size={20} weight="bold" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-xl p-6 sticky top-24 shadow-lg">
              <h2 className="text-xl font-bold text-zinc-100 mb-6">Resumo</h2>

              <div className="space-y-3 mb-4 pb-4 border-b border-zinc-800">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Subtotal</span>
                  <span className="text-zinc-300 font-semibold">{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Itens</span>
                  <span className="text-zinc-300 font-semibold">{cart.length}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-lg font-semibold text-zinc-100">Total</span>
                <span className="text-2xl font-bold text-emerald-400">{formatCurrency(total)}</span>
              </div>

              <div className="mb-6 p-4 bg-gradient-to-r from-zinc-800/50 to-zinc-800/30 rounded-lg border border-zinc-700/50">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-400">Saldo disponível</span>
                  <span className={`font-bold ${balance >= total ? 'text-emerald-400' : 'text-red-400'}`}>
                    {formatCurrency(balance)}
                  </span>
                </div>
                {balance >= total && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Saldo após compra</span>
                    <span className="text-zinc-400 font-semibold">{formatCurrency(balance - total)}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => canCheckout && setShowCheckoutModal(true)}
                disabled={!canCheckout}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                  canCheckout
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transform hover:scale-105'
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                }`}
              >
                <CreditCard size={20} weight="duotone" />
                {canCheckout ? 'Finalizar Compra' : 'Saldo Insuficiente'}
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        title="Limpar Carrinho"
        actions={
          <>
            <button
              onClick={() => setShowClearModal(false)}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-300 font-medium transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={handleClearCart}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-medium transition-all"
            >
              Limpar
            </button>
          </>
        }
      >
        <p>Tem certeza que deseja limpar todo o carrinho? Esta ação não pode ser desfeita.</p>
      </Modal>

      <Modal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        title="Confirmar Compra"
        actions={
          <>
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-300 font-medium transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={handleCheckout}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white font-semibold transition-all"
            >
              Confirmar
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <p>Confirmar a compra de {cart.length} {cart.length === 1 ? 'item' : 'itens'}?</p>
          <div className="bg-zinc-800/50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Total da compra:</span>
              <span className="text-zinc-100 font-semibold">{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Saldo atual:</span>
              <span className="text-emerald-400 font-semibold">{formatCurrency(balance)}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-zinc-700 pt-2">
              <span className="text-zinc-400">Saldo após compra:</span>
              <span className="text-emerald-400 font-bold">{formatCurrency(balance - total)}</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Cart;
