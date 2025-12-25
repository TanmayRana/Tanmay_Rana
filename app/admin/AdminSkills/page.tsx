"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, Upload } from "lucide-react";
import { toast } from "sonner"; // For toast notifications

// Adjust import paths as per your project structure
import { Skill } from "../../../types";
import Button from "@/util/Button";
import { Card } from "@/util/Card";
import ProgressBar from "@/util/ProgressBar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/util/Dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAppDispatch, useAppSelector } from "@/hooks";

import {
  fetchSkills,
  addSkill,
  updateSkill,
  deleteSkill,
} from "@/lib/storeData/skillsSlice";

import {
  getSkillsCategories,
  createSkillsCategory,
  updateSkillsCategory,
  deleteSkillsCategory,
} from "@/lib/storeData/SkillsCategorySlice";

// AlertDialog components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Extended list of Tailwind gradient color pairs
const predefinedGradientColors = [
  { label: "Blue to Cyan", value: "from-blue-500 to-cyan-500" },
  { label: "Green to Emerald", value: "from-green-500 to-emerald-500" },
  { label: "Purple to Violet", value: "from-purple-500 to-violet-500" },
  { label: "Orange to Red", value: "from-orange-500 to-red-500" },
  { label: "Pink to Rose", value: "from-pink-500 to-rose-500" },
  { label: "Lime to Green", value: "from-lime-400 to-green-500" },
  { label: "Teal to Cyan", value: "from-teal-400 to-cyan-500" },
  { label: "Indigo to Purple", value: "from-indigo-500 to-purple-500" },
  { label: "Amber to Yellow", value: "from-amber-400 to-yellow-500" },
  { label: "Fuchsia to Pink", value: "from-fuchsia-500 to-pink-500" },
  { label: "Gray to Slate", value: "from-gray-500 to-slate-500" },
  { label: "Rose to Red", value: "from-rose-500 to-red-500" },
  { label: "Sky to Blue", value: "from-sky-400 to-blue-500" },
  { label: "Slate to Zinc", value: "from-slate-400 to-zinc-500" },
];

// Helper: Extract solid bg-* color from gradient (e.g. "from-blue-500 to-cyan-500" -> "bg-blue-500")
const extractSolidColor = (gradient: string) => {
  if (!gradient) return "bg-gray-500";
  const fromClass = gradient.split(" ")[0]; // ex: "from-blue-500"
  return fromClass.replace("from-", "bg-");
};

const AdminSkills = () => {
  const dispatch = useAppDispatch();

  // Redux store selections
  const {
    skills,
    loading: skillsLoading,
    error: skillsError,
  } = useAppSelector((state) => state.skills);
  const {
    skillsCategories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useAppSelector((state) => state.skillsCategory);

  // Local state for dialogs, edits, deletions
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Skill>>({});

  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState(
    predefinedGradientColors[0].value
  );

  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryColor, setEditCategoryColor] = useState(
    predefinedGradientColors[0].value
  );
  const [newCategoryIcon, setNewCategoryIcon] = useState("");
  const [editCategoryIcon, setEditCategoryIcon] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [skillToDelete, setSkillToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isSkillDeleteDialogOpen, setIsSkillDeleteDialogOpen] = useState(false);

  const [categoryToDelete, setCategoryToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isCategoryDeleteDialogOpen, setIsCategoryDeleteDialogOpen] =
    useState(false);

  // Fetch categories & skills
  useEffect(() => {
    dispatch(getSkillsCategories());
  }, [dispatch]);

  useEffect(() => {
    if (
      (skillsCategories && skillsCategories.length > 0) ||
      (!categoriesLoading && skillsCategories?.length === 0)
    ) {
      dispatch(fetchSkills());
    }
  }, [dispatch, skillsCategories, categoriesLoading]);

  // Helper to get category gradient color by name
  const getCategoryColor = (categoryName: string) => {
    const cat = skillsCategories.find((c) => c.category === categoryName);
    return cat ? cat.color : predefinedGradientColors[0].value;
  };

  const isUrl = (str: string) => Boolean(str && (str.startsWith("http") || str.startsWith("/")));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: base64 }),
        });
        const data = await res.json();
        if (res.ok && data.url) {
          if (isEdit) {
            setEditCategoryIcon(data.url);
          } else {
            setNewCategoryIcon(data.url);
          }
          toast.success("Icon uploaded successfully!");
        } else {
          toast.error("Upload failed.");
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  // Group skills by category for display
  const groupedSkills: Record<string, Skill[]> = skills.reduce((acc, skill) => {
    (acc[skill.category] = acc[skill.category] || []).push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Skill dialog handlers
  const handleEdit = (skill: Skill) => {
    setEditingSkillId(skill._id);
    setEditData(skill);
    setIsSkillDialogOpen(true);
  };
  const handleAddNew = (categoryName: Skill["category"]) => {
    setEditingSkillId(null);
    setEditData({ name: "", level: 50, category: categoryName });
    setIsSkillDialogOpen(true);
  };
  const handleSkillSave = async () => {
    if (!editData.name || !editData.category) {
      toast.error("Please provide both skill name and category.");
      return;
    }
    try {
      if (editingSkillId) {
        await dispatch(
          updateSkill({ id: editingSkillId, data: editData as Partial<Skill> })
        ).unwrap();
        toast.success("Skill updated successfully!");
      } else {
        await dispatch(addSkill(editData as Omit<Skill, "_id">)).unwrap();
        toast.success("Skill added successfully!");
      }
      dispatch(fetchSkills());
      closeSkillDialog();
    } catch (error: any) {
      console.log("error", error);

      const errorMessage =
        typeof error === "string"
          ? error
          : error?.message || error?.error || "Unknown error";

      toast.error(`Failed to save skill: ${errorMessage}`);
    }
  };
  const handleDeleteSkillClick = (id: string, name: string) => {
    setSkillToDelete({ id, name });
    setIsSkillDeleteDialogOpen(true);
  };
  const closeSkillDialog = () => {
    setIsSkillDialogOpen(false);
    setEditingSkillId(null);
    setEditData({});
  };

  // Category dialog handlers
  const openCategoryDialog = () => {
    setNewCategoryName("");
    setNewCategoryColor(predefinedGradientColors[0].value);
    setNewCategoryIcon("");
    setIsCategoryDialogOpen(true);
  };
  const handleCategorySave = async () => {
    const trimmedName = newCategoryName.trim();
    if (!trimmedName) {
      toast.error("Category name cannot be empty.");
      return;
    }
    if (
      skillsCategories?.some(
        (cat) => cat?.category?.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      toast.error("Category with this name already exists.");
      return;
    }
    try {
      await dispatch(
        createSkillsCategory({ category: trimmedName, color: newCategoryColor, icon: newCategoryIcon })
      ).unwrap();
      toast.success("Category added successfully!");
      dispatch(getSkillsCategories());
      setIsCategoryDialogOpen(false);
    } catch (error: any) {
      toast.error(
        `Failed to add category: ${error.message || "Unknown error"}`
      );
    }
  };
  const closeCategoryDialog = () => {
    setIsCategoryDialogOpen(false);
    setNewCategoryName("");
    setNewCategoryColor(predefinedGradientColors[0].value);
    setNewCategoryIcon("");
  };

  // Edit category handlers
  const handleEditCategory = (categoryId: string) => {
    const category = skillsCategories.find((cat) => cat._id === categoryId);
    if (!category) {
      toast.error("Category not found.");
      return;
    }
    setEditingCategoryId(category._id || null);
    setEditCategoryName(category.category);
    setEditCategoryColor(category.color);
    setEditCategoryIcon(category.icon || "");
    setIsEditingCategory(true);
  };
  const handleEditCategorySave = async () => {
    const trimmedName = editCategoryName.trim();
    if (!trimmedName) {
      toast.error("Category name cannot be empty.");
      return;
    }
    if (
      skillsCategories.some(
        (cat) =>
          cat.category.toLowerCase() === trimmedName.toLowerCase() &&
          cat._id !== editingCategoryId
      )
    ) {
      toast.error("Another category with this name already exists.");
      return;
    }
    if (!editingCategoryId) {
      toast.error("No category selected for editing.");
      return;
    }
    try {
      await dispatch(
        updateSkillsCategory({
          id: editingCategoryId,
          data: { category: trimmedName, color: editCategoryColor, icon: editCategoryIcon },
        })
      ).unwrap();
      toast.success("Category updated successfully!");
      dispatch(getSkillsCategories());
      setIsEditingCategory(false);
      setEditingCategoryId(null);
      setEditCategoryName("");
      setEditCategoryColor(predefinedGradientColors[0].value);
      setEditCategoryIcon("");
    } catch (error: any) {
      toast.error(
        `Failed to update category: ${error.message || "Unknown error"}`
      );
    }
  };
  const handleDeleteCategoryClick = (
    categoryId: string,
    categoryName: string
  ) => {
    setCategoryToDelete({ id: categoryId, name: categoryName });
    setIsCategoryDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6 lg:space-y-8 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold  mb-2">
            Skills Management
          </h1>
          <p className="text-gray-600">
            Manage your technical skills and expertise levels.
          </p>
        </div>
        <Button onClick={openCategoryDialog} className="w-full sm:w-auto">
          <Plus size={16} className="mr-2" /> Add New Category
        </Button>
      </div>

      {/* Skill Categories Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {skillsCategories?.length === 0 && !categoriesLoading && (
          <p className="text-gray-600 col-span-full text-center py-10">
            No skill categories found. Click "Add New Category" to get started.
          </p>
        )}
        {skillsCategories?.map((category) => (
          <Card key={category._id} className="p-4 lg:p-6 border">
            <div className="flex justify-between items-start gap-3 mb-6">
              <div className="flex items-center gap-3">
                {/* Gradient color circle */}
                <div
                  className={`w-6 h-6 rounded-full bg-gradient-to-r ${category.color} ring-1 ring-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0`}
                >
                  {category.icon && (
                    isUrl(category.icon) ? (
                      <img src={category.icon} alt={category.category} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs">{category.icon}</span>
                    )
                  )}
                </div>
                <h3 className="text-lg lg:text-xl font-bold capitalize">
                  {category.category}
                </h3>
                {/* Category actions */}
                <div className="flex gap-2 ml-4  flex-shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditCategory(category._id!)}
                    aria-label={`Edit category ${category.category}`}
                    className="cursor-pointer hover:px-5"
                  >
                    <Edit size={12} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="hover:bg-red-500 hover:border-0 px-2 hover:px-5 cursor-pointer"
                    onClick={() =>
                      handleDeleteCategoryClick(
                        category._id!,
                        category.category
                      )
                    }
                    aria-label={`Delete category ${category.category}`}
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
              </div>
              <Button
                onClick={() =>
                  handleAddNew(category.category as Skill["category"])
                }
                className="w-full sm:w-auto flex-shrink-0 cursor-pointer"
              >
                <Plus size={16} className="" />
                Add Skill
              </Button>
            </div>
            <div className="space-y-4">
              {(groupedSkills[category.category] || []).length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">No skills in this category yet.</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleAddNew(category.category as Skill["category"])
                    }
                    className="mt-2"
                  >
                    Add First Skill
                  </Button>
                </div>
              ) : (
                (groupedSkills[category.category] || []).map((skill) => (
                  <div
                    key={skill._id}
                    className="flex items-center justify-between p-3 bg-[#171717] border  rounded-lg hover:shadow-md "
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <span className="font-medium truncate">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-500 flex-shrink-0">
                          {skill.level}%
                        </span>
                      </div>
                      <ProgressBar
                        value={skill.level}
                        color={extractSolidColor(
                          getCategoryColor(skill.category)
                        )}
                        showValue={false}
                      />
                    </div>
                    <div className="flex gap-1 ml-4 flex-shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(skill)}
                        className="cursor-pointer"
                      >
                        <Edit size={12} />
                      </Button>
                      <Button
                        size="sm"
                        // variant="secondary"
                        className="bg-red-700 hover:bg-red-800 cursor-pointer"
                        onClick={() =>
                          handleDeleteSkillClick(skill._id, skill.name)
                        }
                      >
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Skill Dialog */}
      <Dialog
        open={isSkillDialogOpen}
        onOpenChange={(open) => !open && closeSkillDialog()}
      >
        <DialogContent className="max-w-2xl lg:w-5/12">
          <DialogHeader>
            <DialogTitle>
              {editingSkillId ? "Edit Skill" : "Add Skill"}
            </DialogTitle>
            <DialogDescription>
              {editingSkillId
                ? "Update your skill details."
                : "Enter details for the new skill."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <label
                htmlFor="skill-name"
                className="block text-sm font-medium  mb-2"
              >
                Skill Name
              </label>
              <input
                id="skill-name"
                type="text"
                value={editData.name || ""}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                autoFocus
              />
            </div>

            <div>
              <label
                htmlFor="skill-category"
                className="block text-sm font-medium  mb-2"
              >
                Category
              </label>
              <Select
                value={
                  editData.category ||
                  (skillsCategories.length > 0
                    ? skillsCategories[0]?.category
                    : "")
                }
                onValueChange={(value) =>
                  setEditData({
                    ...editData,
                    category: value as Skill["category"],
                  })
                }
              >
                <SelectTrigger
                  id="skill-category"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {skillsCategories?.length === 0 ? (
                    <SelectItem disabled value="">
                      No categories available. Please add one first.
                    </SelectItem>
                  ) : (
                    skillsCategories?.map((cat) => (
                      <SelectItem key={cat._id} value={cat.category}>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full bg-gradient-to-r ${cat.color}`}
                          ></div>
                          {cat.category}
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label
                htmlFor="skill-level"
                className="block text-sm font-medium  mb-2"
              >
                Skill Level: {editData.level || 0}%
              </label>
              <input
                id="skill-level"
                type="range"
                min={0}
                max={100}
                value={editData.level || 0}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    level: parseInt(e.target.value, 10),
                  })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>

          <DialogFooter className="pt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={closeSkillDialog}
              className="cursor-pointer"
            >
              <X size={16} className="mr-2" /> Cancel
            </Button>
            <Button onClick={handleSkillSave} className="cursor-pointer">
              <Save size={16} className="mr-2" /> Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog
        open={isCategoryDialogOpen}
        onOpenChange={(open) => !open && closeCategoryDialog()}
      >
        <DialogContent className="max-w-2xl lg:w-5/12">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Enter a name and choose a color for the new skill category.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="new-category-name"
                className="block text-sm font-medium  mb-2"
              >
                Category Name
              </label>
              <input
                id="new-category-name"
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                autoFocus
              />
            </div>

            <div>
              <label
                htmlFor="new-category-icon"
                className="block text-sm font-medium mb-2"
              >
                Category Icon (Emoji or Image URL)
              </label>
              <div className="flex gap-2">
                <input
                  id="new-category-icon"
                  type="text"
                  placeholder="✨ or https://..."
                  value={newCategoryIcon}
                  onChange={(e) => setNewCategoryIcon(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, false)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    disabled={isUploading}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <div className="w-4 h-4 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                    ) : (
                      <Upload size={16} />
                    )}
                  </Button>
                </div>
              </div>
              {newCategoryIcon && (
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <span>Preview:</span>
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                    {isUrl(newCategoryIcon) ? (
                      <img src={newCategoryIcon} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-lg">{newCategoryIcon}</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="new-category-color"
                className="block text-sm font-medium mb-2"
              >
                Choose Color
              </label>
              <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg">
                {predefinedGradientColors.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setNewCategoryColor(value)}
                    className={`w-8 h-8 rounded-full bg-gradient-to-r ${value} border-2 ${newCategoryColor === value
                      ? "border-indigo-500 ring-2 ring-indigo-500"
                      : "border-transparent"
                      }`}
                    aria-label={`Select color ${label}`}
                    title={label}
                  />
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="pt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={closeCategoryDialog}
              className="cursor-pointer"
            >
              <X size={16} className="mr-2" /> Cancel
            </Button>
            <Button onClick={handleCategorySave} className="cursor-pointer">
              <Save size={16} className="mr-2" /> Add Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog
        open={isEditingCategory}
        onOpenChange={(open) => !open && setIsEditingCategory(false)}
      >
        <DialogContent className="max-w-2xl lg:w-5/12">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category name and color.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="edit-category-name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category Name
              </label>
              <input
                id="edit-category-name"
                type="text"
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                autoFocus
              />
            </div>

            <div>
              <label
                htmlFor="edit-category-icon"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category Icon (Emoji or Image URL)
              </label>
              <div className="flex gap-2">
                <input
                  id="edit-category-icon"
                  type="text"
                  placeholder="✨ or https://..."
                  value={editCategoryIcon}
                  onChange={(e) => setEditCategoryIcon(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, true)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    disabled={isUploading}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <div className="w-4 h-4 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                    ) : (
                      <Upload size={16} />
                    )}
                  </Button>
                </div>
              </div>
              {editCategoryIcon && (
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <span>Preview:</span>
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                    {isUrl(editCategoryIcon) ? (
                      <img src={editCategoryIcon} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-lg">{editCategoryIcon}</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="edit-category-color"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Choose Color
              </label>
              <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg">
                {predefinedGradientColors.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setEditCategoryColor(value)}
                    className={`w-8 h-8 rounded-full bg-gradient-to-r ${value} border-2 ${editCategoryColor === value
                      ? "border-indigo-500 ring-2 ring-indigo-500"
                      : "border-transparent"
                      }`}
                    aria-label={`Select color ${label}`}
                    title={label}
                  />
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="pt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditingCategory(false)}
            >
              <X size={16} className="mr-2" /> Cancel
            </Button>
            <Button onClick={handleEditCategorySave}>
              <Save size={16} className="mr-2" /> Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alert Dialog for Skill Delete */}
      <AlertDialog
        open={isSkillDeleteDialogOpen}
        onOpenChange={setIsSkillDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Skill</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the skill{" "}
              <strong>{skillToDelete?.name}</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setIsSkillDeleteDialogOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (skillToDelete) {
                  try {
                    await dispatch(deleteSkill(skillToDelete.id)).unwrap();
                    toast.success("Skill deleted successfully!");
                    if (editingSkillId === skillToDelete.id) closeSkillDialog();
                    setIsSkillDeleteDialogOpen(false);
                    setSkillToDelete(null);
                  } catch (error: any) {
                    toast.error(
                      `Failed to delete skill: ${error.message || "Unknown error"
                      }`
                    );
                  }
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Alert Dialog for Category Delete */}
      <AlertDialog
        open={isCategoryDeleteDialogOpen}
        onOpenChange={setIsCategoryDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the category{" "}
              <strong>{categoryToDelete?.name}</strong>? This will also delete
              all skills associated with this category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setIsCategoryDeleteDialogOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (categoryToDelete) {
                  try {
                    await dispatch(
                      deleteSkillsCategory(categoryToDelete.id)
                    ).unwrap();
                    toast.success(
                      `Category "${categoryToDelete.name}" and its skills deleted successfully!`
                    );
                    dispatch(getSkillsCategories());
                    dispatch(fetchSkills());
                    if (editingCategoryId === categoryToDelete.id) {
                      setIsEditingCategory(false);
                      setEditingCategoryId(null);
                    }
                    setIsCategoryDeleteDialogOpen(false);
                    setCategoryToDelete(null);
                  } catch (error: any) {
                    toast.error(
                      `Failed to delete category: ${error.message || "Unknown error"
                      }`
                    );
                  }
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminSkills;
