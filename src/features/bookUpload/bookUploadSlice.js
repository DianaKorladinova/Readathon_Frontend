import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchBook} from "./bookUploadAPI";

const initialState = {
    searchResults: [],
    status: 'idle'
};

export const search = createAsyncThunk('upload/search', async (title) => {
    return searchBook(title)
});

export const bookUploadSlice = createSlice({
    name: 'upload', initialState, reducers: {}, extraReducers: (builder) => {
        builder.addCase(search.fulfilled, (state, action) => {
            state.status = 'idle'
            state.searchResults = action.payload
        }).addCase(search.pending, (state) => {
            state.status = 'fetching'
        });
    },
});

export default bookUploadSlice.reducer;
