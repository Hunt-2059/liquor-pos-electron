import React, { useEffect, useState } from 'react'
import db from '../db'

export default function InventoryManager(){
  const [items,setItems]=useState([])
  const [name,setName]=useState(''); const [price,setPrice]=useState(0); const [stock,setStock]=useState(0)

  useEffect(()=> db.products.toArray().then(setItems),[])

  const add = async ()=>{
    if(!name) return alert('Enter name')
    await db.products.add({name,price:Number(price),stock:Number(stock),barcode:Date.now().toString().slice(-8)})
    setName(''); setPrice(0); setStock(0)
    setItems(await db.products.toArray())
  }

  const updateStock = async (id,delta)=>{
    const it = await db.products.get(id)
    await db.products.update(id,{stock: (it.stock + delta)})
    setItems(await db.products.toArray())
  }

  return (
    <div>
      <h3>Inventory Manager</h3>
      <div style={{display:'flex',gap:8}}>
        <input placeholder='Name' value={name} onChange={e=>setName(e.target.value)}/>
        <input type='number' placeholder='Price' value={price} onChange={e=>setPrice(e.target.value)}/>
        <input type='number' placeholder='Stock' value={stock} onChange={e=>setStock(e.target.value)}/>
        <button onClick={add}>Add Product</button>
      </div>
      <table className='table' style={{marginTop:12}}>
        <thead><tr><th>Name</th><th>Stock</th><th>Price</th><th></th></tr></thead>
        <tbody>
          {items.map(it=> (
            <tr key={it.id}>
              <td>{it.name}</td>
              <td>{it.stock}</td>
              <td>${it.price.toFixed(2)}</td>
              <td>
                <button onClick={()=>updateStock(it.id,1)}>+1</button>
                <button onClick={()=>updateStock(it.id,-1)}>-1</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
