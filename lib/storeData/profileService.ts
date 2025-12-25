/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const profileGet = async () => {
  const res = await axios.get("/api/profile");
  return res.data;
};

// const profileUpdate = async (data: {
//   name: string;
//   title: string;
//   tagline: string;
//   profileImage: string;
// }) => {
//   const res = await axios.post("/api/profile", {
//     profileImage: data.profileImage,
//     name: data.name,
//     title: data.title,
//     tagline: data.tagline,
//   });
//   return res.data;
// };

type ProfileData = {
  name: string;
  title: string;
  tagline: string;
  profileImage: string;
};

export const profileUpdate = async (data: ProfileData) => {
  try {
    const response = await axios.post("/api/profile", data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Profile update failed:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.error || "Profile update failed");
  }
};

const profileService = {
  profileGet,
  profileUpdate,
};

export default profileService;
