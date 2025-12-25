/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const createTechnologie = async (technologie: any) => {
  const res = await axios.post("/api/technologie", technologie);
  return res.data;
};

const getTechnologies = async () => {
  const res = await axios.get("/api/technologie");
  // 👇 Ensure this returns an array
  return res.data.technologies || res.data;
};

const updateTechnologie = async (id: string, technologie: any) => {
  const res = await axios.put(`/api/technologie?id=${id}`, technologie);
  return res.data;
};

const deleteTechnologie = async (id: string) => {
  const res = await axios.delete(`/api/technologie?id=${id}`);
  return res.data;
};

export const technologieService = {
  createTechnologie,
  getTechnologies,
  updateTechnologie,
  deleteTechnologie,
};
