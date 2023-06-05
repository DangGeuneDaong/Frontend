import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage/MainPage';

export default function App() {
  return (
    <Routes>
      <Route path="/main" element={<MainPage />}/>
    </Routes>
  );
}
