import React, { useState } from 'react';
import { addTask } from '../../features/tasks/taskSlice';
import { BiX } from 'react-icons/bi';
import TaskCategory from './TaskCategory';
import { useDispatch } from 'react-redux';

function TaskList() {
    const dispatch = useDispatch();
    const [isModalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddTask = () => {
        if (title.trim() === '') {
            setErrorMessage('Enter Title First');
            setTimeout(() => {
                setErrorMessage('');
            }, 4000);
            return;
        }
        dispatch(addTask({ title, status: 'Pending' }));
        setTitle('');
        setModalOpen(false);
    };

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    };

    return (
        <div>
            <div className='py-3 px-4'>
                <button className='btn btn-outline bg-error text-error-content' onClick={() => setModalOpen(true)}>
                    Add New Task
                </button>
            </div>
            <div className='min-h-96 w-screen lg:overflow-x-none flex flex-nowrap gap-4 px-4'>
                <TaskCategory status={'Pending'} />
                <TaskCategory status={'Active'} />
                <TaskCategory status={'Completed'} />
            </div>

            {isModalOpen && (
                <div className='fixed inset-0 flex items-center justify-center bg-base-300 bg-opacity-40' onKeyDown={handleEnter}>
                    <div className='w-11/12 sm:w-96 bg-base-300 p-4 rounded-lg'>
                        <div className='flex justify-end'>
                            <button className='w-fit btn-ghost rounded-full text-xl' onClick={() => setModalOpen(false)}><BiX /></button>
                        </div>
                        <h1 className='text-xl font-semibold'>Add New Task</h1>
                        <label className="form-control w-full max-w-xs py-5">
                            <div className="label">
                                <span className="label-text">Enter Task Title: </span>
                            </div>
                            <input type="text" placeholder="Here" className="input input-bordered w-full max-w-xs"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                autoFocus
                            />
                        </label>
                        <button className='text-base btn btn-outline bg-success text-success-content' onClick={handleAddTask}>
                            Add Task
                        </button>
                        {errorMessage && <div className='text-error font-semibold py-2 text-lg'>{errorMessage}</div>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskList;
