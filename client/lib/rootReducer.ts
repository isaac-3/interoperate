import { combineReducers } from 'redux';
import userSlice from './slices/userSlice';
import modalSlice from './slices/modalSlice';

const rootReducer = combineReducers({
  user: userSlice,
  modal: modalSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
