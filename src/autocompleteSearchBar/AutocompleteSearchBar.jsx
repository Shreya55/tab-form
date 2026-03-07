// performance optimization -> debouncing, 
// cache the results to avoid making API calls for the same query -> 
// localStorage (if we want the result to persist after user has different sessions) or state variables

// approach -> design input box, onchange on input box call API, show results in a dropdown, 
// showResults when input box is focused, performance optimization -> debounce the API call, cache res

import { useEffect, useState } from 'react'
import './AutocompleteSearchBar.css'

export default function AutocompleteSearchBar() {

    const [data, setData] = useState([])
    const [input, setInput] = useState('')
    const [showResults, setShowResults] = useState(false)
    const [cache, setCache] = useState({})

    const getData = async() => {
        if(cache[input]) {
            console.log('CACHE', input)
            setData(cache[input])
            return
        }
        console.log('API', input)
        const data = await fetch('https://dummyjson.com/recipes/search?q=' + input);
        const res = await data?.json();
        setData(res.recipes);
        setCache((prev) => ({
            ...prev,
            [input]: res.recipes // since input is dynamic key in the object so wrap it in []
        }))
    }

    //debounce the API call
    useEffect(() => {
        const timer = setTimeout(getData, 300)
        return () => {
            clearTimeout(timer);
        }
    }, [input])

  return (
    <div className='main-div'>
        <h1>Autocomplete Search Bar</h1>
        <input type="text" className='input-box' 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setShowResults(true)}
            onBlur={() => setShowResults(false)}
        />
        {showResults && <div className="results">{data.map((i) => <span key={i.id} id='item-span'>{i.name}</span>)}</div>}
    </div>
  )
}
