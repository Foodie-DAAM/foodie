import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
	name: 'ingredient',
	initialState: [],
	reducers: {
		addIngredient: (state = [], action) => {
			let ingredient = action.payload;
			state.push(ingredient);
		},
		removeIngredient: (state, action) => {
			let ingredient = action.payload;
			// state.remove(action.payload);
		},
	}
});

export const { addIngredient, removeIngredient } = slice.actions;

// Thunk
// export const incrementAsync = amount => dispatch => {
// 	setTimeout(() => {
// 		dispatch(incrementByAmount(amount));
// 	}, 1000);
// };

// Selector
export const getIngredients = state => state;

export default slice.reducer;