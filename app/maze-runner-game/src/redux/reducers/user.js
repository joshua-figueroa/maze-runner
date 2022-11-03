import { createSlice } from "@reduxjs/toolkit";
import { USERID, USERNAME } from "constants/user";
import { v4 as uuidV4Generator } from "uuid";

const initialState = {
	userName: localStorage.getItem(USERNAME),
	userId: localStorage.getItem(USERID),
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserName: (state, action) => {
			state.userName = action.payload;
			localStorage.setItem(USERNAME, action.payload);
			console.log("hello");
		},
		setUserId: (state) => {
			const id = uuidV4Generator();
			state.userId = id;
			localStorage.setItem(USERID, id);
		},
	},
});

export const { setUserName, setUserId } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
