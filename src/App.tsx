import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage/MainPage';
import MyPage from './pages/MyPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
}
