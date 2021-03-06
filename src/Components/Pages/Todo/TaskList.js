import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UpdateTask from "./UpdateTask"
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskList = ({ task, handleDelete, isReload, setIsReload }) => {


    const handleComplete = data => {
        const title = data.title;
        const textData = data.textData;

        

        fetch(" https://bloc-crown-86209.herokuapp.com/complete", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },

            body: JSON.stringify({ title, textData }),
        })
            .then((res) => res.json())
            .then((data) => {
                
                setIsReload(!isReload);
                toast.success("Todo completed.")
            });

        fetch(` https://bloc-crown-86209.herokuapp.com/task/${data._id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                
                setIsReload(!isReload);
            });

    };

    return (
        <div>
            <div className='grid grid-cols-2 border text-black p-5 bg-yellow-500 shadow rounded-lg '>
                <div className='flex w-full'>
                    <div className='mr-3'>
                        <input onClick={() => handleComplete(task)} type="radio" name="radio-1" className="radio " />
                    </div>
                    <div>
                        <p className='mr-2'><span className='font-bold'>{task?.title}-</span> {task?.textData}</p>
                    </div>

                </div>
                <div className='text-center'>
                    <div className='flex justify-center'>
                        <button onClick={() => handleDelete(task._id)}><FontAwesomeIcon className='text-right text-danger mr-3 text-xl' icon={faTrash}></FontAwesomeIcon></button>
                        <UpdateTask setIsReload={setIsReload} isReload={isReload} id={task?._id} />
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}


export default TaskList;