import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: [],
};
export const ToDoSlice = createSlice({
	name: 'todolist',
	initialState,
	reducers: {
		setToDoListApiResponse: (state, action) => {
			state.data = action?.payload;
		},
		AddNewToDoData: (state, action) => {
			state.data.push(action?.payload);
		},
		deleteToDo: (state, action) => {
			const newData = state?.data.filter((item) => item?.id !== action?.payload?.id);
			state.data = newData;
		},
	},
});

export const { setToDoListApiResponse, AddNewToDoData, deleteToDo } = ToDoSlice.actions;
export default ToDoSlice.reducer;
