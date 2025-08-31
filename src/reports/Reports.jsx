import React, { useEffect, useState } from 'react'
import db from '../db'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

export default function Reports({compact=false}){
  const [data,setData]=useState([])

  useEffect(()=>{
    const load = async ()=>{
      const sales = await db.sales.toArray()
      const grouped = {}
      sales.forEach(s=>{
        const d = new Date(s.datetime).toLocaleDateString()
        grouped[d] = (grouped[d]||0) + s.total
      })
      const arr = Object.entries(grouped).map(([date,total])=> ({date,total}))
      setData(arr)
    }
    load()
  },[])

  return (
    <div>
      <h3>Sales Reports</h3>
      {data.length===0 ? <p>No sales yet</p> : (
        <div style={{width:'100%',height: compact?120:300}}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray='3 3'/>
              <XAxis dataKey='date'/>
              <YAxis/>
              <Tooltip/>
              <Line type='monotone' dataKey='total' stroke='#6d28d9' />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
