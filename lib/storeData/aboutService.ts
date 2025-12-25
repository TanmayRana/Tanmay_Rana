/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const getAbout = async () => {
  try {
    const res = await axios.get("/api/about/story");
    return res.data;
  } catch (error) {
    console.error("Error fetching about data:", error);
    throw error;
  }
};

const updateAbout = async (data: any) => {
  try {
    const res = await axios.post("/api/about/story", data);
    return res.data;
  } catch (error) {
    console.error("Error updating about data:", error);
    throw error;
  }
};

const getPassions = async () => {
  try {
    const res = await axios.get("/api/about/passions");
    return res.data;
  } catch (error) {
    console.error("Error fetching passions data:", error);
    throw error;
  }
};

const createPassion = async (data: any) => {
  try {
    const res = await axios.post("/api/about/passions", data);
    return res.data;
  } catch (error) {
    console.error("Error creating passion data:", error);
    throw error;
  }
};

const updatePassion = async (id: string, data: any) => {
  try {
    const res = await axios.put(`/api/about/passions?id=${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating passion data:", error);
    throw error;
  }
};

const deletePassion = async (id: string) => {
  try {
    const res = await axios.delete(`/api/about/passions?id=${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting passion data:", error);
    throw error;
  }
};

export const AboutService = {
  getAbout,
  updateAbout,
  getPassions,
  createPassion,
  updatePassion,
  deletePassion,
};
