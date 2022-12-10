import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: 'search',
    initialState: { searchTerm: null },
    reducers: {
        changeSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        }
    }
});

export const { changeSearchTerm } = searchSlice.actions; 

export const selectSearchTerm = state => state.search.searchTerm;

export default searchSlice.reducer;