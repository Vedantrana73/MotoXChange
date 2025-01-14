import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    tasks: []
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) =>{
            state.tasks.push({id: nanoid(), ...action.payload})
        },

        updateTask: (state, action) =>{
            const {id, status} = action.payload;
            const task = state.tasks.find((task)=> task.id === id);
            if(task)
            {
                task.status = status;
            }
        },

        removeTask: (state, action) =>{
            const {id} = action.payload;
            state.tasks = state.tasks.filter((task)=>task.id !== id);
        }
    }
})

export const {addTask, updateTask, removeTask} = taskSlice.actions;

export default taskSlice.reducer