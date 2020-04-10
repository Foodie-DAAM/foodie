import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
	name: 'ingredients',
	initialState: {
		list: [],
		nextId: 0,
	},
	reducers: {
		addIngredient: (state = [], action) => {
			let name = action.payload;

			for (let ingredient of state.list) {
				if (ingredient.name === name) {
					console.log('Ingredient already exists:', name);
					return;
				}
			}

			let ingredient = {
				id: state.nextId++,
				name: name,
			};

			state.list.push(ingredient);

			console.log('Added ingredient:', ingredient);
		},
		removeIngredient: (state, action) => {
			let id = action.payload;
			console.log('Removing ingredient:', id);

			state.list = state.list.filter(ingredient => ingredient.id !== id);
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
export const getIngredients = state => state.list;

export default slice.reducer;