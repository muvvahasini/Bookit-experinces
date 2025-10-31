import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import Checkout from './pages/Checkout';
import BookingResult from './pages/BookingResult';
import React from 'react';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="/checkout/:slotId" element={<Checkout />} />
      <Route path="/confirmation" element={<BookingResult />} />
    </Routes>
  );
}


