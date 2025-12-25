/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { messageService } from "./messageService";

interface MessageState {
    data: any | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: MessageState = {
    data: null,
    loading: false,
    error: null,
    success: false,
};

// Async thunk to post message
export const postMessage = createAsyncThunk(
    "message/post",
    async (messageData: any, thunkAPI) => {
        try {
            const response = await messageService.postMessage(messageData);
            return response;
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        reset: (state) => {
            state.success = false;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(postMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(postMessage.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.data = action.payload;
            })
            .addCase(postMessage.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload as string;
            });
    },
});

export const { reset } = messageSlice.actions;
export default messageSlice.reducer;
