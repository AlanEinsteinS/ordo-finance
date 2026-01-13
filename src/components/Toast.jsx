import { X, CheckCircle, Warning, Info, XCircle } from 'phosphor-react';
import { useEffect } from 'react';

function Toast({ message, type = 'info', onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle size={20} weight="fill" className="text-emerald-500" />,
    error: <XCircle size={20} weight="fill" className="text-red-500" />,
    warning: <Warning size={20} weight="fill" className="text-yellow-500" />,
    info: <Info size={20} weight="fill" className="text-blue-500" />,
  };

  const backgrounds = {
    success: 'bg-emerald-500/10 border-emerald-500/20',
    error: 'bg-red-500/10 border-red-500/20',
    warning: 'bg-yellow-500/10 border-yellow-500/20',
    info: 'bg-blue-500/10 border-blue-500/20',
  };

  return (
    <div className={`${backgrounds[type]} border rounded-lg p-4 shadow-lg backdrop-blur-sm flex items-center gap-3 min-w-[300px] max-w-md animate-slide-in`}>
      {icons[type]}
      <p className="flex-1 text-sm text-zinc-100 font-medium">{message}</p>
      <button
        onClick={onClose}
        className="text-zinc-400 hover:text-zinc-200 transition-colors"
      >
        <X size={18} weight="bold" />
      </button>
    </div>
  );
}

export default Toast;
