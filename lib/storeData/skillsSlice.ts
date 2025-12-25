/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { skillsService } from "./skillsService";
// // import { skillsService } from "@/lib/services/skillsService";

// export interface Skill {
//   _id: string;
//   name: string;
//   level: number;
//   category: string;
// }

// interface SkillsState {
//   skills: Skill[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: SkillsState = {
//   skills: [],
//   loading: false,
//   error: null,
// };

// // --- Thunks ---
// export const fetchSkills = createAsyncThunk(
//   "skills/fetchSkills",
//   async (category: string, { rejectWithValue }) => {
//     try {
//       return await skillsService.getSkills(category);
//     } catch (error: any) {
//       return rejectWithValue(
//         error?.response?.data?.error || "Failed to fetch skills"
//       );
//     }
//   }
// );

// export const addSkill = createAsyncThunk(
//   "skills/addSkill",
//   async (skillData: Omit<Skill, "_id">, { rejectWithValue }) => {
//     console.log("skillData in addSkill", skillData);

//     try {
//       return await skillsService.createSkill(skillData);
//     } catch (error: any) {
//       return rejectWithValue(
//         error?.response?.data?.error || "Failed to add skill"
//       );
//     }
//   }
// );

// export const editSkill = createAsyncThunk(
//   "skills/editSkill",
//   async (
//     { id, skillData }: { id: string; skillData: Partial<Skill> },
//     { rejectWithValue }
//   ) => {
//     try {
//       return await skillsService.updateSkill(id, skillData);
//     } catch (error: any) {
//       return rejectWithValue(
//         error?.response?.data?.error || "Failed to update skill"
//       );
//     }
//   }
// );

// export const removeSkill = createAsyncThunk(
//   "skills/removeSkill",
//   async (id: string, { rejectWithValue }) => {
//     try {
//       return await skillsService.deleteSkill(id);
//     } catch (error: any) {
//       return rejectWithValue(
//         error?.response?.data?.error || "Failed to delete skill"
//       );
//     }
//   }
// );

// // --- Slice ---
// const skillsSlice = createSlice({
//   name: "skills",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch Skills
//       .addCase(fetchSkills.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchSkills.fulfilled,
//         (state, action: PayloadAction<Skill[]>) => {
//           state.skills = action.payload;
//           state.loading = false;
//         }
//       )
//       .addCase(fetchSkills.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       // Add Skill
//       .addCase(addSkill.fulfilled, (state, action: PayloadAction<Skill>) => {
//         state.skills.push(action.payload);
//       })

//       // Edit Skill
//       .addCase(editSkill.fulfilled, (state, action: PayloadAction<Skill>) => {
//         const index = state.skills.findIndex(
//           (s) => s._id === action.payload._id
//         );
//         if (index !== -1) {
//           state.skills[index] = action.payload;
//         }
//       })

//       // Delete Skill
//       .addCase(
//         removeSkill.fulfilled,
//         (state, action: PayloadAction<{ _id: string }>) => {
//           state.skills = state.skills.filter(
//             (s) => s._id !== action.payload._id
//           );
//         }
//       );
//   },
// });

// export default skillsSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Skill } from "@/types";
import { service } from "./skillsService";
// import * as service from "@/lib/services/skillsService";

interface SkillsState {
  skills: Skill[];
  loading: boolean;
  error: string | null;
}

const initialState: SkillsState = {
  skills: [],
  loading: false,
  error: null,
};

// Thunks
// export const fetchSkills = createAsyncThunk(
//   "skills/fetch",
//   async (category?: string | undefined, thunkAPI) => {
//     try {
//       return await service.getSkills(category);
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(err.message);
//     }
//   }
// );

export const fetchSkills = createAsyncThunk(
  "skills/fetch",
  async (args: { category?: string } | undefined, thunkAPI) => {
    try {
      return await service.getSkills(args?.category);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addSkill = createAsyncThunk(
  "skills/add",
  async (
    skill: { name: string; level: number; category: string },
    thunkAPI
  ) => {
    try {
      return await service.createSkill(skill);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateSkill = createAsyncThunk(
  "skills/update",
  async ({ id, data }: { id: string; data: Partial<Skill> }, thunkAPI) => {
    try {
      return await service.updateSkill(id, data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteSkill = createAsyncThunk(
  "skills/delete",
  async (id: string, thunkAPI) => {
    try {
      return await service.deleteSkill(id);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Slice
const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    resetSkills: (state) => {
      state.skills = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addSkill.fulfilled, (state, action) => {
        state.skills.push(action.payload);
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        const index = state.skills.findIndex(
          (s) => s._id === action.payload._id
        );
        if (index !== -1) state.skills[index] = action.payload;
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.skills = state.skills.filter((s) => s._id !== action.payload._id);
      });
  },
});

export const { resetSkills } = skillsSlice.actions;
export default skillsSlice.reducer;
