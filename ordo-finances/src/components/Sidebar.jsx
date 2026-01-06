import { NavLink } from 'react-router-dom';
import {
  Sword,
  Target,
  Package,
  Skull,
  ShoppingCart,
  ClockCounterClockwise,
  Wallet,
  Bag
} from 'phosphor-react';

function Sidebar() {
  const shopItems = [
    { path: '/', icon: Sword, label: 'Armas' },
    { path: '/ammunition', icon: Target, label: 'Munições' },
    { path: '/general-items', icon: Package, label: 'Itens Gerais' },
    { path: '/paranormal-items', icon: Skull, label: 'Itens Paranormais' },
  ];

  const accountItems = [
    { path: '/cart', icon: ShoppingCart, label: 'Carrinho' },
    { path: '/inventory', icon: Bag, label: 'Inventário' },
    { path: '/history', icon: ClockCounterClockwise, label: 'Histórico' },
    { path: '/balance', icon: Wallet, label: 'Saldo' },
  ];

  return (
    <aside className="w-64 border-r border-zinc-800 min-h-screen p-4 bg-zinc-900/30">
      <nav className="space-y-6">
        <div>
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-3">Conta</h2>
          <div className="space-y-1">
            {accountItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-zinc-800 text-zinc-50'
                      : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300'
                  }`
                }
              >
                <item.icon size={20} weight="regular" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-6">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-3">Loja</h2>
          <div className="space-y-1">
            {shopItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-zinc-800 text-zinc-50'
                      : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300'
                  }`
                }
              >
                <item.icon size={20} weight="regular" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
