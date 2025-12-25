/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { projectService } from "./projectService";

interface ProjectState {
  projects: any[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

const initialState: ProjectState = {
  projects: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

// GET all projects
export const getProjects = createAsyncThunk(
  "project/getProjects",
  async (_, thunkAPI) => {
    try {
      return await projectService.getProjects();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch projects"
      );
    }
  }
);

// GET featured projects
export const getFeaturedProjects = createAsyncThunk(
  "project/getFeaturedProjects",
  async (_, thunkAPI) => {
    try {
      return await projectService.getFeaturedProjects();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch featured projects"
      );
    }
  }
);

// CREATE project
export const createProject = createAsyncThunk(
  "project/createProject",
  async (projectData: any, thunkAPI) => {
    try {
      return await projectService.createProject(projectData);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to create project"
      );
    }
  }
);

// UPDATE project
export const updateProject = createAsyncThunk(
  "project/updateProject",
  async ({ id, data }: { id: string; data: any }, thunkAPI) => {
    try {
      return await projectService.updateProject(id, data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to update project"
      );
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    resetProjectState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload as string;
      })

      // GET FEATURED
      .addCase(getFeaturedProjects.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(getFeaturedProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
      })
      .addCase(getFeaturedProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload as string;
      })

      // CREATE
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload as string;
      })

      // UPDATE
      .addCase(updateProject.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isLoading = false;
        const updated = action.payload;
        const index = state.projects.findIndex((p) => p._id === updated._id);
        if (index !== -1) {
          state.projects[index] = updated;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { resetProjectState } = projectSlice.actions;
export default projectSlice.reducer;
