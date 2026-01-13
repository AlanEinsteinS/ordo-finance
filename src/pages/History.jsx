import { ClockCounterClockwise, ArrowUp, ArrowDown, ShoppingCart, Trash, FunnelSimple } from 'phosphor-react';
import { useState, useMemo } from 'react';
import useStore from '../store/useStore';
import { useToast } from '../components/ToastContainer';
import Modal from '../components/Modal';

function History() {
  const { purchaseHistory, clearHistory } = useStore();
  const toast = useToast();
  const [showClearModal, setShowClearModal] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getIcon = (type) => {
    switch (type) {
      case 'deposit':
        return <ArrowUp size={20} weight="duotone" className="text-emerald-400" />;
      case 'withdrawal':
        return <ArrowDown size={20} weight="duotone" className="text-red-400" />;
      case 'purchase':
        return <ShoppingCart size={20} weight="duotone" className="text-blue-400" />;
      case 'sale':
        return <ArrowUp size={20} weight="duotone" className="text-yellow-400" />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'deposit':
        return 'Depósito';
      case 'withdrawal':
        return 'Retirada';
      case 'purchase':
        return 'Compra';
      case 'sale':
        return 'Venda';
      default:
        return type;
    }
  };

  const getAmountColor = (type) => {
    switch (type) {
      case 'deposit':
      case 'sale':
        return 'text-emerald-400';
      case 'withdrawal':
      case 'purchase':
        return 'text-red-400';
      default:
        return 'text-zinc-400';
    }
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'deposit':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'withdrawal':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'purchase':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'sale':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default:
        return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
    }
  };

  const handleClearHistory = () => {
    clearHistory();
    toast.success('Histórico limpo com sucesso');
    setShowClearModal(false);
  };

  const filteredHistory = useMemo(() => {
    let filtered = [...purchaseHistory];

    if (filterType !== 'all') {
      filtered = filtered.filter(t => t.type === filterType);
    }

    return filtered.reverse();
  }, [purchaseHistory, filterType]);

  const stats = useMemo(() => {
    const total = purchaseHistory.reduce((acc, t) => {
      if (t.type === 'deposit' || t.type === 'sale') {
        return acc + t.amount;
      } else {
        return acc - t.amount;
      }
    }, 0);

    const totalSpent = purchaseHistory
      .filter(t => t.type === 'purchase')
      .reduce((acc, t) => acc + t.amount, 0);

    const totalEarned = purchaseHistory
      .filter(t => t.type === 'sale')
      .reduce((acc, t) => acc + t.amount, 0);

    return { total, totalSpent, totalEarned };
  }, [purchaseHistory]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-3 rounded-lg shadow-lg">
            <ClockCounterClockwise size={28} weight="duotone" className="text-emerald-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-50">Histórico</h1>
            <p className="text-sm text-zinc-400">
              {filteredHistory.length} {filteredHistory.length === 1 ? 'transação' : 'transações'}
            </p>
          </div>
        </div>

        {purchaseHistory.length > 0 && (
          <button
            onClick={() => setShowClearModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-zinc-300 font-medium transition-all hover:scale-105"
          >
            <Trash size={16} weight="regular" />
            Limpar Histórico
          </button>
        )}
      </div>

      {purchaseHistory.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <ShoppingCart size={20} weight="duotone" className="text-blue-400" />
              </div>
              <span className="text-sm text-zinc-400">Total Gasto</span>
            </div>
            <p className="text-2xl font-bold text-red-400">{formatCurrency(stats.totalSpent)}</p>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <ArrowUp size={20} weight="duotone" className="text-yellow-400" />
              </div>
              <span className="text-sm text-zinc-400">Total Vendido</span>
            </div>
            <p className="text-2xl font-bold text-emerald-400">{formatCurrency(stats.totalEarned)}</p>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-zinc-500/10 rounded-lg">
                <ClockCounterClockwise size={20} weight="duotone" className="text-zinc-400" />
              </div>
              <span className="text-sm text-zinc-400">Balanço Total</span>
            </div>
            <p className={`text-2xl font-bold ${stats.total >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {formatCurrency(Math.abs(stats.total))}
            </p>
          </div>
        </div>
      )}

      {purchaseHistory.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <ClockCounterClockwise size={64} weight="regular" className="text-zinc-600 mx-auto mb-4 opacity-50" />
          <p className="text-lg text-zinc-400">Nenhuma transação realizada</p>
          <p className="text-sm text-zinc-500 mt-2">Seu histórico aparecerá aqui</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <FunnelSimple size={20} weight="duotone" className="text-zinc-500" />
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  filterType === 'all'
                    ? 'bg-gradient-to-r from-emerald-500/20 to-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700'
                }`}
              >
                Todas ({purchaseHistory.length})
              </button>
              <button
                onClick={() => setFilterType('purchase')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  filterType === 'purchase'
                    ? 'bg-gradient-to-r from-blue-500/20 to-blue-500/10 text-blue-400 border border-blue-500/30'
                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700'
                }`}
              >
                Compras ({purchaseHistory.filter(t => t.type === 'purchase').length})
              </button>
              <button
                onClick={() => setFilterType('sale')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  filterType === 'sale'
                    ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700'
                }`}
              >
                Vendas ({purchaseHistory.filter(t => t.type === 'sale').length})
              </button>
              <button
                onClick={() => setFilterType('deposit')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  filterType === 'deposit'
                    ? 'bg-gradient-to-r from-emerald-500/20 to-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700'
                }`}
              >
                Depósitos ({purchaseHistory.filter(t => t.type === 'deposit').length})
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-800/50 border-b border-zinc-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Descrição</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Categoria</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Data</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-zinc-400 uppercase tracking-wider">Valor</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-zinc-400 uppercase tracking-wider">Desconto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {filteredHistory.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${getTypeBadgeColor(transaction.type)}`}>
                          {getIcon(transaction.type)}
                          <span className="text-sm font-semibold">{getTypeLabel(transaction.type)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-zinc-200 font-medium">{transaction.description}</div>
                        {transaction.originalPrice && (
                          <div className="text-xs text-zinc-500 mt-1">
                            Preço original: {formatCurrency(transaction.originalPrice)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-400">
                        {transaction.category && (
                          <span className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-300 text-xs font-medium">
                            {transaction.category}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-400 font-medium">
                        {formatDate(transaction.date)}
                      </td>
                      <td className={`px-6 py-4 text-sm font-bold text-right ${getAmountColor(transaction.type)}`}>
                        {transaction.type === 'deposit' || transaction.type === 'sale' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td className="px-6 py-4 text-sm text-right">
                        {transaction.discount > 0 ? (
                          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-md text-xs font-bold">
                            {transaction.discount}%
                          </span>
                        ) : (
                          <span className="text-zinc-600">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        title="Limpar Histórico"
        actions={
          <>
            <button
              onClick={() => setShowClearModal(false)}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-300 font-medium transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={handleClearHistory}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold transition-all"
            >
              Limpar Tudo
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <p>Tem certeza que deseja limpar todo o histórico?</p>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <p className="text-sm text-yellow-400 font-medium">
              ⚠️ Esta ação não pode ser desfeita. Todas as {purchaseHistory.length} transações serão removidas permanentemente.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default History;
