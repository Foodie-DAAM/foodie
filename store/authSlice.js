import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
	name: 'auth',
	initialState: {
		isLoggedIn: false,
		user: {
			name: null,
			email: null,
			profilePicture: null,
		},
	},
	reducers: {
		logIn:  state => state.isLoggedIn = true,
		logOut: state => state.isLoggedIn = false,
		updateUser: (state, action) => {
			state.user.name    = action.payload.name    || state.user.name;
			state.user.email   = action.payload.email   || state.user.email;
			state.user.profile = action.payload.profile || state.user.profile;
		},
	}
});

export const { increment, decrement, incrementByAmount } = slice.actions;

// Thunk
// export const incrementAsync = amount => dispatch => {
// 	setTimeout(() => {
// 		dispatch(incrementByAmount(amount));
// 	}, 1000);
// };

// Selector
export const isLoggedIn = state => state.isLoggedIn;
export const getUser = state => state.user;

export default slice.reducer;