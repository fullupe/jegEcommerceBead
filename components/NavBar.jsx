import React from 'react'
import Link from 'next/link';
import {AiOutlineShopping} from 'react-icons/ai';
import Cart from "./Cart";
import {useStateContext} from "../context/StateContext";

function NavBar() {

  const {showCart,setShowCart,totalQuantities} = useStateContext()
  return (
    <div className="flex justify-between my-2 mx-4 relative">

      <p className=" text-gray-500 text-lg">
        <Link href="/">
        JEG-Wrist-Bead
        </Link>
      </p>
      <button onClick={()=>setShowCart(true)} className="text-2xl flex text-gray-500 cursor-pointer relative border-none bg-transparent">
         <AiOutlineShopping/>
         <span className=" absolute -right-3 text-sm text-[#eee] bg-[#f02d34] w-5 h-5 rounded-full text-center font-semibold ">{totalQuantities}</span>
         </button>

        { showCart && <Cart/>}
      
    </div>
  )
}

export default NavBar
