import React from 'react'
import Link from 'next/link'
import {urlFor} from '../lib/client'

function Product({product:{image,name,price,slug,}}) {
  return (
    <div  className=" ">
    <Link href={`/product/${slug.current}`}>
      <div className=" cursor-pointer  text-[#324d67] transition ease-in-out hover:scale-110 duration-300 ">
        <img width={250} height={250} className="rounded-lg bg-[#ebebeb]" src={urlFor(image && image[0])}/>
        <p className=" font-bold">{name}</p>
        <p className=" font-extrabold mt-2 text-black">Ghc {price}</p>
      </div>

    </Link>
    </div>
  )
}

export default Product
