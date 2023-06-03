import React from 'react'
import {BsGithub} from 'react-icons/bs'

const Footer = () => {
  return (
    <>
      <div className='text-white bg-stone-800 border-t-[1px] border-t-stone-600 py-4 flex justify-center text-xl'>Made By <a href='https://www.github.com/bekatam' target='_blank' className='flex items-center ml-3 underline underline-offset-2'><BsGithub/>bekatam</a></div>
    </>
  )
}

export default Footer