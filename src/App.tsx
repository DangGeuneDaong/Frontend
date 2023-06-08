import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage/MainPage';
import JoinPage from './pages/JoinPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />

      <Route path="/register" element={<JoinPage />} />
    </Routes>
  );
}
