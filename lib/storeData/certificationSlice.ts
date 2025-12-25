/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { certificationService } from "./certificationService";

import { Certification } from "../../types";

interface CertificationState {
  certifications: Certification[];
  loading: boolean;
  error: string | null;
}

const initialState: CertificationState = {
  certifications: [],
  loading: false,
  error: null,
};

// Async thunk actions
export const fetchCertifications = createAsyncThunk(
  "certifications/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await certificationService.getcertifications();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch certifications");
    }
  }
);

export const createCertification = createAsyncThunk(
  "certifications/create",
  async (certification: Certification, { rejectWithValue }) => {
    try {
      const data = await certificationService.createcertifications(
        certification
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create certification");
    }
  }
);

export const updateCertification = createAsyncThunk(
  "certifications/update",
  async (certification: Certification, { rejectWithValue }) => {
    try {
      if (!certification._id)
        throw new Error("Certification ID is required for update");
      const data = await certificationService.updatecertifications(
        certification
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update certification");
    }
  }
);

export const deleteCertification = createAsyncThunk(
  "certifications/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await certificationService.deletecertifications(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to delete certification");
    }
  }
);

export const fetchFeaturedCertifications = createAsyncThunk(
  "certifications/fetchFeatured",
  async (_, { rejectWithValue }) => {
    try {
      const data = await certificationService.getFeaturedCertifications();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch featured certifications");
    }
  }
);

const certificationSlice = createSlice({
  name: "certifications",
  initialState,
  reducers: {
    // Optional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchCertifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCertifications.fulfilled,
        (state, action: PayloadAction<Certification[]>) => {
          state.loading = false;
          state.certifications = action.payload;
        }
      )
      .addCase(fetchCertifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create
      .addCase(createCertification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createCertification.fulfilled,
        (state, action: PayloadAction<Certification>) => {
          state.loading = false;
          state.certifications.push(action.payload);
        }
      )
      .addCase(createCertification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update
      .addCase(updateCertification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateCertification.fulfilled,
        (state, action: PayloadAction<Certification>) => {
          state.loading = false;
          const index = state.certifications.findIndex(
            (cert) => cert._id === action.payload._id
          );
          if (index !== -1) {
            state.certifications[index] = action.payload;
          }
        }
      )
      .addCase(updateCertification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete
      .addCase(deleteCertification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteCertification.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.certifications = state.certifications.filter(
            (cert) => cert._id !== action.payload
          );
        }
      )
      .addCase(deleteCertification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch featured
      .addCase(fetchFeaturedCertifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFeaturedCertifications.fulfilled,
        (state, action: PayloadAction<Certification[]>) => {
          state.loading = false;
          state.certifications = action.payload;
        }
      )
      .addCase(fetchFeaturedCertifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default certificationSlice.reducer;
