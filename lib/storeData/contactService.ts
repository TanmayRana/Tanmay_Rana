/* eslint-disable @typescript-eslint/no-explicit-any */
import axiso from "axios";

const getContact = async () => {
  try {
    const response = await axiso.get("/api/contact");
    // Return full response payload so the slice can read response.data.contact
    return response.data;
  } catch (error) {
    console.error("Error fetching contact data:", error);
    throw error;
  }
};

const postContact = async (data: any) => {
  try {
    const response = await axiso.post("/api/contact", data);
    return response.data;
  } catch (error) {
    console.error("Error posting contact data:", error);
    throw error;
  }
};

export const contactService = {
  getContact,
  postContact,
};
