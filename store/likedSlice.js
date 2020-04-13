import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
	name: 'liked',
	initialState: {
		list: [],
	},
	reducers: {
		addLiked: (state = [], action) => {
			let id = action.payload;

			for (let favourite of state.list) {
				if (favourite === id) {
					console.log('Liked recipe already exists:', id);
					return;
				}
			}

			state.list.push(id);

			console.log('Added liked recipe:', id);
		},
		removeLiked: (state, action) => {
			let id = action.payload;
			console.log('Removing liked recipe:', id);

			state.list = state.list.filter(thatId => thatId !== id);
		},
	}
});

export const { addLiked, removeLiked } = slice.actions;

// Thunk
// export const incrementAsync = amount => dispatch => {
// 	setTimeout(() => {
// 		dispatch(incrementByAmount(amount));
// 	}, 1000);
// };

// Selector
export const getLiked = state => state.list;

export default slice.reducer;