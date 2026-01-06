import { Wallet, Plus, Minus, ArrowCounterClockwise, TrendUp, Coins, CreditCard } from 'phosphor-react';
import { useState } from 'react';
import useStore from '../store/useStore';
import { useToast } from '../components/ToastContainer';
import Modal from '../components/Modal';

function Balance() {
  const { balance, addBalance, removeBalance, reset } = useStore();
  const toast = useToast();
  const [amount, setAmount] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handleAddBalance = () => {
    const value = parseFloat(amount);
    if (value && value > 0) {
      addBalance(value);
      toast.success(`${formatCurrency(value)} adicionado ao saldo!`);
      setAmount('');
      setShowAddModal(false);
    } else {
      toast.error('Digite um valor válido!');
    }
  };

  const handleRemoveBalance = () => {
    const value = parseFloat(amount);
    if (value && value > 0) {
      if (value <= balance) {
        removeBalance(value);
        toast.success(`${formatCurrency(value)} removido do saldo!`);
        setAmount('');
        setShowRemoveModal(false);
      } else {
        toast.error('Saldo insuficiente!');
      }
    } else {
      toast.error('Digite um valor válido!');
    }
  };

  const handleReset = () => {
    reset();
    toast.success('Sistema resetado com sucesso!');
    setShowResetModal(false);
  };

  const quickAmounts = [100, 500, 1000, 5000, 10000];

  const currentValue = parseFloat(amount) || 0;
  const newBalanceAdd = balance + currentValue;
  const newBalanceRemove = balance - currentValue;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-3 rounded-lg shadow-lg">
          <Wallet size={28} weight="duotone" className="text-emerald-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-zinc-50">Gerenciar Saldo</h1>
          <p className="text-sm text-zinc-400">Adicione ou remova fundos da conta</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Saldo Atual - Destaque Principal */}
        <div className="lg:col-span-2 relative bg-gradient-to-br from-emerald-500/10 via-zinc-900 to-zinc-900 border border-emerald-500/20 rounded-xl p-8 overflow-hidden shadow-lg shadow-emerald-500/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <Wallet size={32} weight="duotone" className="text-emerald-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-zinc-300">Saldo Atual</h2>
                <p className="text-sm text-zinc-500">Fundos disponíveis</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-500 mb-2 tabular-nums">
                {formatCurrency(balance)}
              </p>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <TrendUp size={16} weight="bold" className="text-emerald-400" />
                <span>Disponível para compras</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card de Ações Rápidas */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
            <Coins size={20} weight="duotone" className="text-blue-400" />
            Ações Rápidas
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500/20 to-emerald-500/10 hover:from-emerald-500/30 hover:to-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400 font-semibold transition-all hover:scale-105"
            >
              <Plus size={20} weight="bold" />
              Adicionar
            </button>
            <button
              onClick={() => setShowRemoveModal(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500/20 to-red-500/10 hover:from-red-500/30 hover:to-red-500/20 border border-red-500/30 rounded-lg text-red-400 font-semibold transition-all hover:scale-105"
            >
              <Minus size={20} weight="bold" />
              Remover
            </button>
          </div>
        </div>
      </div>

      {/* Valores Rápidos */}
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard size={20} weight="duotone" className="text-blue-400" />
          <h2 className="text-lg font-bold text-zinc-100">Valores Rápidos</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {quickAmounts.map((value) => {
            const isSelected = amount === value.toString();
            return (
              <button
                key={value}
                onClick={() => setAmount(value.toString())}
                className={`group relative px-4 py-4 rounded-lg transition-all hover:scale-105 ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-500/30 to-emerald-500/20 border-2 border-emerald-500/50 shadow-lg shadow-emerald-500/20'
                    : 'bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-600'
                }`}
              >
                <div className="text-center">
                  <p className={`text-lg font-bold transition-colors ${
                    isSelected ? 'text-emerald-400' : 'text-zinc-100 group-hover:text-emerald-400'
                  }`}>
                    {formatCurrency(value)}
                  </p>
                  <p className={`text-xs mt-1 ${
                    isSelected ? 'text-emerald-400 font-semibold' : 'text-zinc-500'
                  }`}>
                    {isSelected ? 'Selecionado ✓' : 'Selecionar'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Zona de Perigo */}
      <div className="relative bg-gradient-to-br from-red-500/5 via-zinc-900 to-zinc-900 border border-red-500/30 rounded-xl p-8 overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <ArrowCounterClockwise size={24} weight="duotone" className="text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-red-400">Zona de Perigo</h2>
          </div>
          <div className="mb-6">
            <p className="text-sm text-zinc-400 mb-2">
              Esta ação irá resetar completamente o sistema:
            </p>
            <ul className="list-disc list-inside text-sm text-zinc-500 space-y-1 ml-2">
              <li>Apagar todo o inventário</li>
              <li>Limpar o histórico de transações</li>
              <li>Limpar o carrinho</li>
              <li>Resetar o saldo para R$ 10.000,00</li>
            </ul>
          </div>
          <button
            onClick={() => setShowResetModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 rounded-lg text-red-400 font-semibold transition-all hover:scale-105"
          >
            <ArrowCounterClockwise size={20} weight="bold" />
            Resetar Sistema
          </button>
        </div>
      </div>

      {/* Modal Adicionar Saldo */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setAmount('');
        }}
        title="Adicionar Saldo"
        actions={
          <>
            <button
              onClick={() => {
                setShowAddModal(false);
                setAmount('');
              }}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-300 font-medium transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={handleAddBalance}
              disabled={!amount || parseFloat(amount) <= 0}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-700 disabled:text-zinc-500 rounded-lg text-white font-semibold transition-all"
            >
              Confirmar Depósito
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-zinc-400 mb-2">Valor do Depósito</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-lg font-bold">R$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-12 pr-4 py-4 text-zinc-100 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                placeholder="0,00"
                step="0.01"
                min="0"
                autoFocus
              />
            </div>
          </div>

          {currentValue > 0 && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Saldo atual:</span>
                <span className="text-zinc-200 font-semibold">{formatCurrency(balance)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Valor a adicionar:</span>
                <span className="text-emerald-400 font-semibold">+{formatCurrency(currentValue)}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-emerald-500/20 pt-2">
                <span className="text-zinc-400">Novo saldo:</span>
                <span className="text-emerald-400 font-bold text-base">{formatCurrency(newBalanceAdd)}</span>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Modal Remover Saldo */}
      <Modal
        isOpen={showRemoveModal}
        onClose={() => {
          setShowRemoveModal(false);
          setAmount('');
        }}
        title="Remover Saldo"
        actions={
          <>
            <button
              onClick={() => {
                setShowRemoveModal(false);
                setAmount('');
              }}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-300 font-medium transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={handleRemoveBalance}
              disabled={!amount || parseFloat(amount) <= 0 || currentValue > balance}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-zinc-700 disabled:text-zinc-500 rounded-lg text-white font-semibold transition-all"
            >
              Confirmar Retirada
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-zinc-400 mb-2">Valor da Retirada</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-lg font-bold">R$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-12 pr-4 py-4 text-zinc-100 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50"
                placeholder="0,00"
                step="0.01"
                min="0"
                max={balance}
                autoFocus
              />
            </div>
          </div>

          {currentValue > 0 && (
            <div className={`border rounded-lg p-4 space-y-2 ${
              currentValue > balance
                ? 'bg-red-500/10 border-red-500/30'
                : 'bg-zinc-800/50 border-zinc-700'
            }`}>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Saldo atual:</span>
                <span className="text-zinc-200 font-semibold">{formatCurrency(balance)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Valor a remover:</span>
                <span className="text-red-400 font-semibold">-{formatCurrency(currentValue)}</span>
              </div>
              {currentValue > balance ? (
                <div className="text-sm text-red-400 font-semibold pt-2 border-t border-red-500/20">
                  ⚠️ Saldo insuficiente!
                </div>
              ) : (
                <div className="flex justify-between text-sm border-t border-zinc-700 pt-2">
                  <span className="text-zinc-400">Novo saldo:</span>
                  <span className={`font-bold text-base ${newBalanceRemove < 0 ? 'text-red-400' : 'text-zinc-200'}`}>
                    {formatCurrency(newBalanceRemove)}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>

      {/* Modal Reset */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Resetar Sistema"
        actions={
          <>
            <button
              onClick={() => setShowResetModal(false)}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-300 font-medium transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold transition-all"
            >
              Resetar Tudo
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-zinc-300">Tem certeza que deseja resetar todo o sistema?</p>

          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <p className="text-sm text-red-400 font-semibold mb-3">⚠️ Esta ação irá:</p>
            <ul className="text-sm text-zinc-400 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Apagar todo o inventário e itens comprados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Limpar todo o histórico de transações</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Esvaziar o carrinho de compras</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Resetar o saldo para R$ 10.000,00</span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <p className="text-sm text-yellow-400 font-medium">
              ⚠️ Esta ação não pode ser desfeita. Todos os dados serão perdidos permanentemente.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Balance;
