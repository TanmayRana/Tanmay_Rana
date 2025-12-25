/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const getResume = async () => {
    const res = await axios.get("/api/resume");
    return res.data;
};

const uploadResume = async (resumeUrl: string) => {
    const res = await axios.post("/api/resume", { resumeUrl });
    return res.data;
};

export const resumeService = {
    getResume,
    uploadResume,
};
