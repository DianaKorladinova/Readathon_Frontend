import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {fetchDetail} from './bookDetailAPI'

const initialState = {
    bookDetail: null,
    status: 'idle'
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
    reducers: {
        reset(state) {
            state.answers = []
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBookDetail.fulfilled, (state, action) => {
            state.bookDetail = action.payload
            state.status = 'idle'
        }).addCase(fetchBookDetail.pending, (state) => {
            state.status = 'fetching'
        })

    },
})

export const {reset} = bookDetailSlice.actions

export default bookDetailSlice.reducer
