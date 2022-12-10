import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: { user: null },
    reducers: {
        signin: (state, action) => {
            state.user = action.payload;
        },
        signout: (state) => {
            state.user = null;
        }
    }
});

export const { signin, signout } = userSlice.actions; //This generates the action creator functions login() and logout()

export const selectUser = state => state.user.user;

export default userSlice.reducer;