import { Wallet, ShoppingCart } from 'phosphor-react';
import { Link } from 'react-router-dom';
import useStore from '../store/useStore';

function Header() {
  const { balance, cart } = useStore();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <header className="border-b border-zinc-800/50 bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-900/95 backdrop-blur-md sticky top-0 z-50 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
      <div className="container mx-auto px-6 py-4 relative">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all transform hover:scale-105 group">
            <div className="text-3xl group-hover:rotate-12 transition-transform duration-300">⚔️</div>
            <div>
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                Ordo Finances
              </h1>
              <p className="text-xs text-zinc-500">Sistema de Compras</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative px-4 py-2.5 hover:bg-zinc-800/50 rounded-lg transition-all group transform hover:scale-105"
            >
              <div className="flex items-center gap-2">
                <ShoppingCart size={22} weight="duotone" className="text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                <span className="text-sm font-semibold text-zinc-400 group-hover:text-zinc-200 transition-colors">{cart.length}</span>
              </div>
              {cart.length > 0 && (
                <span className="absolute top-1 right-2 bg-emerald-500 w-2.5 h-2.5 rounded-full animate-pulse-glow shadow-lg shadow-emerald-500/50"></span>
              )}
            </Link>

            <div className="h-8 w-px bg-gradient-to-b from-transparent via-zinc-700 to-transparent"></div>

            <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-lg backdrop-blur-sm">
              <Wallet size={22} weight="duotone" className="text-emerald-400" />
              <span className="text-base font-bold text-emerald-400 tabular-nums">{formatCurrency(balance)}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
