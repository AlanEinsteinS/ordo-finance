import { Wallet, Plus, Minus, ArrowCounterClockwise } from 'phosphor-react';
import { useState } from 'react';
import useStore from '../store/useStore';

function Balance() {
  const { balance, addBalance, removeBalance, reset } = useStore();
  const [amount, setAmount] = useState('');

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
      setAmount('');
      alert(`${formatCurrency(value)} adicionado com sucesso!`);
    } else {
      alert('Digite um valor válido!');
    }
  };

  const handleRemoveBalance = () => {
    const value = parseFloat(amount);
    if (value && value > 0) {
      if (value <= balance) {
        removeBalance(value);
        setAmount('');
        alert(`${formatCurrency(value)} removido com sucesso!`);
      } else {
        alert('Saldo insuficiente!');
      }
    } else {
      alert('Digite um valor válido!');
    }
  };

  const handleReset = () => {
    if (confirm('Deseja resetar todo o sistema? Isso irá apagar inventário, histórico e resetar o saldo. Esta ação não pode ser desfeita.')) {
      reset();
      alert('Sistema resetado com sucesso!');
    }
  };

  const quickAmounts = [100, 500, 1000, 5000, 10000];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-zinc-800 p-2 rounded-md">
          <Wallet size={24} weight="regular" className="text-zinc-100" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-zinc-50">Gerenciar Saldo</h1>
          <p className="text-sm text-zinc-400">Adicione ou remova fundos da conta</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Saldo Atual */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-md p-8">
          <div className="flex items-center gap-3 mb-4">
            <Wallet size={32} weight="regular" className="text-green-400" />
            <h2 className="text-lg font-semibold text-zinc-100">Saldo Atual</h2>
          </div>
          <p className="text-4xl font-bold text-green-400 mb-2">{formatCurrency(balance)}</p>
          <p className="text-sm text-zinc-400">Fundos disponíveis para compras</p>
        </div>

        {/* Valores Rápidos */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-md p-8">
          <h2 className="text-lg font-semibold text-zinc-100 mb-4">Valores Rápidos</h2>
          <div className="grid grid-cols-3 gap-2">
            {quickAmounts.map((value) => (
              <button
                key={value}
                onClick={() => setAmount(value.toString())}
                className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-md text-zinc-100 font-medium"
              >
                {formatCurrency(value)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Adicionar/Remover Saldo */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-md p-8">
        <h2 className="text-lg font-semibold text-zinc-100 mb-6">Transação</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Valor</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">R$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md pl-12 pr-4 py-4 text-zinc-100 text-xl font-semibold focus:outline-none focus:border-zinc-600"
                placeholder="0,00"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleAddBalance}
              disabled={!amount || parseFloat(amount) <= 0}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-green-600 hover:bg-green-700 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed rounded-md text-white font-medium"
            >
              <Plus size={20} weight="regular" />
              Adicionar Saldo
            </button>

            <button
              onClick={handleRemoveBalance}
              disabled={!amount || parseFloat(amount) <= 0}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed rounded-md text-white font-medium"
            >
              <Minus size={20} weight="regular" />
              Remover Saldo
            </button>
          </div>
        </div>
      </div>

      {/* Zona de Perigo */}
      <div className="bg-zinc-900 border border-red-800 rounded-md p-8">
        <div className="flex items-center gap-3 mb-4">
          <ArrowCounterClockwise size={24} weight="regular" className="text-red-400" />
          <h2 className="text-lg font-semibold text-red-400">Zona de Perigo</h2>
        </div>
        <p className="text-sm text-zinc-400 mb-4">
          Esta ação irá resetar completamente o sistema, apagando todo o inventário, histórico e resetando o saldo para R$ 10.000,00.
        </p>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-md text-red-400 font-medium"
        >
          <ArrowCounterClockwise size={20} weight="regular" />
          Resetar Sistema
        </button>
      </div>
    </div>
  );
}

export default Balance;
