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
    try {
      const response = await axios.delete(`${baseUrl}/task/${id}`, {
        withCredentials: true
      });

      toast.success(response.data.message)
      setRefresh((prev) => !prev)
    } catch (error) {
      toast.error(error.response.data.message)

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
    <div className='grid justify-center items-center'>
      <div>
        <form onSubmit={submitHandler} className='flex flex-col gap-y-0'>
          <input
            type="text"
            placeholder='Enter your title'
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className=" bg-blue-950 text-white mb-2"
          />
          <br />
          <input
            type="text"
            placeholder='Enter your description'
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className=" bg-blue-950 text-white mb-2"
          />
          <br />
          <button type='submit' disabled={loading}>Add Task</button>
        </form>
      </div>
      {/* Task section */}
      <div>
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
