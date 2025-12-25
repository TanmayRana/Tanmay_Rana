/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const createcertifications = async (certification: any) => {
  try {
    const { title, issuer, date, description, credentialUrl, link, featured } = certification;
    const res = await axios.post("/api/certification", {
      title,
      issuer,
      date,
      description,
      credentialUrl,
      link,
      featured,
    });
    // console.log("res.data in createcertifications", res.data);

    return res.data;
  } catch (error) {
    console.error("Error creating certification:", error);
    throw new Error("Failed to create certification");
  }
};

const updatecertifications = async (certification: any) => {
  try {
    const { _id, title, issuer, date, description, credentialUrl, link, featured } = certification;
    const id = _id;
    // console.log("id in updatecertifications", id);

    const res = await axios.put(`/api/certification?id=${id}`, {
      title,
      issuer,
      date,
      description,
      credentialUrl,
      link,
      featured,
    });
    return res.data;
  } catch (error) {
    console.error("Error updating certification:", error);
    throw new Error("Failed to update certification");
  }
};

const deletecertifications = async (id: string) => {
  try {
    const res = await axios.delete(`/api/certification?id=${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting certification:", error);
    throw new Error("Failed to delete certification");
  }
};

const getcertifications = async () => {
  try {
    const res = await axios.get("/api/certification");
    return res.data.certifications;
  } catch (error) {
    console.error("Error fetching certifications:", error);
    throw new Error("Failed to fetch certifications");
  }
};

const getFeaturedCertifications = async () => {
  try {
    const res = await axios.get("/api/certification/featured");
    return res.data.certifications;
  } catch (error) {
    console.error("Error fetching featured certifications:", error);
    throw new Error("Failed to fetch featured certifications");
  }
};

export const certificationService = {
  createcertifications,
  updatecertifications,
  deletecertifications,
  getcertifications,
  getFeaturedCertifications,
};
