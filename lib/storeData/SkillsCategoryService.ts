/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const createSkillsCategory = async (skillsCategoryData: any) => {
  try {
    console.log(
      "skillsCategoryData in createSkillsCategory service",
      skillsCategoryData
    );

    const res = await axios.post("/api/skillsCategory", skillsCategoryData);
    return res.data;
  } catch (error) {
    return error;
  }
};

const updateSkillsCategory = async (id: string, skillsCategoryData: any) => {
  try {
    const res = await axios.put(`/api/skillsCategory`, {
      id,
      data: skillsCategoryData,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

const deleteSkillsCategory = async (id: string) => {
  try {
    const res = await axios.delete(`/api/skillsCategory`, { data: { id } });
    return res.data;
  } catch (error) {
    return error;
  }
};

// const getSkillsCategory = async (category: string) => {
const getSkillsCategory = async () => {
  try {
    // const res = await axios.get(`/api/skillsCategory`, {
    //   params: { category },
    // });
    const res = await axios.get(`/api/skillsCategory`);
    return res.data.skillsCategories;
  } catch (error) {
    return error;
  }
};

export const skillsCategoryService = {
  createSkillsCategory,
  updateSkillsCategory,
  deleteSkillsCategory,
  getSkillsCategory,
};
