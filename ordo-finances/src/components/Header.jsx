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
    <header className="border-b border-zinc-800 bg-zinc-900/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl">⚔️</span>
            <div>
              <h1 className="text-lg font-semibold text-zinc-50">Ordo Finances</h1>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="relative px-4 py-2 hover:bg-zinc-800/50 rounded-md transition-colors group"
            >
              <div className="flex items-center gap-2">
                <ShoppingCart size={22} weight="regular" className="text-zinc-400 group-hover:text-zinc-300" />
                <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300">{cart.length}</span>
              </div>
              {cart.length > 0 && (
                <span className="absolute top-1 right-2 bg-emerald-500 w-2 h-2 rounded-full"></span>
              )}
            </Link>

            <div className="h-6 w-px bg-zinc-800"></div>

            <div className="flex items-center gap-2 px-3 py-2">
              <Wallet size={22} weight="regular" className="text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-400">{formatCurrency(balance)}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
