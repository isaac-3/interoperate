import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
