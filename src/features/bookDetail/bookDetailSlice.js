import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchDetail} from "./bookDetailAPI";

const initialState = {
    answers:[]
};

export const fetchBookDetail = createAsyncThunk(
    'bookDetail/fetchBookDetail',
    async (book) => {
        const response = await fetchDetail(book);
        console.log(response)
        return null
        // return response.books;
    }
);

export const bookDetailSlice = createSlice({
    name: 'bookDetail',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        reset(state) {
            state.answers=[]
        },

    }
});

export const {reset} = bookDetailSlice.actions

export default bookDetailSlice.reducer;
