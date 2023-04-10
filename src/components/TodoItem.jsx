import React from 'react'

const TodoItem = ({ title, description, isCompleted, updateHandler, deleteHandler, _id }) => {
    return (
        <div className=' flex justify-between items-center py-2 px-3 rounded-md m-auto shadow-[0px_8px_5px_rgba(221,_221,_221,_1),_0_3px_5px_rgba(204,_204,_204,_1)] mt-3'>
            <div>
                <h3 className='py-1 px-2 font-bold  rounded-md'>{title}</h3>
                <p className='py-1 px-2'>{description}</p>
            </div>
            <div className='flex items-center gap-x-4'>
                <input type="checkbox"
                    checked={isCompleted}
                    onChange={() => updateHandler(_id)}
                    className='w-5 h-5 checked:bg-red-800 cursor-pointer'
                />
                <button type='submit'
                    onClick={() => deleteHandler(_id)}
                    className='font-blod text-lg bg-[#172554] rounded-full text-white px-4 text-[10px]' >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default TodoItem
