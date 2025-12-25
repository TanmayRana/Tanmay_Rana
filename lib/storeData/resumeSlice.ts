/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { resumeService } from "./resumeService";

interface ResumeState {
    resumeUrl: string | null;
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
}

const initialState: ResumeState = {
    resumeUrl: null,
    isLoading: false,
    isError: false,
    errorMessage: "",
};

// GET resume
export const getResume = createAsyncThunk(
    "resume/getResume",
    async (_, thunkAPI) => {
        try {
            return await resumeService.getResume();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.message || "Failed to fetch resume"
            );
        }
    }
);

// UPLOAD resume
export const uploadResume = createAsyncThunk(
    "resume/uploadResume",
    async (resumeUrl: string, thunkAPI) => {
        try {
            return await resumeService.uploadResume(resumeUrl);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.message || "Failed to upload resume"
            );
        }
    }
);

const resumeSlice = createSlice({
    name: "resume",
    initialState,
    reducers: {
        resetResumeState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            // GET
            .addCase(getResume.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = "";
            })
            .addCase(getResume.fulfilled, (state, action) => {
                state.isLoading = false;
                state.resumeUrl = action.payload.resumeUrl || null;
            })
            .addCase(getResume.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload as string;
            })

            // UPLOAD
            .addCase(uploadResume.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = "";
            })
            .addCase(uploadResume.fulfilled, (state, action) => {
                state.isLoading = false;
                state.resumeUrl = action.payload.updatedResume?.resumeUrl || null;
            })
            .addCase(uploadResume.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload as string;
            });
    },
});

export const { resetResumeState } = resumeSlice.actions;
export default resumeSlice.reducer;
