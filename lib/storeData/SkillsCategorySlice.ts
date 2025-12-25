// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { skillsCategoryService } from "./SkillsCategoryService";

// interface SkillsCategoryState {
//   skillsCategories: any[];
//   loading: boolean;
//   error: string | null;
// }

// // Initial State
// const initialState: SkillsCategoryState = {
//   skillsCategories: [],
//   loading: false,
//   error: null,
// };

// // Async Thunks
// export const getSkillsCategories = createAsyncThunk(
//   "skillsCategory/getSkillsCategories",
//   //   async (category: string, thunkAPI) => {
//   async (_, thunkAPI) => {
//     try {
//       return await skillsCategoryService.getSkillsCategory();
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message || "Failed to fetch");
//     }
//   }
// );

// export const createSkillsCategory = createAsyncThunk(
//   "skillsCategory/createSkillsCategory",
//   async (
//     { category, color }: { category: string; color: string },
//     thunkAPI
//   ) => {
//     const skillsCategoryData = {
//       category,
//       color,
//     };
//     try {
//       return await skillsCategoryService.createSkillsCategory({
//         skillsCategoryData,
//       });
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message || "Failed to create");
//     }
//   }
// );

// export const updateSkillsCategory = createAsyncThunk(
//   "skillsCategory/updateSkillsCategory",
//   async ({ id, data }: any, thunkAPI) => {
//     try {
//       return await skillsCategoryService.updateSkillsCategory(id, data);
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message || "Failed to update");
//     }
//   }
// );

// export const deleteSkillsCategory = createAsyncThunk(
//   "skillsCategory/deleteSkillsCategory",
//   async (id: string, thunkAPI) => {
//     try {
//       return await skillsCategoryService.deleteSkillsCategory(id);
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message || "Failed to delete");
//     }
//   }
// );

// // Slice
// const skillsCategorySlice = createSlice({
//   name: "skillsCategory",
//   initialState,
//   reducers: {
//     resetSkillsCategoryState(state) {
//       state.skillsCategories = [];
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Get
//       .addCase(getSkillsCategories.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getSkillsCategories.fulfilled, (state, action) => {
//         state.skillsCategories = action.payload;
//         state.loading = false;
//       })
//       .addCase(
//         getSkillsCategories.rejected,
//         (state, action: PayloadAction<any>) => {
//           state.loading = false;
//           state.error = action.payload;
//         }
//       )

//       // Create
//       .addCase(createSkillsCategory.fulfilled, (state, action) => {
//         state?.skillsCategories?.push(action.payload);
//       })
//       .addCase(createSkillsCategory.rejected, (state, action) => {
//         state.error = action.payload;
//       })

//       // Update
//       .addCase(updateSkillsCategory.fulfilled, (state, action) => {
//         const updated = action.payload;
//         const index = state.skillsCategories.findIndex(
//           (item) => item._id === updated._id
//         );
//         if (index !== -1) {
//           state.skillsCategories[index] = action.payload;
//         }
//       })
//       .addCase(updateSkillsCategory.rejected, (state, action) => {
//         state.error = action.payload;
//       })

//       // Delete
//       .addCase(deleteSkillsCategory.fulfilled, (state, action) => {
//         state.skillsCategories = state.skillsCategories.filter(
//           (item) => item._id !== action.payload._id
//         );
//       })
//       .addCase(deleteSkillsCategory.rejected, (state, action) => {
//         state.error = action.payload;
//       });
//   },
// });

// export const { resetSkillsCategoryState } = skillsCategorySlice.actions;
// export default skillsCategorySlice.reducer;

// "use client";

// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { skillsCategoryService } from "./SkillsCategoryService";

// // Define Skill Category Interface (you can replace 'any' with a real interface)
// interface SkillCategory {
//   _id: string;
//   category: string;
//   color: string;
// }

// interface SkillsCategoryState {
//   skillsCategories: SkillCategory[];
//   loading: boolean;
//   error: string | null;
// }

// // Initial State
// const initialState: SkillsCategoryState = {
//   skillsCategories: [],
//   loading: false,
//   error: null,
// };

// // ✅ GET all categories
// export const getSkillsCategories = createAsyncThunk(
//   "skillsCategory/getSkillsCategories",
//   async (_, thunkAPI) => {
//     try {
//       return await skillsCategoryService.getSkillsCategory();
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message || "Failed to fetch");
//     }
//   }
// );

// // ✅ CREATE new category
// export const createSkillsCategory = createAsyncThunk(
//   "skillsCategory/createSkillsCategory",
//   async (
//     { category, color }: { category: string; color: string },
//     thunkAPI
//   ) => {
//     const skillsCategoryData = { category, color };
//     try {
//       return await skillsCategoryService.createSkillsCategory({
//         skillsCategoryData,
//       });
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message || "Failed to create");
//     }
//   }
// );

// // ✅ UPDATE category
// export const updateSkillsCategory = createAsyncThunk(
//   "skillsCategory/updateSkillsCategory",
//   async (
//     { id, data }: { id: string; data: Partial<SkillCategory> },
//     thunkAPI
//   ) => {
//     try {
//       return await skillsCategoryService.updateSkillsCategory(id, data);
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message || "Failed to update");
//     }
//   }
// );

// // ✅ DELETE category
// export const deleteSkillsCategory = createAsyncThunk(
//   "skillsCategory/deleteSkillsCategory",
//   async (id: string, thunkAPI) => {
//     try {
//       return await skillsCategoryService.deleteSkillsCategory(id);
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message || "Failed to delete");
//     }
//   }
// );

// // ✅ SLICE
// const skillsCategorySlice = createSlice({
//   name: "skillsCategory",
//   initialState,
//   reducers: {
//     resetSkillsCategoryState: (state) => {
//       state.skillsCategories = [];
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // GET
//       .addCase(getSkillsCategories.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         getSkillsCategories.fulfilled,
//         (state, action: PayloadAction<SkillCategory[]>) => {
//           state.skillsCategories = action.payload;
//           state.loading = false;
//         }
//       )
//       .addCase(
//         getSkillsCategories.rejected,
//         (state, action: PayloadAction<any>) => {
//           state.loading = false;
//           state.error = action.payload;
//         }
//       )

//       // CREATE
//       .addCase(
//         createSkillsCategory.fulfilled,
//         (state, action: PayloadAction<SkillCategory>) => {
//           state.skillsCategories.push(action.payload);
//         }
//       )
//       .addCase(
//         createSkillsCategory.rejected,
//         (state, action: PayloadAction<any>) => {
//           state.error = action.payload;
//         }
//       )

//       // UPDATE
//       .addCase(
//         updateSkillsCategory.fulfilled,
//         (state, action: PayloadAction<SkillCategory>) => {
//           const updated = action.payload;
//           const index = state.skillsCategories.findIndex(
//             (item) => item._id === updated._id
//           );
//           if (index !== -1) {
//             state.skillsCategories[index] = updated;
//           }
//         }
//       )
//       .addCase(
//         updateSkillsCategory.rejected,
//         (state, action: PayloadAction<any>) => {
//           state.error = action.payload;
//         }
//       )

//       // DELETE
//       .addCase(
//         deleteSkillsCategory.fulfilled,
//         (state, action: PayloadAction<SkillCategory>) => {
//           state.skillsCategories = state.skillsCategories.filter(
//             (item) => item._id !== action.payload._id
//           );
//         }
//       )
//       .addCase(
//         deleteSkillsCategory.rejected,
//         (state, action: PayloadAction<any>) => {
//           state.error = action.payload;
//         }
//       );
//   },
// });

// // ✅ EXPORTS
// export const { resetSkillsCategoryState } = skillsCategorySlice.actions;
// export default skillsCategorySlice.reducer;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { skillsCategoryService } from "./SkillsCategoryService";

// Define Skill Category Interface
interface SkillCategory {
  _id: string;
  category: string;
  color: string;
  icon: string;
  skills: any[];
}

interface SkillsCategoryState {
  skillsCategories: SkillCategory[];
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: SkillsCategoryState = {
  skillsCategories: [],
  loading: false,
  error: null,
};

// ✅ GET all categories
export const getSkillsCategories = createAsyncThunk(
  "skillsCategory/getSkillsCategories",
  async (_, thunkAPI) => {
    try {
      return await skillsCategoryService.getSkillsCategory();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch");
    }
  }
);

// ✅ CREATE new category
export const createSkillsCategory = createAsyncThunk(
  "skillsCategory/createSkillsCategory",
  async (
    { category, color, icon }: { category: string; color: string; icon: string },
    thunkAPI
  ) => {
    try {
      const skillsCategoryData = { category, color, icon };
      // console.log(
      //   "skillsCategoryData in createSkillsCategory",
      //   skillsCategoryData
      // );
      return await skillsCategoryService.createSkillsCategory({
        skillsCategoryData,
      });
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to create");
    }
  }
);

// ✅ UPDATE category
export const updateSkillsCategory = createAsyncThunk(
  "skillsCategory/updateSkillsCategory",
  async (
    { id, data }: { id: string; data: Partial<SkillCategory> },
    thunkAPI
  ) => {
    try {
      return await skillsCategoryService.updateSkillsCategory(id, data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to update");
    }
  }
);

// ✅ DELETE category
export const deleteSkillsCategory = createAsyncThunk(
  "skillsCategory/deleteSkillsCategory",
  async (id: string, thunkAPI) => {
    try {
      return await skillsCategoryService.deleteSkillsCategory(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to delete");
    }
  }
);

// ✅ SLICE
const skillsCategorySlice = createSlice({
  name: "skillsCategory",
  initialState,
  reducers: {
    resetSkillsCategoryState: (state) => {
      state.skillsCategories = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getSkillsCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getSkillsCategories.fulfilled,
        (state, action: PayloadAction<SkillCategory[]>) => {
          state.skillsCategories = action.payload ?? [];
          state.loading = false;
        }
      )
      .addCase(
        getSkillsCategories.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // CREATE
      .addCase(
        createSkillsCategory.fulfilled,
        (state, action: PayloadAction<SkillCategory>) => {
          if (state.skillsCategories && action.payload) {
            state.skillsCategories.push(action.payload);
          }
        }
      )
      .addCase(
        createSkillsCategory.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      )

      // UPDATE
      .addCase(
        updateSkillsCategory.fulfilled,
        (state, action: PayloadAction<SkillCategory>) => {
          const updated = action.payload;
          const index = state.skillsCategories.findIndex(
            (item) => item._id === updated._id
          );
          if (index !== -1) {
            state.skillsCategories[index] = updated;
          }
        }
      )
      .addCase(
        updateSkillsCategory.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      )

      // DELETE
      .addCase(
        deleteSkillsCategory.fulfilled,
        (state, action: PayloadAction<SkillCategory>) => {
          state.skillsCategories = state.skillsCategories.filter(
            (item) => item._id !== action.payload._id
          );
        }
      )
      .addCase(
        deleteSkillsCategory.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      );
  },
});

// ✅ EXPORTS
export const { resetSkillsCategoryState } = skillsCategorySlice.actions;
export default skillsCategorySlice.reducer;
