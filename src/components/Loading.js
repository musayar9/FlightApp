import React from 'react'

function Loading() {
  return (
    <div className="flex mt-5 items-center justify-center ">
      <div className="px-3 py-2 text-xl font-medium leading-none text-center text-blue-300 bg-blue-600 rounded-full animate-pulse">
        loading...
      </div>
    </div>
  );
}

export default Loading
