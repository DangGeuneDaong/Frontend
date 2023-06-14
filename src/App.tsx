import { Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage/MainPage';
import TakerPage from './pages/TakerPage';
import OfferPage from './pages/OfferPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/taker" element={<TakerPage />} />
      <Route path="/offer" element={<OfferPage />} />
    </Routes>
  );
}
