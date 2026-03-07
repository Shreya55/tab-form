//Shimmer is built alongwith infinte scroll
// whenever we reach the end of page we want to show shimmer until the products are fetched and then show products

import React, { useEffect, useState } from 'react'
import Item from './Item'
import ShowShimmer from './ShowShimmer'
import './shimmer.css'

export default function Shimmer() {
    const [products, setProducts] = useState([])
    const [showShimmer, setShowShimmer] = useState(false) // we need showShimmer state now becuae now
    // we dont want to show the shimmmer on only initial load, but everytime when we reach end of scroll so
    // to maintain it dynamically we need a separate state for that

    useEffect(() => {
        getData()
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleScroll = () => {
      // scrollY - how much i have scrolled in y axis
      // innerHeight - visible webpage height
      // scrollHeight - total height of the webpage
      if(window.scrollY + window.innerHeight >= document.body.scrollHeight){
        getData()
      }
    }

    const getData = async () => {
        setShowShimmer(true)
        const data = await fetch('https://dummyjson.com/products?limit=190')
        const json = await data.json()
        setShowShimmer(false)
        setProducts((products) => [...products, ...json.products])
        //This is essential for implementing infinite scrolling, where the user expects to see all previously loaded items along with the newly fetched ones. Using setProducts(json.products) would overwrite the state and break the infinite scroll functionality.
    }

  return (
    <div className='main-container'>
        {products.map((item, i) => <Item title={item.title} image={item.thumbnail} key={i}/>)}
        {showShimmer && Array(20).fill(null).map((_, i) => <ShowShimmer key={i} />)}
    </div>
  )
}
