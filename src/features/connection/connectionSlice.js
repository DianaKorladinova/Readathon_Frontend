import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {checkConnectionToServer} from "./connectionAPI";

const initialState = {
    open: false, connected: false, logged: false,
    err: {message: "Establishing connection..", init: true}
};

export const checkConnection = createAsyncThunk('connection/validity', async (con, thunkAPI) => {
    const result = await checkConnectionToServer()
    console.log(result);
    let {success} = result
    if (success) {
        return result.response
    }
    let {err, connected} = result
    return thunkAPI.rejectWithValue({err, connected})
});

export const connectionSlice = createSlice({
    name: 'modal', initialState, reducers: {}, extraReducers: (builder) => {
        builder.addCase(checkConnection.fulfilled, (state) => {
            state.logged = true
            state.connected = true
        }).addCase(checkConnection.rejected, (state, action) => {
            state.logged = false
            let {connected, err} = action.payload
            state.connected = connected
            state.err = err
        });
    },
});

export default connectionSlice.reducer;
