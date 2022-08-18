import React,{useState, useEffect} from 'react';
import Link from "next/link";
import {BsBagCheckFill} from "react-icons/bs";

import {runFireworks} from "../lib/utils"

import {useStateContext}from "../context/StateContext"



function Success() {
    const {setCartItems,setTotalPrice,setTotalQuantities} = useStateContext()


    useEffect(() => {
       localStorage.clear();
       setCartItems([]);
       setTotalPrice(0);
       setTotalQuantities(0);
       runFireworks()

    }, [])

    const [order, setOrder] = useState(null)
  return (
    <div className=" bg-[white] min-h-60 flex flex-col items-center justify-center">
        <div className=" flex flex-col justify-center items-center w-full h-80 m-auto  mt-40 bg-[#dcdcdc] p-14 rounded-2xl text-green-500 text-4xl">
            <p className="text-green-500 text-4xl">
                <BsBagCheckFill/>

            </p>
            <h2 className="text-3xl">Thank You for Your Order</h2>
            <p className="text-lg font-semibold text-center">Check your email for the receipt.</p>
            <p className="text-center mt-4 text-lg">
                If you have  any Questions, Please email
                <a href="mailto:order@example.com" className="ml-1 text-[#f02d34]">order@example.com</a>
            </p>
        </div>
        <Link href="/">
            <button type="button" width="300px" className="w-full max-w-400 py-3 px-4 rounded-2xl border-none text-xl mt-4 uppercase bg-[#f02d34] text-[#fff] cursor-pointer transition transform duration-75 scale-75 ease-in-out ">
                Continue Shopping
            </button>
        </Link>

    </div>
  )
}

export default Success