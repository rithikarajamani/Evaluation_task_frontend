import React from 'react';
import './App.css';
import Home from './components/homePage/homePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListPage from './components/listPage/listPage';
import ProductPage from './components/product-page/productPage';
function App() {
  return (
    // <div className="App">
    //   {/* <h1>Hi welcome rithi more way to go</h1> */}
    //   <Home></Home>
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listPage" element={<ListPage />} />
        <Route path="/product-page" element={<ProductPage />} />
        {/* // <Route path="/checkout" element={<Checkout />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
