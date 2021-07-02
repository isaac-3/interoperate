import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: object;
}

const initialState = { user: { name: "test" } } as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state) => {
      state["user"] = {
        name: "update testUser",
      };
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
