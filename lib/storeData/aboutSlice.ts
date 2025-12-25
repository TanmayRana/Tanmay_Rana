/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AboutService } from "./aboutService";

/* ---------- Types ---------- */
export interface Passion {
  _id?: string;
  title: string;
  description: string;
  icon: string;
}

interface AboutState {
  story: string;
  story2: string;
  exp_year: string;
  projects_completed: string;
  happy_clients: string;
  passions: Passion[];
  loading: boolean;
  error: string | null;
}

/* ---------- Initial State ---------- */
const initialState: AboutState = {
  story: "",
  story2: "",
  exp_year: "0+",
  projects_completed: "0+",
  happy_clients: "0+",
  passions: [],
  loading: false,
  error: null,
};

/* ---------- Async Thunks ---------- */
export const fetchAbout = createAsyncThunk(
  "about/fetchAbout",
  async (_, thunkAPI) => {
    try {
      const res = await AboutService.getAbout();
      return {
        story: res.about?.story || "",
        story2: res.about?.story2 || "",
        exp_year: res.about?.exp_year || "0+",
        projects_completed: res.about?.projects_completed || "0+",
        happy_clients: res.about?.happy_clients || "0+",
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch about");
    }
  }
);

export const updateAbout = createAsyncThunk(
  "about/updateAbout",
  async (
    data: {
      story: string;
      story2?: string;
      exp_year?: string;
      projects_completed?: string;
      happy_clients?: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await AboutService.updateAbout(data);
      return {
        story: res.updated?.story || data.story,
        story2: res.updated?.story2 || data.story2 || "",
        exp_year: res.updated?.exp_year || data.exp_year || "0+",
        projects_completed:
          res.updated?.projects_completed || data.projects_completed || "0+",
        happy_clients:
          res.updated?.happy_clients || data.happy_clients || "0+",
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to update about"
      );
    }
  }
);

export const fetchPassions = createAsyncThunk(
  "about/fetchPassions",
  async (_, thunkAPI) => {
    try {
      const res = await AboutService.getPassions();
      return res.passions || [];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch passions"
      );
    }
  }
);

export const createPassion = createAsyncThunk(
  "about/createPassion",
  async (data: Passion, thunkAPI) => {
    try {
      const res = await AboutService.createPassion(data);
      return res.newPassion;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to create passion"
      );
    }
  }
);

export const updatePassion = createAsyncThunk(
  "about/updatePassion",
  async ({ id, data }: { id: string; data: Passion }, thunkAPI) => {
    try {
      const res = await AboutService.updatePassion(id, data);
      return res.updatedPassion;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to update passion"
      );
    }
  }
);

export const deletePassion = createAsyncThunk(
  "about/deletePassion",
  async (id: string, thunkAPI) => {
    try {
      await AboutService.deletePassion(id);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to delete passion"
      );
    }
  }
);

/* ---------- Slice ---------- */
const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    setStory(state, action: PayloadAction<any>) {
      state.story = action.payload.story;
      if (action.payload.exp_year) state.exp_year = action.payload.exp_year;
      if (action.payload.projects_completed)
        state.projects_completed = action.payload.projects_completed;
      if (action.payload.happy_clients)
        state.happy_clients = action.payload.happy_clients;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch About
      .addCase(fetchAbout.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAbout.fulfilled, (state, action) => {
        state.loading = false;
        state.story = action.payload.story;
        state.story2 = action.payload.story2;
        state.exp_year = action.payload.exp_year;
        state.projects_completed = action.payload.projects_completed;
        state.happy_clients = action.payload.happy_clients;
      })
      .addCase(fetchAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update About
      .addCase(updateAbout.fulfilled, (state, action) => {
        state.story = action.payload.story;
        state.story2 = action.payload.story2;
        state.exp_year = action.payload.exp_year;
        state.projects_completed = action.payload.projects_completed;
        state.happy_clients = action.payload.happy_clients;
      })

      // Fetch Passions
      .addCase(fetchPassions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPassions.fulfilled, (state, action) => {
        state.loading = false;
        state.passions = action.payload;
      })
      .addCase(fetchPassions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Passion
      .addCase(createPassion.fulfilled, (state, action) => {
        state.passions.push(action.payload);
      })

      // Update Passion
      .addCase(updatePassion.fulfilled, (state, action) => {
        const index = state.passions.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.passions[index] = action.payload;
        }
      })

      // Delete Passion
      .addCase(deletePassion.fulfilled, (state, action) => {
        state.passions = state.passions.filter((p) => p._id !== action.payload);
      });
  },
});

export const { setStory } = aboutSlice.actions;
export default aboutSlice.reducer;
