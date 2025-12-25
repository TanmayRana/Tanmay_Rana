import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "./profileService";

const initialState = {
  name: "",
  title: "",
  tagline: "",
  profileImage: "",
  description: "",
  roles: [] as string[],
  expertise: "",
  whatsapp: "",
  greeting: "",
  location: "",
  status: "",
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const getProfileData = createAsyncThunk(
  "profile/getProfileData",
  async (_, thunkAPI) => {
    try {
      return await profileService.profileGet();
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(
        (error as { response?: { data?: { error?: string } } }).response?.data?.error || "Failed to fetch profile data"
      );
    }
  }
);

export const updateProfileData = createAsyncThunk(
  "profile/updateProfileData",
  async (
    data: {
      name: string;
      title: string;
      tagline: string;
      profileImage: string;
      description: string;
      roles: string[];
      expertise: string;
      whatsapp: string;
      greeting: string;
      location: string;
      status: string;
    },
    thunkAPI
  ) => {
    // console.log("Data in updateProfileData", data);
    try {
      return await profileService.profileUpdate(data);
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(
        (error as { response?: { data?: { error?: string } } }).response?.data?.error || "Failed to update profile data"
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      const { name, title, tagline, profileImage, description, roles, expertise, whatsapp, greeting, location, status } = action.payload;
      state.name = name;
      state.title = title;
      state.tagline = tagline;
      state.profileImage = profileImage;
      state.description = description;
      state.roles = roles;
      state.expertise = expertise;
      state.whatsapp = whatsapp;
      state.greeting = greeting;
      state.location = location;
      state.status = status;
    },
    resetProfileData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getProfileData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfileData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = "";
        const { name, title, tagline, profileImage, description, roles, expertise, whatsapp, greeting, location, status } = action.payload;
        state.name = name;
        state.title = title;
        state.tagline = tagline;
        state.profileImage = profileImage;
        state.description = description;
        state.roles = roles;
        state.expertise = expertise;
        state.whatsapp = whatsapp;
        state.greeting = greeting;
        state.location = location;
        state.status = status;
      })
      .addCase(getProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload as string;
      })
      // POST
      .addCase(updateProfileData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfileData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = "";
        const { name, title, tagline, profileImage, description, roles, expertise, whatsapp, greeting, location, status } = action.payload;
        state.name = name;
        state.title = title;
        state.tagline = tagline;
        state.profileImage = profileImage;
        state.description = description;
        state.roles = roles;
        state.expertise = expertise;
        state.whatsapp = whatsapp;
        state.greeting = greeting;
        state.location = location;
        state.status = status;
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { setProfileData, resetProfileData } = profileSlice.actions;
export default profileSlice.reducer;
