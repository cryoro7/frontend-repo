import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { User } from 'firebase/auth';

interface UserState {
  user: User | null;
  userData: any;   isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  userData: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setUserData(state, action: PayloadAction<any>) {
      state.userData = action.payload;
    },
    clearUserData(state) {
      state.userData = null;
    },
  },
});

export const { setUser, setUserData, clearUserData } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserData = (state: RootState) => state.user.userData;
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;

export default userSlice.reducer;
