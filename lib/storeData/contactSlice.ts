/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contactService } from "./contactService";
// import { contactService } from "@/lib/services/contactService";

interface ContactState {
  data: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: ContactState = {
  data: null,
  loading: false,
  error: null,
};

// Async thunk to get contact
export const getContact = createAsyncThunk(
  "contact/get",
  async (_, thunkAPI) => {
    try {
      const response = await contactService.getContact();
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch contact data"
      );
    }
  }
);

// Async thunk to post contact
export const postContact = createAsyncThunk(
  "contact/post",
  async (contactData: any, thunkAPI) => {
    try {
      const response = await contactService.postContact(contactData);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to post contact data"
      );
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContact.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // POST
      .addCase(postContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postContact.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default contactSlice.reducer;
