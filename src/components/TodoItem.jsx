import React from 'react'

const TodoItem = ({ title, description, isCompleted, updateHandler, deleteHandler, _id }) => {
    return (
        <div>
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <div>
                <input type="checkbox"
                    checked={isCompleted}
                    onChange={() => updateHandler(_id)}
                    className='w-10 h-10'
                />
                <button type='submit'
                    onClick={() => deleteHandler(_id)}
                    className='font-blod text-lg' >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default TodoItem
