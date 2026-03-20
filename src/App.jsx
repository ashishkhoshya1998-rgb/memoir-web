import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Collection from './pages/Collection'
import Product from './pages/Product'
import GiftFinder from './pages/GiftFinder'

export default function App() {
  const [page, setPage] = useState('home')

  const showPage = (name) => {
    setPage(name)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Navbar showPage={showPage} currentPage={page} />
      {page === 'home'       && <Home showPage={showPage} />}
      {page === 'shop'       && <Shop showPage={showPage} />}
      {page === 'collection' && <Collection showPage={showPage} />}
      {page === 'product'    && <Product showPage={showPage} />}
      {page === 'finder'     && <GiftFinder showPage={showPage} />}
    </>
  )
}
