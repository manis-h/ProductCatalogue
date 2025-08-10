import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import ProductListing from './pages/ProductListing.tsx'
import ProductDetail from './pages/ProductDetail.tsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Routes>
      <Route path="/" element={<ProductListing />} />
      <Route path="/products/:id" element={<ProductDetail />} />
    </Routes>
    </>
  )
}

export default App
