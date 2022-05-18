import React from 'react'
import Link from 'next/link'
import Product from"../models/Product"
import mongoose from "mongoose";

const dailyproducts = ({products}) => {
  return (
    <div>
        <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">
      
      {Object.keys(products).map((items)=>
      <Link key={products[items]._id} href={`/product/${products[items].slug}`} ><div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-5">
        <a className="block relative h-48 rounded overflow-hidden">
          <img alt="ecommerce" className=" object-top w-full h-full block" src={products[items].img}/>
        </a>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[items].category}</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">{products[items].desc}</h2>
          <p className="mt-1">₹{products[items].price}</p>
          <div className="mt-1">
          {products[items].size.includes('S') && <span className='border border-gray-300 px-1 mx-1'>S</span>} 
          {products[items].size.includes('M') && <span className='border border-gray-300 px-1 mx-1'>M</span>} 
          {products[items].size.includes('L') && <span className='border border-gray-300 px-1 mx-1'>L</span>} 
          {products[items].size.includes('XL') && <span className='border border-gray-300 px-1 mx-1'>XL</span>} 
          {products[items].size.includes('XXL') && <span className='border border-gray-300 px-1 mx-1'>XXL</span>} 
          </div>
          <div className="mt-1">
          {products[items].color.includes('red') && <button class="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>} 
          {products[items].color.includes('blue') && <button class="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>} 
          {products[items].color.includes('green') && <button class="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>} 
          {products[items].color.includes('white') && <button class="border-2 border-gray-300 ml-1 bg-white-700 rounded-full w-6 h-6 focus:outline-none"></button>} 
          {products[items].color.includes('black') && <button class="border-2 border-gray-300 ml-1 bg-black-700 rounded-full w-6 h-6 focus:outline-none"></button>} 
            </div>
        </div>
      </div></Link>)}
    
    </div>
  </div>
</section>
    </div>
  )
}
export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
}
  let products = await Product.find({category:'tshirts'})
  let tshirts ={}
  for(let item of products){
      if(item.title in tshirts){
      if(!tshirts[item.title].color.includes(item.color) && item.availableQty > 0){
          tshirts[item.title].color.push(item.color)
      }
      if(!tshirts[item.title].color.includes(item.color) && item.availableQty > 0){
          tshirts[item.title].color.push(item.color)
      }
  }else
  {
          tshirts[item.title] = JSON.parse(JSON.stringify(item))
          if(item.availableQty>0){
              tshirts[item.title].color=[item.color]
              tshirts[item.title].size=[item.size]
          }
      }
}
  return {
    props: {products: JSON.parse(JSON.stringify(tshirts))},
  }
}

export default dailyproducts