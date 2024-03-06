import './App.css';
import {Route, Routes } from 'react-router-dom';
import Exchanges from './components/Exchanges'; 
import Coins from './components/Coins';
import Coinsdetails from './components/Coinsdetails'
import Header from './components/Header';

function App() {
 
  return (
    <>
    <Header/>
    <Routes>
    <Route path="/" element={<Exchanges/>} />
    <Route path="/coins" element={<Coins/>} />
    <Route path="/coins/:id" element={<Coinsdetails/>} />
   </Routes>
    
    </>
 
  );
}

export default App;
