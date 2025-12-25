import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import profileReducer from "@/lib/storeData/profileSlice";
import projectReducer from "@/lib/storeData/projectSlice";
import skillsReducer from "@/lib/storeData/skillsSlice";
import skillsCategoryReducer from "@/lib/storeData/SkillsCategorySlice";
import certificationsReducer from "@/lib/storeData/certificationSlice";
import aboutReducer from "@/lib/storeData/aboutSlice";
import contactReducer from "@/lib/storeData/contactSlice";
import socialMediaReducer from "@/lib/storeData/SocialMediaSlice";
import technologieReducer from "@/lib/storeData/technologieSlice";
import resumeReducer from "@/lib/storeData/resumeSlice";
import messageReducer from "@/lib/storeData/messageSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    project: projectReducer,
    skills: skillsReducer,
    skillsCategory: skillsCategoryReducer,
    certifications: certificationsReducer,
    about: aboutReducer,
    contact: contactReducer,
    socialMedia: socialMediaReducer,
    technologie: technologieReducer,
    resume: resumeReducer,
    message: messageReducer,
  },
});

// Types for use in hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
