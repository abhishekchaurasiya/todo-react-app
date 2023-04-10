import React from 'react';
import "./Styles/Spinner.css"

const Spinner = () => {
    return (
        <div className=' flex flex-col justify-center items-center m-auto'>
            <div className='spinner'></div>
            <h3>Loading...</h3>
        </div>
    )
}

export default Spinner
