import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {fetchDetail, verify} from './bookDetailAPI'

const initialState = {
    bookDetail: null,
    status: 'idle',
    eligible: false
}

export const fetchBookDetail = createAsyncThunk(
    'bookDetail/fetchBookDetail',
    async (book, _) => {
        return await fetchDetail(book)
    },
)

export const verifyWin = createAsyncThunk(
    'bookDetail/verifyWin',
    async () => {
        return verify()
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
        }).addCase(verifyWin.fulfilled, (state,action) => {
            state.eligible = action.payload.eligible
        })

    },
})

export const {reset} = bookDetailSlice.actions

export default bookDetailSlice.reducer
