import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../features/auth/authSlice'
import ticketReducer from '../features/tickets/ticketSlice'
import noteReducer from '../features/notes/noteSlice'

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    ticket: ticketReducer,
    notes: noteReducer
  },
});
