import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { baseUrl } from '../baseUrl';
import { toast } from 'react-hot-toast';
import TodoItem from '../components/TodoItem';
import { AppContext } from '../context/AppContextProvider';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
  const { isAuthenticated } = useContext(AppContext)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false)

  const updateHandler = async (id) => {
    setLoading(true)
    try {
      const response = await axios.put(`${baseUrl}/task/${id}`, {}, {
        withCredentials: true
      });

      toast.success(response.data.message)
      setLoading(false)
      setRefresh((prev) => !prev)
    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }

  const deleteHandler = async (id) => {
    setLoading(true)
    try {
      const response = await axios.delete(`${baseUrl}/task/${id}`, {
        withCredentials: true
      });

      toast.success(response.data.message)
      setLoading(false)
      setRefresh((prev) => !prev)
    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
    }
  };

  const submitHandler = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/task/new-task`, {
        title, description
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      setTitle("")
      setDescription("")
      toast.success("Successfully taks aded!")
      setLoading(false)
      setRefresh((prev) => !prev)
    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
    }
  };



  useEffect(() => {

    const getData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/task/mytasks`, { withCredentials: true });
        setTask(response.data.tasks)
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    getData()
  }, [refresh])



  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className='grid justify-center items-center mt-14'>
      <div className='shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] py-5 px-14 rounded-md m-auto bg-[#e6faf9] w-[600px]'>
        <form onSubmit={submitHandler} className='flex flex-col'>
          <input
            type="text"
            placeholder='Enter your title'
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className=" bg-blue-950 text-white rounded-md py-1 px-2"
          />
          <br />
          <input
            type="text"
            placeholder='Enter your description'
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className=" bg-blue-950 text-white rounded-md py-1 px-2"
          />
          <br />
          <button
            className='bg-blue-950 py-1 px-10 rounded-full mt-2 text-slate-100 font-semibold w-[200px] m-auto'
            type='submit' disabled={loading}>
            Add Task
          </button>
        </form>
      </div>
      {/* Task section */}
      <div className='w-[600px] rounded-md m-auto mt-7'>
        {
          task.map((item, id) => (
            <TodoItem {...item} key={id}
              updateHandler={updateHandler}
              deleteHandler={deleteHandler}
            />
          ))
        }
      </div>
    </div>
  )
}

export default HomePage
