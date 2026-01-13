import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ToastContainer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Weapons from './pages/Weapons';
import Ammunition from './pages/Ammunition';
import GeneralItems from './pages/GeneralItems';
import ParanormalItems from './pages/ParanormalItems';
import Inventory from './pages/Inventory';
import History from './pages/History';
import Balance from './pages/Balance';
import Cart from './pages/Cart';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900">
          <Header />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-8 max-w-[1600px]">
              <Routes>
                <Route path="/" element={<Weapons />} />
                <Route path="/ammunition" element={<Ammunition />} />
                <Route path="/general-items" element={<GeneralItems />} />
                <Route path="/paranormal-items" element={<ParanormalItems />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/history" element={<History />} />
                <Route path="/balance" element={<Balance />} />
              </Routes>
            </main>
          </div>
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
