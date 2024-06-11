import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import messageReducer from './slices/messageSlice';
import ingredientReducer from './slices/ingredientSlice';
import stepReducer from './slices/stepSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    message: messageReducer,
    ingredient: ingredientReducer,
    step: stepReducer,
  },
});
