/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const getSocialMedia = async () => {
  try {
    const response = await axios.get("/api/socialMedia");
    // Return full response so slice can use payload.contact
    return response.data;
  } catch (error) {
    console.error("Error fetching social media data:", error);
    throw error;
  }
};

const postSocialMedia = async (data: any) => {
  try {
    // console.log("Posting social media data:", data);

    const response = await axios.post("/api/socialMedia", data);
    return response.data;
  } catch (error) {
    console.error("Error posting social media data:", error);
    throw error;
  }
};

export const socialMediaService = {
  getSocialMedia,
  postSocialMedia,
};
