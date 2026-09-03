import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from "./components/navbar/Navbar.tsx"
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <section className="container">
      <Navbar />
    </section>
  </StrictMode>,
)
