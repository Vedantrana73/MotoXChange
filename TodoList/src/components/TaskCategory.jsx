import React from 'react'
import TaskItem from './TaskItem'
import { useDispatch, useSelector } from 'react-redux';

function TaskCategory({ status }) {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.tasks);
    return (
        <div className={`w-screen lg:w-1/3 min-h-[50y
        rem] lg:min-h-96 flex-shrink-0 lg:flex-shrink h-fit rounded-lg p-4 ${status === 'Pending' ? 'bg-yellow-200' : status === 'Active' ? 'bg-red-200' : 'bg-green-200'} text-black`}>
            <h1 className='text-2xl font-semibold'>{status} Tasks</h1>
            <div>
                {
                    tasks.length !== 0? tasks.filter((task) => task.status === status).map((task) => (
                        <TaskItem key={task.id} id={task.id} title={task.title} status={status} />
                    )):
                    <div className='text-center py-5'>No Tasks Exist</div>
                }
            </div>
        </div>
    )
}

export default TaskCategory
