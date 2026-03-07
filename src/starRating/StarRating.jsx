import { useState } from "react";
import { FaStar } from "react-icons/fa";
import './starRating.css'

export default function StarRating(){

    const [rating, setRating] = useState(null)

    return <div>
        <h1>Star Rating</h1>

        {[...Array(5)].map((star, index) => 
            {const currentRate = index+1
                
            return(
                <>
                <label>
                <input type="radio" name="star" value={currentRate} onClick={() => setRating(currentRate)} className="input"/>
                <FaStar 
                    size={50}
                    color={currentRate <= rating ? "yellow" : "grey"}
                />
                </label>
            </>
            
            )}
        )}
    </div>
}