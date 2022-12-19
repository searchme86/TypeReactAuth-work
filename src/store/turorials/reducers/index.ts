import { combineReducers } from '@reduxjs/toolkit';
import repositoriesReducer from './repositoriesReducer';

const reducers = combineReducers({
  respoistories: repositoriesReducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
