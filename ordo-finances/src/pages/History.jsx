import { ClockCounterClockwise, ArrowUp, ArrowDown, ShoppingCart, Trash } from 'phosphor-react';
import useStore from '../store/useStore';

function History() {
  const { purchaseHistory, clearHistory } = useStore();

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
        return <ArrowUp size={20} weight="regular" className="text-green-400" />;
      case 'withdrawal':
        return <ArrowDown size={20} weight="regular" className="text-red-400" />;
      case 'purchase':
        return <ShoppingCart size={20} weight="regular" className="text-blue-400" />;
      case 'sale':
        return <ArrowUp size={20} weight="regular" className="text-yellow-400" />;
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
        return 'text-green-400';
      case 'withdrawal':
      case 'purchase':
        return 'text-red-400';
      default:
        return 'text-zinc-400';
    }
  };

  const handleClearHistory = () => {
    if (confirm('Deseja limpar todo o histórico? Esta ação não pode ser desfeita.')) {
      clearHistory();
    }
  };

  const sortedHistory = [...purchaseHistory].reverse();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-zinc-800 p-2 rounded-md">
            <ClockCounterClockwise size={24} weight="regular" className="text-zinc-100" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-zinc-50">Histórico</h1>
            <p className="text-sm text-zinc-400">Todas as transações realizadas</p>
          </div>
        </div>

        {purchaseHistory.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-md text-zinc-300 font-medium"
          >
            <Trash size={16} weight="regular" />
            Limpar Histórico
          </button>
        )}
      </div>

      {purchaseHistory.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-md p-12 text-center">
          <ClockCounterClockwise size={64} weight="regular" className="text-zinc-600 mx-auto mb-4" />
          <p className="text-lg text-zinc-400">Nenhuma transação realizada</p>
          <p className="text-sm text-zinc-500 mt-2">Seu histórico aparecerá aqui</p>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase">Tipo</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase">Descrição</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase">Categoria</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase">Data</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-400 uppercase">Valor</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-400 uppercase">Desconto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {sortedHistory.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-zinc-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getIcon(transaction.type)}
                        <span className="text-sm font-medium text-zinc-100">{getTypeLabel(transaction.type)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-300">
                      {transaction.description}
                      {transaction.originalPrice && (
                        <div className="text-xs text-zinc-500 mt-1">
                          Preço original: {formatCurrency(transaction.originalPrice)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-400">
                      {transaction.category && (
                        <span className="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-zinc-300 text-xs">
                          {transaction.category}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-400">
                      {formatDate(transaction.date)}
                    </td>
                    <td className={`px-6 py-4 text-sm font-semibold text-right ${getAmountColor(transaction.type)}`}>
                      {transaction.type === 'deposit' || transaction.type === 'sale' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="px-6 py-4 text-sm text-right">
                      {transaction.discount > 0 ? (
                        <span className="text-green-500 font-semibold">{transaction.discount}%</span>
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
      )}
    </div>
  );
}

export default History;
