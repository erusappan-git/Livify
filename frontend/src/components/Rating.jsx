import React from 'react'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
const Rating = ({ rating }) => {

    return (
        <div>
            <div className='flex items-center gap-x-3 mb-2'>
                {[1, 2, 3, 4, 5].map((num) => (
                    <span key={num}>
                        {rating >= num ? <FaStar color='yellow' /> : rating >= num - 0.5 ? <FaStarHalfAlt color='yellow' /> : <FaRegStar color='yellow' />}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default Rating
