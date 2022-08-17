// import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {client} from "../lib/client"
import {Product, FooterBanner, HeroBanner} from "../components"

const Home = ({products, bannerData}) => {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


   <>
   <HeroBanner heroBanner={ bannerData.length  && bannerData[0]}/> 
   {console.log(bannerData)}

   <div className="text-center my-10 text-[#324d67]">
     <h2 className="text-4xl font-extrabold">Best selling Products</h2>
     <p className="text-lg font-thin text-[#5f5f5f] ">Beads of many variation</p>
   </div>

   <div className=" flex flex-wrap justify-center items-center gap-6 mt-6 w-full">
     {products?.map((product)=>(

       <Product key={product.key} product={product}/>

     ))}

   </div>
   <FooterBanner footerBanner={ bannerData && bannerData[0]}/>
   </>
      
    </div>
  )
}

export const getServerSideProps  = async()=>{
    const query = '*[_type == "product"]'
    const products = await client.fetch(query)

    const bannerquery = '*[_type == "banner"]'
    const bannerData = await client.fetch(bannerquery)

    return {
      props:{
        products, bannerData
      }
    }
}
export default Home
