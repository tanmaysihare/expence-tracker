import {createSlice} from '@reduxjs/toolkit';

const initialAuthState = {
    isLoggedIn : false,
    userId: null,
    token: null,
};
const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state,action){
            state.isLoggedIn = true;
            state.userId = action.payload.userId;
            state.token = action.payload.token;
        },
        logout(state){
            state.isLoggedIn = false;
            state.userId = null;
            state.token = null;
        }
    }
});

export const {login , logout } = authSlice.actions;
export default authSlice.reducer;