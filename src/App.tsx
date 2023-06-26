import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

import MainPage from './pages/MainPage/MainPage';
import TakerPage from './pages/TakerPage';
import OfferPage from './pages/OfferPage';
import AddInfoPage from './pages/RedirectPage/AddInfoPage';
import RedirectKakaoPage from './pages/RedirectPage/Kakao';
import RedirectNaverPage from './pages/RedirectPage/Naver';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/taker" element={<TakerPage />} />
      <Route path="/offer" element={<OfferPage />} />
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/redirect-kakao" element={<RedirectKakaoPage />} />
      <Route path="/redirect-naver" element={<RedirectNaverPage />} />
      <Route path="/addInfo" element={<AddInfoPage />} />
    </Routes>
  );
}
