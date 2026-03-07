// ask-> where would we get the data from - api or data dump in json file?
// what kind of data needs to be displayed in UI from the api call? 
// How many pages do we need to display? How many items per page? 

// Approach -> Show the data in UI, add array of divs for pagination, handle pagination

import React, {useState, useEffect} from 'react'
import { FETCH_URL, ITEMS_PER_PAGE } from './constants'
import ProductCard from './ProductCard'

export default function Pagination() {
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)

    const fetchData = async () => {
        const data = await fetch(FETCH_URL)
        const json = await data.json()
        console.log(json)
        setData(json.products)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE)
    const start = currentPage * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    return (
        <div className='main-page'>
            <h1>Pagination</h1>
            <div className='page-div'>
                {[... Array(totalPages).keys()].map((i) => 
                (<span className='page-span' key={i} onClick={() => setCurrentPage(i)} 
                style={{backgroundColor: currentPage === i ? 'green' : ''}}> {i} </span>))}
            </div>
            <div className='product-container'>
            {data.slice(start,end).map((i) => (
                <ProductCard key= {i.id} title={i.title} image={i.images} />
            ))}
            </div>
        </div>
    )
}

// currentPage --> start, end
// 0 -> 0,10  1-> 10,20  2 -> 20,30 

// further improvements -> move pagination to a separate component, add hook for fetching data, 
// error handling in fetching data, add next and prev buttons