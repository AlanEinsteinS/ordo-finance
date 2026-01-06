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
    <aside className="w-64 border-r border-zinc-800/50 min-h-screen p-6 bg-gradient-to-b from-zinc-900/50 via-zinc-900/30 to-zinc-900/50 backdrop-blur-sm">
      <nav className="space-y-8">
        <div>
          <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 px-3 flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></div>
            Conta
            <div className="h-px flex-1 bg-gradient-to-l from-zinc-800 to-transparent"></div>
          </h2>
          <div className="space-y-1">
            {accountItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/10'
                      : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 border border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon size={20} weight={isActive ? 'duotone' : 'regular'} className={isActive ? '' : 'group-hover:scale-110 transition-transform'} />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="border-t border-zinc-800/50 pt-6">
          <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 px-3 flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></div>
            Loja
            <div className="h-px flex-1 bg-gradient-to-l from-zinc-800 to-transparent"></div>
          </h2>
          <div className="space-y-1">
            {shopItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500/20 to-violet-500/5 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/10'
                      : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 border border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon size={20} weight={isActive ? 'duotone' : 'regular'} className={isActive ? '' : 'group-hover:scale-110 transition-transform'} />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
