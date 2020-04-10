import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
	name: 'favourites',
	initialState: {
		list: [],
	},
	reducers: {
		addFavourite: (state = [], action) => {
			let id = action.payload;

			for (let favourite of state.list) {
				if (favourite === id) {
					console.log('Favourite already exists:', id);
					return;
				}
			}

			state.list.push(id);

			console.log('Added favourite:', id);
		},
		removeFavourite: (state, action) => {
			let id = action.payload;
			console.log('Removing favourite:', id);

			state.list = state.list.filter(thatId => thatId !== id);
		},
	}
});

export const { addFavourite, removeFavourite } = slice.actions;

// Thunk
// export const incrementAsync = amount => dispatch => {
// 	setTimeout(() => {
// 		dispatch(incrementByAmount(amount));
// 	}, 1000);
// };

// Selector
export const getFavourites = state => state.list;

export default slice.reducer;