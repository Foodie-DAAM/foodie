import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
	name: 'counter',
	initialState: {
		value: 0,
	},
	reducers: {
		increment: state => state + 1,
		decrement: state => state - 1,
		incrementByAmount: (state, action) => {
			state.value += action.payload;
		},
	}
});

export const { increment, decrement, incrementByAmount } = slice.actions;

// Thunk
export const incrementAsync = amount => dispatch => {
	setTimeout(() => {
		dispatch(incrementByAmount(amount));
	}, 1000);
};

// Selector
export const selectCount = state => state.counter.value;

export default slice.reducer;