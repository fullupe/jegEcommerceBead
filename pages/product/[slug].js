import React, { useState } from 'react'
import {client, urlFor} from "../../lib/client";
import {AiOutlineMinus, AiOutlinePlus,AiFillStar,AiOutlineStar} from "react-icons/ai"

import {useStateContext} from  "../../context/StateContext"
import Product from "../../components/Product"
function ProductDetails({product, products}) {

    const {image, name, details, price} = product;

    const [index, setIndex] = useState(0)

    const {decQty, incQty, qty, onAdd, setShowCart}= useStateContext()

    const handleBuyNow =()=>{
        onAdd(product,qty);
        setShowCart(true);

    }

  return (
    <div>
      <div className="flex flex-wrap gap-10 m-10 mt-16 items-center text-[#324d67]">
          <div>
              <div className="  rounded-2xl bg-[#ebebeb] hover:bg-[#f02d34] w-2/3  cursor-pointer transition ease-in-out hover:scale-110 hover:-translate-y-1 duration-300">
                <img className="rounded-2xl bg-[#ebebeb] w-wn  transition ease-in-out duration-300 hover:bg-[#f02d34]" src={urlFor(image && image[index])}/>
              </div>
              <div className=" flex gap-3 mt-5">
                {
                    image?.map((item, i)=>(
                        <img  key={i} className="rounded-lg bg-[#ebebeb] w-20 h-20 cursor-pointer hover:bg-[#f02d34]" 
                        src={urlFor(item)} 
                        onMouseEnter={()=>setIndex(i)}/>
                    ))
                }

              </div>

          </div>

          <div className=" flex flex-col gap-1 m-10 mt-0 text-[#324d67]">
              <h1 className="text-2xl font-bold">{name}</h1>
              <div className="flex gap-1 items-center text-[#f02d34] mt-3">
                  <div className="flex">
                      <AiFillStar/>
                      <AiFillStar/>
                      <AiFillStar/>
                      <AiFillStar/>
                      <AiOutlineStar/>
                  </div>
                  <p className="text-[#324d67]">(20)</p>
                  
             </div>
             <h4 className="text-[#324d67] font-bold">Details:</h4>
             <p>{details}</p>
             <p className="text-gray-500  ">Ghc{price}</p>
             <div className="flex flex-col gap-2 mt-3 ">
                 <h3 className="font-bold">Quantity:</h3>
                 <p className="border-2 border-gray-500 p-2 w-44 flex items-center ">
                     <span onClick={decQty} className="text-lg   py-2 px-4 cursor-pointer border-r-0  border-gray-000 text-[#f02d34]">
                         <AiOutlineMinus/>
                     </span>
                     <span  className="text-2xl   py-2 px-4 cursor-pointer border-r-2 border-l-2  border-gray-500 ">
                         {qty}
                     </span>
                     <span onClick={incQty} className="text-lg   py-2 px-4 cursor-pointer border-r-0  border-gray-000 text-[rgb(49, 168, 49)]">
                         <AiOutlinePlus/>
                     </span>
 
                 </p>
             </div>

            <div className="flex flex-col md:flex-row md:space-x-4">

             <div className=" flex gap-8 py-3 px-6 border-2 border-[#f02d34] mt-10 text-lg font-semibold bg-white text-[#f02d34] cursor-pointer w-48  transform hover:scale-110 ease-out duration-300">
              <button type="button" className="w-40" onClick={()=>onAdd(product, qty)}>Add to Cart</button>
             
             </div>
             <div className=" flex gap-8 py-3 px-6 border-2 bg-[#f02d34] mt-10 text-lg font-semibold  text-white cursor-pointer w-48  transform hover:scale-110 ease-out duration-300">
             
              <button type="button" className="w-40" onClick={handleBuyNow}>Buy Now</button>
             </div>

            </div>
             

          </div>
      </div>

      <div className="mt-32">
       <h2 className="text-center m-14 text-[#324d67] text-3xl">May also Like</h2>
              <div className="relative h-96 w-full overflow-x-hidden">
              <div className="flex justify-center gap-4 mt-6 animate-marquee whitespace-nowrap hover:animate-none">
                  {products.map((item)=>(
                      <Product key={product._id} product={item}/>
                  ))}
              </div>
              </div>
      </div>

    </div>
  )
}
export const getStaticPaths= async ()=>{
    const query = `*[_type == "product"]{
        slug{
            current
        }
    }`
    const products = await client.fetch(query)
    const paths=products.map((product)=>({
        params:{
            slug:product.slug.current
        }
    }));

    return{
        paths,
        fallback: 'blocking'
    }

}

export const getStaticProps  = async({params:{slug}})=>{
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;

    const productQuery = '*[_type == "product"]'

    const product = await client.fetch(query)
    const products = await client.fetch(productQuery)


    return {
      props:{
        products, product
      }
    }
}
export default ProductDetails;
