import React from 'react'
import { ImBin } from "react-icons/im";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { removeTask, updateTask } from '../../features/tasks/taskSlice';

function TaskItem({ id, title, status}) {
  const dispatch = useDispatch();
  const handleRemove = () => {
    dispatch(removeTask({ id }));
  }
  
  return (
    <div className='min-h-28 bg-base-200 rounded-lg my-2 p-4 flex justify-between text-base-content font-semibold'>
      <div className='h-full w-4/5 break-words text-xl'>{title}</div> {/* Corrected to use title */}
      <div className='w-1/5'>
        <div className='flex flex-col items-center gap-3'>
          <button className='btn btn-error text-error-content btn-outline' onClick={handleRemove}><ImBin /></button>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-outline m-1"><BsThreeDotsVertical/></div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 text-base-content rounded-box z-[1] w-52 p-2 shadow">
              <li
              className='cursor-pointer p-2'
              onClick={()=>{
                status==='Pending'?dispatch(updateTask({id,status: 'Active'})):dispatch(updateTask({id,status: 'Pending'}))
              }}
              >Mark as {status === 'Pending'?'Active':'Pending'}</li>
              <li
              className='cursor-pointer p-2'
              onClick={()=>{
                status==='Completed'?dispatch(updateTask({id, status: 'Active'})):dispatch(updateTask({id, status: 'Completed'}))
              }}
              >Mark as {status === 'Completed'?'Active':'Completed'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskItem
