import React, { useEffect, useState } from 'react'
import db from '../db'
import Reports from '../reports/Reports.jsx'

export default function Cashier(){
  const [products,setProducts]=useState([])
  const [cart,setCart]=useState([])
  const [search,setSearch]=useState('')

  useEffect(()=>{ db.products.toArray().then(setProducts) },[])

  const addToCart = (p)=>{
    setCart(prev=>[...prev, {...p, qty:1}])
  }

  const removeFromCart = (i)=> setCart(prev => prev.filter((_,idx)=>idx!==i))

  const changeQty = (i,qty)=>{
    setCart(prev=> prev.map((it,idx)=> idx===i? {...it, qty: qty}: it))
  }

  const checkout = async ()=>{
    if(cart.length===0){ alert('Cart empty'); return }
    const total = cart.reduce((s,i)=> s + i.price * i.qty,0)
    const items = cart.map(c=> ({id:c.id,name:c.name,price:c.price,qty:c.qty}))
    await db.sales.add({ datetime: new Date().toISOString(), total, items })
    // decrement stock
    await Promise.all(cart.map(c=> db.products.update(c.id, { stock: (c.stock - c.qty) })).filter(Boolean))
    alert('Sale recorded. Total: $'+total.toFixed(2))
    setCart([])
    const updated = await db.products.toArray(); setProducts(updated)
  }

  const filtered = products.filter(p=> p.name.toLowerCase().includes(search.toLowerCase()) || p.barcode.includes(search))

  return (
    <div className='grid' style={{gridTemplateColumns:'2fr 1fr',gap:16}}>
      <div className='card'>
        <div className='controls'>
          <input placeholder='Search name or barcode' value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        <div className='products'>
          {filtered.map(p=> (
            <div key={p.id} className='product' onClick={()=>addToCart(p)}>
              <strong>{p.name}</strong>
              <div>${p.price.toFixed(2)}</div>
              <div>Stock: {p.stock}</div>
            </div>
          ))}
        </div>
      </div>

      <div className='card'>
        <h3>Cart</h3>
        <div className='cart'>
          <table className='table'>
            <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th></th></tr></thead>
            <tbody>
              {cart.map((c,i)=> (
                <tr key={i}>
                  <td>{c.name}</td>
                  <td><input type='number' value={c.qty} min='1' onChange={(e)=>changeQty(i,Number(e.target.value))} style={{width:60}}/></td>
                  <td>${(c.price * c.qty).toFixed(2)}</td>
                  <td><button onClick={()=>removeFromCart(i)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{marginTop:12}}>
          <strong>Total: ${cart.reduce((s,i)=> s + i.price * i.qty,0).toFixed(2)}</strong>
        </div>
        <div style={{marginTop:8}}>
          <button onClick={checkout}>Process Payment</button>
        </div>
        <div style={{marginTop:12}}>
          <Reports compact />
        </div>
      </div>
    </div>
  )
}
