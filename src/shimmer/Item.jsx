import React from 'react'

export default function Item({image, title}) {
  return (
    <div className='item'>
        <img src={image} className='img'></img>
        <p>{title}</p>
    </div>
  )
}
