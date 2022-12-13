import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: 'search',
    initialState: { searchTerm: null },
    reducers: {
        searchTermEntered: (state, action) => {
            state.searchTerm = action.payload;
        },
        tagClicked: (state, action) => {
            state.searchTerm = action.payload;
        }
    }
});

export const { searchTermEntered, tagClicked } = searchSlice.actions; 

export const selectSearchTerm = state => state.search.searchTerm;

export default searchSlice.reducer;