import React from 'react'

function Error({message}) {
  return (
    <div className='flex items-center justify-center'>
    <p className='text-center text-md font-bold '>{message}</p>     
    </div>
  )
}

export default Error
