import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Summary from './pages/Summary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Index from './pages/Index';
import NotFound from './pages/NotFound';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
