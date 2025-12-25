// /* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from "axios";

// const createSkill = async (skillData: any) => {
//   console.log("skillData in createSkill", skillData);
//   try {
//     const res = await axios.post("/api/skill", skillData);
//     return res.data;
//   } catch (error) {
//     return error;
//   }
// };

// const updateSkill = async (id: string, skillData: any) => {
//   try {
//     const res = await axios.put(`/api/skills/${id}`, skillData);
//     return res.data;
//   } catch (error) {
//     return error;
//   }
// };

// const deleteSkill = async (id: string) => {
//   try {
//     const res = await axios.delete(`/api/skills/${id}`);
//     return res.data;
//   } catch (error) {
//     return error;
//   }
// };

// const getSkills = async (category: string) => {
//   try {
//     const res = await axios.get(`/api/skills?category=${category}`);
//     return res.data;
//   } catch (error) {
//     return error;
//   }
// };

// export const skillsService = {
//   createSkill,
//   updateSkill,
//   deleteSkill,
//   getSkills,
// };

import { Skill } from "@/types";
import axios from "axios";

const BASE_URL = "/api/skill";

export const getSkills = async (category?: string): Promise<Skill[]> => {
  const url = category ? `${BASE_URL}?category=${category}` : BASE_URL;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch skills");
  return data.skills;
};

export const createSkill = async (skill: {
  name: string;
  level: number;
  category: string;
}): Promise<Skill> => {
  // const res = await fetch(BASE_URL, {
  //   method: "POST",
  //   body: JSON.stringify(skill),
  // });

  const res = await axios.post(BASE_URL, skill);
  // console.log("res in createSkill", res);

  return res.data.newSkill;
};

export const updateSkill = async (
  id: string,
  data: Partial<Skill>
): Promise<Skill> => {
  // const res = await fetch(`${BASE_URL}?id=${id}`, {
  //   method: "PUT",
  //   body: JSON.stringify({ data }),
  // });

  // console.log("data in updateSkill", data);

  const res = await axios.put(`${BASE_URL}?id=${id}`, data);

  return res.data.updatedSkill;
};

export const deleteSkill = async (id: string): Promise<Skill> => {
  const res = await fetch(`${BASE_URL}?id=${id}`, {
    method: "DELETE",
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Failed to delete skill");
  return result.deletedSkill;
};

export const service = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};
