import React, { useEffect, useState } from 'react'
import db from '../db'

export default function CRM(){
  const [customers,setCustomers]=useState([]); const [name,setName]=useState(''); const [phone,setPhone]=useState('')
  useEffect(()=> db.customers.toArray().then(setCustomers),[])

  const add = async ()=>{
    if(!name) return
    await db.customers.add({name,phone,points:0})
    setCustomers(await db.customers.toArray()); setName(''); setPhone('')
  }

  return (
    <div>
      <h3>Customers</h3>
      <div style={{display:'flex',gap:8}}>
        <input placeholder='Name' value={name} onChange={e=>setName(e.target.value)}/>
        <input placeholder='Phone' value={phone} onChange={e=>setPhone(e.target.value)}/>
        <button onClick={add}>Add</button>
      </div>
      <table className='table' style={{marginTop:12}}>
        <thead><tr><th>Name</th><th>Phone</th><th>Points</th></tr></thead>
        <tbody>{customers.map(c=> <tr key={c.id}><td>{c.name}</td><td>{c.phone}</td><td>{c.points}</td></tr>)}</tbody>
      </table>
    </div>
  )
}
