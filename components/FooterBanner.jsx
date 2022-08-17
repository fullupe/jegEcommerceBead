import React from 'react'
import Link from 'next/link'
import {urlFor} from '../lib/client'

function FooterBanner({footerBanner}) {
  return (
    <div className="py-20 px-12 bg-[#f02d34] text-lg rounded-2xl relative h-96 md:h-[80%] flex leading-3 w-full text-white mt-32 ">
     <div className=" flex flex-col md:flex-row ">
       {/* <div className="flex flex-col ">
         <h3 className=" font-extrabold text-7xl ml-6 "></h3>
         <p className="m-4">{footerBanner.discount}</p>
         <h3 className="font-extrabold text-7xl ml-6">{footerBanner.largeText1}</h3>
         <h3 className="font-extrabold text-7xl ml-6">{footerBanner.largeText2}</h3>

         <p className="m-4">{footerBanner.saleTime}</p>
       </div> */}
       <div className="flex flex-col">
       <p className="m-">{footerBanner.smallText}</p>
       <h3 className="font-extrabold text-7xl ml-6 capitalize ">{footerBanner.midText}</h3>
       <p className="m-4">{footerBanner.desc}</p>

       <Link href={`/product/${footerBanner.product}`}>
         <button type="button" className=" rounded-2xl py-2 px-4 bg-white text-red-500 border-none mt-10 text-lg font-semibold cursor-pointer">{footerBanner.buttonText}</button>

       </Link>
       </div>
       <img className="absolute -top-[8%] left-[60%] h-96 hidden md:flex" src={urlFor(footerBanner.image)}/>

     </div>
    </div>
  )
}

export default FooterBanner
