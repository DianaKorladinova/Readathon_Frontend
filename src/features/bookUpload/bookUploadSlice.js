import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchBook, uploadBook} from "./bookUploadAPI";

const initialState = {
    searchResults: [],
    status: 'idle',
    ok: false
};

export const search = createAsyncThunk('upload/search', async (title) => {
    return searchBook(title)
});

export const upload = createAsyncThunk('upload/upload', async (book) => {
    return uploadBook(book)
});

export const bookUploadSlice = createSlice({
    name: 'upload', initialState, reducers: {}, extraReducers: (builder) => {
        builder.addCase(search.fulfilled, (state, action) => {
            state.status = 'idle'
            state.searchResults = action.payload
        }).addCase(search.pending, (state) => {
            state.status = 'fetching'
        }).addCase(upload.fulfilled, (state, action) => {
            state.ok = action.payload.successful
        });
    },
});

export default bookUploadSlice.reducer;
