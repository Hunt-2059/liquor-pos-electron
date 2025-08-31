import React, { useState } from 'react'
import Cashier from './pages/Cashier.jsx'
import Admin from './pages/Admin.jsx'
import './styles.css'

export default function App(){
  const [role, setRole] = useState('cashier') // default to cashier landing
  return (
    <div className='app'>
      <header className='topbar'>
        <h1>LiquorPOS</h1>
        <div className='role-switch'>
          <button onClick={() => setRole('cashier')} className={role==='cashier'?'active':''}>Cashier</button>
          <button onClick={() => setRole('admin')} className={role==='admin'?'active':''}>Admin</button>
        </div>
      </header>
      <main className='main'>
        {role==='cashier' ? <Cashier /> : <Admin />}
      </main>
    </div>
  )
}
