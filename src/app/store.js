import {configureStore} from '@reduxjs/toolkit';
import challengeReducer from '../features/monthlyChallenge/monthlyChallengeSlice';
import bookReducer from '../features/bookDetail/bookDetailSlice';

export const store = configureStore({
    reducer: {
        challenge: challengeReducer,
        book: bookReducer,
    },
});
