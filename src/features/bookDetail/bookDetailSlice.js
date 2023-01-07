import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchDetail } from './bookDetailAPI'

const initialState = {
    bookDetail: null,
}

export const fetchBookDetail = createAsyncThunk(
    'bookDetail/fetchBookDetail',
    async (book, _) => {
        return await fetchDetail(book)
    },
)

export const bookDetailSlice = createSlice({
    name: 'bookDetail',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        reset (state) {
            state.answers = []
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBookDetail.fulfilled, (state, action) => {
            state.bookDetail = action.payload
        })

    },
})

export const { reset } = bookDetailSlice.actions

export default bookDetailSlice.reducer
