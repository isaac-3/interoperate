import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import apolloClient from '../../apolloClient';

interface User {
  id: number | null;
  username: string;
}

interface UserState {
  user: User;
}

const initialState = {
  user: {
    id: null,
    username: "",
  },
} as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logOff: (state) => {
      Cookies.remove("jwt_token");
      state.user.id = 0;
      state.user.username = "";
      // Resets apollo cache
      apolloClient.cache.reset()
    },
  },
});

export const {
  updateUser,
  logOff,
} = userSlice.actions;

export default userSlice.reducer;
