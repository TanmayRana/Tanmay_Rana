/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { technologieService } from "./technologieService";

interface Technologie {
  _id?: string;
  name: string;
  icon: string;
  color: string;
  level: string;
}

interface TechnologieState {
  data: Technologie[];
  loading: boolean;
  error: string | null;
}

const initialState: TechnologieState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchTechnologies = createAsyncThunk(
  "technologie/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await technologieService.getTechnologies();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTechnologie = createAsyncThunk(
  "technologie/add",
  async (technologie: Omit<Technologie, "_id">, thunkAPI) => {
    try {
      const response = await technologieService.createTechnologie(technologie);
      return response.technologie || response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateTechnologie = createAsyncThunk(
  "technologie/update",
  async (
    { id, technologie }: { id: string; technologie: Technologie },
    thunkAPI
  ) => {
    try {
      const response = await technologieService.updateTechnologie(id, technologie);
      return response.technologie || response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTechnologie = createAsyncThunk(
  "technologie/delete",
  async (id: string, thunkAPI) => {
    try {
      return await technologieService.deleteTechnologie(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const technologieSlice = createSlice({
  name: "technologie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTechnologies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTechnologies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchTechnologies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addTechnologie.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateTechnologie.fulfilled, (state, action) => {
        const index = state.data.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(deleteTechnologie.fulfilled, (state, action) => {
        state.data = state.data.filter((t) => t._id !== action.payload._id);
      });
  },
});

export default technologieSlice.reducer;
