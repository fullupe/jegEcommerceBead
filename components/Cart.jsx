import React,{useRef} from 'react';
import Link from 'next/link'; 
import {AiOutlineShopping,AiOutlineMinus,AiOutlinePlus,AiOutlineLeft} from "react-icons/ai"
import {TiDeleteOutline} from "react-icons/ti";

import {useStateContext} from "../context/StateContext";
import {urlFor} from "../lib/client";

import getStripe from "../lib/getStripe"
import toast from 'react-hot-toast';

function Cart() {

  const cartRef = useRef();
  const {totalPrice,totalQuantities,cartItems,setShowCart,toggleCartItemQuantity,onRemove } = useStateContext()
  //console.log(cartItems)


  const handleCheckout = async()=>{
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method:'POST',
      headers:{
        'content-Type':'application/json',
      },
      body:JSON.stringify(cartItems)
    });

    if(response.statusCode === 500)return;

    const data = await response.json();

    toast.loading('Redirecting...');
    stripe.redirectToCheckout({sessionId:data.id});
    
  }

  return (
    <div  ref={cartRef} className="w-screen  bg-opacity-50 fixed right-0 top-0 z-50 transition-all ease-in-out">
      <div className=" h-screen w-[450px] md:w-[600px] bg-white float-right py-10 px-3 relative">
        <button type="button" onClick={()=>setShowCart(false)} className="flex items-center text-lg font-normal cursor-pointer gap-1 ml-6 border-none bg-transparent">
          <AiOutlineLeft/>
          <span className="ml-3">Your cart</span>
          <span className="ml-3 text-[#f02d34]">{totalQuantities} items</span>
        </button>

        {cartItems.length < 1 && (
          <div className="m-10 text-center items-center flex flex-col">
            <AiOutlineShopping size={150}/>
            <h3 className="font-semibold text-xl">Your shopping Cart is Empty</h3>
            <Link href="/">
              <button className=" w-full max-w-400 py-2 px-3 rounded-2xl border-none text-lg mt-3 uppercase bg-[#f02d34] text-white cursor-pointer transition transform duration-75 ease-in scale-75 hover:scale-75" type="button" onClick={()=>setShowCart(false)}>
              Countinue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="mt-4 overflow-auto max-h-70   py-6 px-2  bg-red-000 border-2 shadow-lg ">
          
            {cartItems.map((item, index)=>(
              <div key={item._id} className="w-44 h-44  rounded-2xl bg-[#ebebebe] my-2 flex  gap-4 p-5">
              
              <img  className="rounded-2xl mx-0 md:mx-4 items-center   bg-[#ebebeb] " src={urlFor(item?.image[0])}/>

              <div className=" flex flex-col justify-between w-80 text-[#324d67] mt-0 ">
                <div className=" flex justify-between w-30 md:w-60 text-[#324d67]  gap-2 mx-2 ">

                  <h5 className="text-sx">{item.name}</h5>
                  <h4 className="text-sx">Ghc{item.price}</h4>

                </div>
                <div className=" mt-8 w-48 flex justify-between space-x-2 md:space-x-20">
                  <div>
                  <p className="border-2 border-gray-500 p-2 w-34 flex items-center ">
                     <span onClick={()=>toggleCartItemQuantity(item._id, "dec")} className="text-lg  py-2 px-2 cursor-pointer border-r-0  border-gray-000 text-[#f02d34]">
                         <AiOutlineMinus/>
                     </span>
                     <span  className="text-2xl   py-2 px-4 cursor-pointer border-r-2 border-l-2  border-gray-500 ">
                         {item.quantity}
                     </span>
                     <span onClick={()=>toggleCartItemQuantity(item._id, "inc")} className="text-lg   py-2 px-4 cursor-pointer border-r-0  border-gray-000 text-[rgb(49, 168, 49)]">
                         <AiOutlinePlus/>
                     </span>
 
                 </p>
                  </div>
                  <div className="items-center flex ">
                  <button type="button" onClick={()=>onRemove(item)} className="text-2xl text-[#f02d34] cursor-pointer bg-transparent border-none] text-center">
                  <TiDeleteOutline/>
                  </button>
                  </div>
                </div>

              </div>
              
              </div>
              
            ))}
        </div>
        {cartItems.length >=1 && (
          <div className=" absolute bottom-3 right-0 w-full py-8 px-20 items-center justify-center flex flex-col ">
            <div className=" flex  justify-between  w-full border-b-2">
              <h3 className="text-xl">SubTotal:</h3>
              <h3 className="text-xl">Ghc {totalPrice}</h3>
            </div>
            <div  className="w-full flex m-auto justify-center items-center ">
              <button type="button" onClick={handleCheckout} className="w-full max-w-400 py-3 px-4 rounded-2xl border-none text-xl mt-4 uppercase bg-[#f02d34] text-[#fff] cursor-pointer transition transform duration-75 scale-75 ease-in-out  ">
              Pay with Stripe
              </button>

            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
