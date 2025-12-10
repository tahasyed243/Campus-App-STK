import React from 'react'
import Navbar from './shared/Navbar'

const HeroSection = () => {

    return (
        <>
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold'>From Click To<span className='text-[#6A38C2]'> Career:</span> 
                <br />Get 
                <span className='text-[#6A38C2]'> Hired Faster</span></h1>
                <p>No more endless scrolling. Find and apply for verified roles in minutes.
                    The Right Job, Right Now.<span className='text-[#6A38C2] font-bold'> Your Future Starts Here.</span>
                </p>

            </div>
        </div>
        </>
    )
}

export default HeroSection