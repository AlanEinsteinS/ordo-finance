import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
      <div className="min-h-screen">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">
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
    </BrowserRouter>
  );
}

export default App;
