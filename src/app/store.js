import {configureStore} from '@reduxjs/toolkit';
import challengeReducer from '../features/monthlyChallenge/monthlyChallengeSlice';

export const store = configureStore({
    reducer: {
        challenge: challengeReducer,
    },
});
