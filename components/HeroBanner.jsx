import Link from 'next/link'
import React from 'react';
import {urlFor} from '../lib/client'

function HeroBanner({heroBanner}) {
  return (
    <div className=" w-full bg-[#dcdcdc] rounded-lg py-24 px-12 h-4/5 leading-3  relative">
      <div>
        <p className="text-lg">{heroBanner?.smallText}</p>
        <h3 className="text-7xl mt-3 capitalize">{heroBanner?.midText}</h3>
        <h1 className="text-8xl text-white -ml-6 uppercase ">{heroBanner?.largeText1}</h1>

        <img src={urlFor(heroBanner.image)} alt="" className=" absolute top-[0%] right-[20%] w-96 h-96 hidden md:flex"/>

        <div>
          <Link href={`/product/${heroBanner?.product}`}>
            <button type="button" className="rounded-lg py-2 px-6 bg-[#f02d34] text-white border-none mt-12 text-lg font-semibold cursor-pointer z-40">{heroBanner.buttonText}</button>
          </Link>
          <div className=" absolute right-[10%] button-[5%] flex flex-col w-72   text-[#324d67]">
            <h5 className="mb-3 font-bold text-lg text-right ">Description</h5>
            <p className="text-right text-[#5f5f5f] font-thin ">{heroBanner?.desc}</p>
          </div>
        </div>
      </div>
     
    
    </div>
  )
}

export default HeroBanner
