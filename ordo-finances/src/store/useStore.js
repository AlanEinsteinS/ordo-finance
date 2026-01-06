import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // Saldo do jogador
      balance: 10000,

      // Inventário
      inventory: [],

      // Carrinho
      cart: [],

      // Histórico de compras
      purchaseHistory: [],

      // Adicionar ao carrinho
      addToCart: (item, discount = 0) => {
        set((state) => ({
          cart: [...state.cart, { ...item, discount, cartId: Date.now() }],
        }));
      },

      // Remover do carrinho
      removeFromCart: (cartId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.cartId !== cartId),
        }));
      },

      // Limpar carrinho
      clearCart: () => {
        set({ cart: [] });
      },

      // Finalizar compra do carrinho
      checkout: () => {
        const cartItems = get().cart;
        const total = cartItems.reduce((sum, item) => {
          const finalPrice = item.price - (item.price * item.discount / 100);
          return sum + finalPrice;
        }, 0);

        const currentBalance = get().balance;

        if (currentBalance >= total && cartItems.length > 0) {
          const newInventory = cartItems.map((item) => ({
            ...item,
            id: Date.now() + Math.random(),
            purchaseDate: new Date().toISOString(),
            pricePaid: item.price - (item.price * item.discount / 100),
          }));

          const newHistory = cartItems.map((item) => {
            const finalPrice = item.price - (item.price * item.discount / 100);
            return {
              id: Date.now() + Math.random(),
              type: 'purchase',
              item: item.name,
              category: item.category,
              amount: finalPrice,
              originalPrice: item.price,
              discount: item.discount,
              description: `Compra: ${item.name}`,
              date: new Date().toISOString(),
            };
          });

          set((state) => ({
            balance: state.balance - total,
            inventory: [...state.inventory, ...newInventory],
            purchaseHistory: [...state.purchaseHistory, ...newHistory],
            cart: [],
          }));

          return { success: true, total };
        }
        return { success: false, total };
      },

      // Adicionar saldo
      addBalance: (amount) => {
        set((state) => ({
          balance: state.balance + amount,
          purchaseHistory: [
            ...state.purchaseHistory,
            {
              id: Date.now(),
              type: 'deposit',
              amount: amount,
              description: 'Adição de saldo',
              date: new Date().toISOString(),
            },
          ],
        }));
      },

      // Remover saldo
      removeBalance: (amount, description = 'Remoção de saldo') => {
        set((state) => ({
          balance: state.balance - amount,
          purchaseHistory: [
            ...state.purchaseHistory,
            {
              id: Date.now(),
              type: 'withdrawal',
              amount: amount,
              description: description,
              date: new Date().toISOString(),
            },
          ],
        }));
      },

      // Vender item do inventário
      sellItem: (itemId) => {
        const item = get().inventory.find((i) => i.id === itemId);
        if (item) {
          const sellPrice = item.pricePaid * 0.7;
          set((state) => ({
            balance: state.balance + sellPrice,
            inventory: state.inventory.filter((i) => i.id !== itemId),
            purchaseHistory: [
              ...state.purchaseHistory,
              {
                id: Date.now(),
                type: 'sale',
                item: item.name,
                category: item.category,
                amount: sellPrice,
                description: `Venda: ${item.name}`,
                date: new Date().toISOString(),
              },
            ],
          }));
          return true;
        }
        return false;
      },

      // Limpar histórico
      clearHistory: () => {
        set({ purchaseHistory: [] });
      },

      // Resetar tudo
      reset: () => {
        set({
          balance: 10000,
          inventory: [],
          cart: [],
          purchaseHistory: [],
        });
      },
    }),
    {
      name: 'ordo-finances-storage',
    }
  )
);

export default useStore;
