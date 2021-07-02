import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './lib/rootReducer';

export default configureStore({
  reducer: rootReducer,
  devTools: true,
});
