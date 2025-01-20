import React from 'react'

const SearchResult = ({ result }) => {
    return (
        <div className='w-full bg-white flex flex-col shadow-lg rounded-lg mt-4 max-h-[300px] overflow-y-scroll py-3 px-3'>
            {
                result.map((item, index) => {
                    return (
                        <div key={index}>
                            <p className='flex w-full justify-between p-4 hover:bg-gray-300 cursor-pointer rounded-lg border-l-transparent hover:border-l-black border-l-4 font-bold'>
                                {item.name}
                            </p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SearchResult;