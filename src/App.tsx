import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage/MainPage';
import DetailPage from './pages/DetailPage/DetailPage';

export default function App() {
  return (
    <Routes>
      <Route path="/taker" element={<DetailPage />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}
