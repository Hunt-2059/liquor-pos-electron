import React, { useEffect, useState } from 'react'
import db from '../db'
import InventoryManager from '../tools/InventoryManager.jsx'
import CRM from '../tools/CRM.jsx'
import Reports from '../reports/Reports.jsx'

export default function Admin(){
  return (
    <div className='grid' style={{gridTemplateColumns:'1fr',gap:12}}>
      <div className='card'><InventoryManager /></div>
      <div className='card'><CRM /></div>
      <div className='card'><Reports /></div>
    </div>
  )
}
