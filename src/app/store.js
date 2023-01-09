import {configureStore} from '@reduxjs/toolkit';
import challengeReducer from '../features/monthlyChallenge/monthlyChallengeSlice';
import bookReducer from '../features/bookDetail/bookDetailSlice';
import modalReducer from '../features/modal/modalSlice';
import connectionReducer from "../features/connection/connectionSlice";

export const store = configureStore({
    reducer: {
        challenge: challengeReducer,
        book: bookReducer,
        modal: modalReducer,
        connection: connectionReducer
    },
});
