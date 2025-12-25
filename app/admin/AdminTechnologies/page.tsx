/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/util/Dialog";
import { Card } from "@/util/Card";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  addTechnologie,
  deleteTechnologie,
  fetchTechnologies,
  updateTechnologie,
} from "@/lib/storeData/technologieSlice";
import Button from "@/util/Button";

const Technologies = () => {
  const dispatch = useAppDispatch();
  const { data: technologies = [], loading } = useAppSelector(
    (state) => state.technologie
  );

  const [open, setOpen] = useState(false);
  const [technologyData, setTechnologyData] = useState({
    name: "",
    icon: "",
    color: "from-blue-500 to-cyan-500",
    level: "Intermediate",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const gradientPresets = [
    { name: "Cyan to Blue", value: "from-cyan-500 to-blue-500" },
    { name: "Orange to Amber", value: "from-orange-500 to-amber-500" },
    { name: "Red to Orange", value: "from-red-600 to-orange-600" },
    { name: "Green to Emerald", value: "from-green-600 to-emerald-600" },
    { name: "Blue to Cyan", value: "from-blue-600 to-cyan-600" },
    { name: "Blue to Indigo", value: "from-blue-700 to-indigo-700" },
    { name: "Blue to Purple", value: "from-blue-600 to-purple-600" },
    { name: "Yellow to Yellow", value: "from-yellow-400 to-yellow-600" },
    { name: "Green to Teal", value: "from-green-500 to-teal-500" },
    { name: "Red to Orange", value: "from-red-500 to-orange-500" },
    { name: "Grey to Slate", value: "from-slate-700 to-slate-900" },
  ];

  useEffect(() => {
    dispatch(fetchTechnologies());
  }, [dispatch]);

  const handleAddNew = () => {
    setTechnologyData({
      name: "",
      icon: "",
      color: "from-cyan-500 to-blue-500",
      level: "Intermediate",
    });
    setEditId(null);
    setOpen(true);
  };

  const handleClose = () => {
    if (loading) return;
    setOpen(false);
    setTechnologyData({
      name: "",
      icon: "",
      color: "from-cyan-500 to-blue-500",
      level: "Intermediate",
    });
    setEditId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!technologyData.name.trim()) return;

    try {
      if (editId) {
        await dispatch(
          updateTechnologie({
            id: editId,
            technologie: technologyData,
          })
        ).unwrap();
        toast.success("Technology updated successfully!");
      } else {
        await dispatch(addTechnologie(technologyData)).unwrap();
        toast.success("Technology added successfully!");
      }
      dispatch(fetchTechnologies());
      handleClose();
    } catch (error) {
      toast.error("Failed to save technology.");
      console.error(error);
    }
  };

  const handleEdit = (tech: any) => {
    setTechnologyData({
      name: tech.name,
      icon: tech.icon || "",
      color: tech.color || "#000000",
      level: tech.level || "Intermediate",
    });
    setEditId(tech._id);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteTechnologie(id)).unwrap();
      dispatch(fetchTechnologies());
      toast.success("Technology deleted!");
    } catch (error) {
      toast.error("Failed to delete technology.");
      console.error(error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
          setTechnologyData({ ...technologyData, icon: data.url });
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

  const isUrl = (str: string) => Boolean(str && (str.startsWith("http") || str.startsWith("/")));

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Technologies
          </h1>
          <p className="text-muted-foreground">
            Manage your professional technologies and tools.
          </p>
        </div>
        <Button onClick={handleAddNew} disabled={loading}>
          <Plus size={16} className="mr-2" />
          Add New Technology
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {technologies.length === 0 && (
          <p className="text-muted-foreground">No technologies added yet.</p>
        )}
        {technologies.map((tech: any, index: number) => (
          <Card key={index} className="border group relative overflow-hidden">
            <div className="flex justify-between items-center p-4 relative z-10">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-transform group-hover:scale-110 bg-gradient-to-br ${tech.color}`}
                  style={{
                    borderColor: "rgba(255,255,255,0.1)",
                  }}
                >
                  {isUrl(tech.icon) ? (
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <span className="text-2xl">
                      {tech.icon || tech.name[0]}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {tech.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium">
                      {tech.level}
                    </span>
                    <div
                      className={`w-3 h-3 rounded-full border border-white/20 bg-gradient-to-br ${tech.color}`}
                    />
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 px-3"
                  onClick={() => handleEdit(tech)}
                >
                  <Edit size={14} className="mr-1.5" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-9 px-3 border-destructive/20 hover:bg-destructive/10 text-destructive"
                  onClick={() => handleDelete(tech._id)}
                >
                  <Trash2 size={14} className="mr-1.5" />
                  Delete
                </Button>
              </div>
            </div>
            {/* Background Glow */}
            <div
              className="absolute -right-4 -bottom-4 w-24 h-24 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
              style={{ backgroundColor: tech.color }}
            />
          </Card>
        ))}
      </div>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editId ? "Edit Technology" : "Add New Technology"}
            </DialogTitle>
            <DialogDescription>
              {editId
                ? "Update the technology details."
                : "Enter the details of your new technology."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl border bg-secondary/20">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 bg-gradient-to-br ${technologyData.color}`}
                style={{
                  borderColor: "rgba(255,255,255,0.1)",
                }}
              >
                {isUrl(technologyData.icon) ? (
                  <img
                    src={technologyData.icon}
                    alt="Preview"
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <span className="text-4xl">
                    {technologyData.icon || technologyData.name[0] || "?"}
                  </span>
                )}
              </div>
              <div>
                <h4 className="font-bold text-lg">
                  {technologyData.name || "Technology Name"}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {technologyData.level} Level
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground whitespace-pre-wrap">
                    Gradient: {technologyData.color}
                  </span>
                  <div
                    className={`w-3 h-3 rounded-full border bg-gradient-to-br ${technologyData.color}`}
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Technology Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="e.g. React, Node.js"
                value={technologyData.name}
                onChange={(e) =>
                  setTechnologyData({ ...technologyData, name: e.target.value })
                }
                className="w-full mt-1 p-2.5 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Icon (Emoji or Image)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. ⚛️"
                    value={isUrl(technologyData.icon) ? "Image Uploaded" : technologyData.icon}
                    onChange={(e) =>
                      setTechnologyData({
                        ...technologyData,
                        icon: e.target.value,
                      })
                    }
                    disabled={isUrl(technologyData.icon)}
                    className="flex-1 p-2.5 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                  <label className="flex items-center justify-center w-11 h-11 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                    <Upload size={18} className={isUploading ? "animate-bounce" : ""} />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                  </label>
                  {isUrl(technologyData.icon) && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-11 w-11 p-0"
                      onClick={() => setTechnologyData({ ...technologyData, icon: "" })}
                    >
                      <Trash2 size={16} className="text-destructive" />
                    </Button>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="level" className="text-sm font-medium mb-1 block">
                  Proficiency Level
                </label>
                <select
                  id="level"
                  value={technologyData.level}
                  onChange={(e) =>
                    setTechnologyData({
                      ...technologyData,
                      level: e.target.value,
                    })
                  }
                  className="w-full p-2.5 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  required
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                  <option value="Master">Master</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Theme Gradient
              </label>
              <div className="space-y-3">
                <div className="grid grid-cols-5 gap-2">
                  {gradientPresets.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setTechnologyData({ ...technologyData, color: preset.value })}
                      className={`h-10 rounded-md bg-gradient-to-br ${preset.value} border-2 transition-all ${technologyData.color === preset.value ? "border-primary scale-110" : "border-transparent"
                        }`}
                      title={preset.name}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Custom Tailwind Gradient classes"
                    value={technologyData.color}
                    onChange={(e) =>
                      setTechnologyData({
                        ...technologyData,
                        color: e.target.value,
                      })
                    }
                    className="flex-1 p-2.5 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono text-sm"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Technologies;
