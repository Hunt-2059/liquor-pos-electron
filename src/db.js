import Dexie from 'dexie'

const db = new Dexie('LiquorPOSDB')
db.version(1).stores({
  products: '++id,name,price,stock,barcode',
  sales: '++id,datetime,total,items',
  customers: '++id,name,phone,points'
})

// seed sample products if empty
async function seed(){
  const c = await db.products.count()
  if(c===0){
    await db.products.bulkAdd([
      {name:'Whiskey - Aged 12y', price:29.99, stock:20, barcode:'1000001'},
      {name:'Vodka Classic 750ml', price:15.49, stock:30, barcode:'1000002'},
      {name:'Rum Dark 1L', price:18.00, stock:25, barcode:'1000003'},
      {name:'Red Wine 750ml', price:12.50, stock:40, barcode:'1000004'},
      {name:'Imported Beer Pack', price:9.99, stock:50, barcode:'1000005'}
    ])
  }
}
seed()

export default db
