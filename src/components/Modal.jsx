import { X } from 'phosphor-react';
import { useEffect } from 'react';

function Modal({ isOpen, onClose, title, children, actions }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl max-w-md w-full animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <h2 className="text-xl font-semibold text-zinc-50">{title}</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <X size={24} weight="bold" />
          </button>
        </div>
        <div className="p-6 text-zinc-300">
          {children}
        </div>
        {actions && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-zinc-800">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
