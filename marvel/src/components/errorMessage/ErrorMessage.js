import React from 'react'
import img from './error.gif'

export default function ErrorMessage() {
    return (
        // Есть вариант обращения к статичному файлу в public {process.env.PUBLIC_URL + '/error.gif'}
        <img style={{ display: 'block', width: "250px", height: "250px", objectFit: 'contain', margin: "0 auto"}}  src={img} alt="Error"/>
    )
}
