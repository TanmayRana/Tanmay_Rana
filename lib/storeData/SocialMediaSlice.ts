import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { socialMediaService } from "./SocialMediaService";
import { SocialMedia } from "@/types";
// import { socialMediaService } from "@/lib/services/socialMediaService";

interface SocialMediaState {
  data: SocialMedia | null;
  loading: boolean;
  error: string | null;
}

const initialState: SocialMediaState = {
  data: null,
  loading: false,
  error: null,
};

// GET social media data
export const getSocialMedia = createAsyncThunk(
  "socialMedia/get",
  async (_, thunkAPI) => {
    try {
      const response = await socialMediaService.getSocialMedia();
      return response;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(
        (error as Error).message || "Failed to fetch social media data"
      );
    }
  }
);

// POST social media data
export const postSocialMedia = createAsyncThunk(
  "socialMedia/post",
  async ({ github, linkedin, twitter }: { github: string; linkedin: string; twitter: string }, thunkAPI) => {
    try {
      //   console.log("Posting social media data:", data);
      const response = await socialMediaService.postSocialMedia({
        github,
        linkedin,
        twitter,
      });
      return response;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(
        (error as Error).message || "Failed to post social media data"
      );
    }
  }
);

const socialMediaSlice = createSlice({
  name: "socialMedia",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getSocialMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSocialMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.data = Array.isArray(action.payload.contact) ? action.payload.contact[0] : action.payload.contact;
      })
      .addCase(getSocialMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // POST
      .addCase(postSocialMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postSocialMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.data = Array.isArray(action.payload.contact) ? action.payload.contact[0] : action.payload.contact;
      })
      .addCase(postSocialMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default socialMediaSlice.reducer;
