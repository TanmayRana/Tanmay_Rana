// /* eslint-disable @next/next/no-img-element */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Plus,
//   Edit,
//   Trash2,
//   Save,
//   ExternalLink,
//   Github,
//   Upload,
//   X,
// } from "lucide-react";
// import { useAppDispatch, useAppSelector } from "@/hooks";
// import {
//   createProject,
//   getProjects,
//   updateProject,
//   // deleteProject,
// } from "@/lib/storeData/projectSlice";
// import Button from "@/util/Button";
// import { Card } from "@/util/Card";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/util/Dialog";
// import { Project } from "../../../types";
// import { toast } from "sonner";
// import Image from "next/image";

// const AdminProjects = () => {
//   const dispatch = useAppDispatch();
//   const { projects, isLoading } = useAppSelector((state) => state.project);

//   const [editingProject, setEditingProject] = useState<Project | null>(null);
//   const [editData, setEditData] = useState<Partial<Project>>({});
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   // Upload state
//   const [uploading, setUploading] = useState(false);
//   const [uploadError, setUploadError] = useState<string | null>(null);

//   useEffect(() => {
//     dispatch(getProjects()).catch(() => {
//       toast.error("Failed to load projects");
//     });
//   }, [dispatch]);

//   const handleSave = async () => {
//     if (!editData.title || editData.title.trim() === "") {
//       toast.error("Project title cannot be empty");
//       return;
//     }

//     try {
//       if (editingProject && editingProject._id) {
//         // Update existing project
//         const updateData: Partial<Project> = {
//           ...editData,
//           image: editData.image || "",
//         };
//         console.log("editingProject", editingProject?._id);

//         console.log("updateData", updateData);

//         dispatch(updateProject({ id: editingProject._id, data: updateData }));
//         dispatch(getProjects());
//         toast.success("Project updated successfully");
//       } else {
//         // Create new project
//         dispatch(createProject(editData));
//         dispatch(getProjects());
//         toast.success("Project created successfully");
//       }
//       setEditingProject(null);
//       setEditData({});
//       setIsDialogOpen(false);
//       setUploadError(null);
//     } catch (err) {
//       toast.error("Failed to save project. Please try again.");
//     }
//   };

//   const handleCancel = () => {
//     setEditingProject(null);
//     setEditData({});
//     setIsDialogOpen(false);
//     setUploadError(null);
//   };

//   const handleEdit = (project: Project) => {
//     setEditingProject(project);
//     setEditData(project);
//     setIsDialogOpen(true);
//     setUploadError(null);
//   };

//   const handleAddNew = () => {
//     setEditingProject(null);
//     setEditData({});
//     setIsDialogOpen(true);
//     setUploadError(null);
//   };

//   const handleDelete = async (project: Project) => {
//     try {
//       const res = await axios.delete(`/api/project`, {
//         data: { id: project._id },
//       });
//       console.log("res", res);

//       if (res.status === 200) {
//         dispatch(getProjects());
//         toast.success("Project deleted successfully");
//       }
//     } catch (err) {
//       toast.error("Failed to delete project. Please try again.");
//     }
//   };

//   const safeProjects = Array.isArray(projects) ? projects : [];

//   return (
//     <div className="space-y-8">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold ">Projects Management</h1>
//           <p className="text-gray-600">Manage your portfolio projects</p>
//         </div>
//         <Button onClick={handleAddNew} className="w-full sm:w-auto">
//           <Plus size={16} /> Add New Project
//         </Button>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : safeProjects.length === 0 ? (
//           <div className="col-span-full text-center py-12">
//             <div className="text-5xl mb-4">📁</div>
//             <h3 className="text-xl font-medium  mb-2">No projects yet</h3>
//             <p className="text-gray-500 mb-4">
//               Add your first project to get started.
//             </p>
//             <Button onClick={handleAddNew}>
//               <Plus size={16} /> Add First Project
//             </Button>
//           </div>
//         ) : (
//           safeProjects.map((project) => (
//             <Card key={project._id} className="p-5 border">
//               {/* image */}
//               <img
//                 src={project.image}
//                 alt={project.title}
//                 className="w-full h-40 object-cover rounded-lg mb-4"
//               />
//               <h3 className="text-lg font-semibold  mb-1 line-clamp-2">
//                 {project.title}
//               </h3>
//               <p className="text-sm  mb-3 line-clamp-3">
//                 {project.description}
//               </p>
//               <div className="flex flex-wrap gap-2 mb-3">
//                 {project.technologies?.map((tech: string) => (
//                   <span
//                     key={tech}
//                     className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded"
//                   >
//                     {tech}
//                   </span>
//                 ))}
//               </div>
//               <div className="flex gap-3 text-xs text-gray-600 mb-3">
//                 {project.liveUrl && (
//                   <a
//                     href={project.liveUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="hover:text-indigo-600 flex items-center gap-1 text-white"
//                   >
//                     <ExternalLink size={12} /> Live
//                   </a>
//                 )}
//                 {project.githubUrl && (
//                   <a
//                     href={project.githubUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="hover:text-indigo-600 flex items-center gap-1 text-white"
//                   >
//                     <Github size={12} /> Code
//                   </a>
//                 )}
//               </div>

//               <div className="flex gap-2">
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   onClick={() => handleEdit(project)}
//                   className="flex-1"
//                 >
//                   <Edit size={14} /> Edit
//                 </Button>
//                 <Button
//                   size="sm"
//                   variant="secondary"
//                   onClick={() => handleDelete(project)}
//                   className="flex-1 bg-red-700 hover:bg-red-600"
//                 >
//                   <Trash2 size={14} /> Delete
//                 </Button>
//               </div>
//             </Card>
//           ))
//         )}
//       </div>

//       <Dialog
//         open={isDialogOpen}
//         onOpenChange={(open) => !open && handleCancel()}
//       >
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>{editingProject ? "Edit" : "Add"} Project</DialogTitle>
//             <DialogDescription>Update your project details.</DialogDescription>
//           </DialogHeader>

//           <div className="space-y-4">
//             <input
//               type="text"
//               placeholder="Title"
//               value={editData.title || ""}
//               onChange={(e) =>
//                 setEditData({ ...editData, title: e.target.value })
//               }
//               className="w-full border p-2 rounded text-sm"
//               disabled={uploading}
//             />

//             <textarea
//               placeholder="Description"
//               value={editData.description || ""}
//               onChange={(e) =>
//                 setEditData({ ...editData, description: e.target.value })
//               }
//               rows={4}
//               className="w-full border p-2 rounded text-sm"
//               disabled={uploading}
//             />

//             <input
//               type="url"
//               placeholder="Live URL"
//               value={editData.liveUrl || ""}
//               onChange={(e) =>
//                 setEditData({ ...editData, liveUrl: e.target.value })
//               }
//               className="w-full border p-2 rounded text-sm"
//               disabled={uploading}
//             />

//             <input
//               type="url"
//               placeholder="GitHub URL"
//               value={editData.githubUrl || ""}
//               onChange={(e) =>
//                 setEditData({ ...editData, githubUrl: e.target.value })
//               }
//               className="w-full border p-2 rounded text-sm"
//               disabled={uploading}
//             />

//             <input
//               type="text"
//               placeholder="Technologies (comma separated)"
//               value={editData.technologies?.join(", ") || ""}
//               onChange={(e) =>
//                 setEditData({
//                   ...editData,
//                   technologies: e.target.value
//                     .split(",")
//                     .map((t) => t.trim())
//                     .filter((t) => t),
//                 })
//               }
//               className="w-full border p-2 rounded text-sm"
//               disabled={uploading}
//             />

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Project Image
//               </label>

//               <div className="space-y-3">
//                 {/* Preview image with remove button */}
//                 {editData.image && (
//                   <div className="relative">
//                     <Image
//                       src={editData.image}
//                       alt="Project preview"
//                       width={200}
//                       height={200}
//                       className="w-full h-48 object-cover rounded-lg border border-gray-300"
//                     />
//                     <button
//                       type="button"
//                       aria-label="Remove project image"
//                       onClick={() => setEditData({ ...editData, image: "" })}
//                       className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                       disabled={uploading}
//                     >
//                       <X size={16} />
//                     </button>
//                   </div>
//                 )}

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   {/* File upload input */}
//                   <div>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={async (e) => {
//                         const file = e.target.files?.[0];
//                         if (!file) return;

//                         setUploading(true);
//                         setUploadError(null);

//                         const toBase64 = (file: File): Promise<string> =>
//                           new Promise((resolve, reject) => {
//                             const reader = new FileReader();
//                             reader.readAsDataURL(file);
//                             reader.onload = () => {
//                               const base64String = (
//                                 reader.result as string
//                               ).split(",")[1];
//                               resolve(base64String);
//                             };
//                             reader.onerror = (error) => reject(error);
//                           });

//                         try {
//                           const base64File = await toBase64(file);
//                           const res = await axios.post("/api/upload", {
//                             file: base64File,
//                           });
//                           const uploadedUrl = res.data.url;
//                           setEditData((prev) => ({
//                             ...prev,
//                             image: uploadedUrl,
//                           }));
//                         } catch (err) {
//                           setUploadError(
//                             "Image upload failed. Please try again."
//                           );
//                         } finally {
//                           setUploading(false);
//                         }
//                       }}
//                       className="hidden"
//                       id={`project-image-${editData._id ?? "new"}`}
//                       disabled={uploading}
//                     />
//                     <label
//                       htmlFor={`project-image-${editData._id ?? "new"}`}
//                       className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 cursor-pointer transition-colors duration-200 text-sm font-medium ${
//                         uploading ? "opacity-50 pointer-events-none" : ""
//                       }`}
//                     >
//                       <Upload size={16} />
//                       {uploading ? "Uploading…" : "Upload Image"}
//                     </label>
//                   </div>

//                   {/* URL input for image */}
//                   <input
//                     type="url"
//                     value={editData.image || ""}
//                     onChange={(e) =>
//                       setEditData({ ...editData, image: e.target.value })
//                     }
//                     placeholder="Or paste image URL"
//                     className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
//                     disabled={uploading}
//                   />
//                 </div>

//                 {/* Upload error message */}
//                 {uploadError && (
//                   <p className="text-red-500 text-xs mt-1">{uploadError}</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           <DialogFooter className="pt-4 flex justify-end gap-2">
//             <Button
//               variant="outline"
//               onClick={handleCancel}
//               disabled={uploading}
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleSave}
//               disabled={
//                 uploading || !editData.title || editData.title.trim() === ""
//               }
//             >
//               <Save size={16} /> Save
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default AdminProjects;

/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  ExternalLink,
  Github,
  Upload,
  X,
  Loader2,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  createProject,
  getProjects,
  updateProject,
} from "@/lib/storeData/projectSlice";
import Button from "@/util/Button";
import { Card } from "@/util/Card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/util/Dialog";
import { Project } from "../../../types";
import { toast } from "sonner";
import Image from "next/image";

const AdminProjects = () => {
  const dispatch = useAppDispatch();
  const { projects, isLoading } = useAppSelector((state) => state.project);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editData, setEditData] = useState<Partial<Project>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getProjects()).catch(() => {
      toast.error("Failed to load projects");
    });
  }, [dispatch]);

  // console.log();


  const handleSave = async () => {
    if (!editData.title || editData.title.trim() === "") {
      toast.error("Project title cannot be empty");
      return;
    }

    try {
      if (editingProject && editingProject._id) {
        const updateData: Partial<Project> = {
          ...editData,
          image: editData.image || "",
        };
        await dispatch(
          updateProject({ id: editingProject._id, data: updateData })
        );
        toast.success("Project updated successfully");
      } else {
        await dispatch(createProject(editData as Project));
        toast.success("Project created successfully");
      }
      await dispatch(getProjects());
      handleCancel();
    } catch (err) {
      toast.error("Failed to save project. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditingProject(null);
    setEditData({});
    setIsDialogOpen(false);
    setUploadError(null);
    setUploading(false);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setEditData(project);
    setIsDialogOpen(true);
    setUploadError(null);
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setEditData({});
    setIsDialogOpen(true);
    setUploadError(null);
  };

  const handleDelete = async (project: Project) => {
    setDeletingId(project._id);
    try {
      const res = await axios.delete(`/api/project`, {
        data: { id: project._id },
      });

      if (res.status === 200) {
        await dispatch(getProjects());
        toast.success("Project deleted successfully");
      }
    } catch (err) {
      toast.error("Failed to delete project. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const safeProjects = Array.isArray(projects) ? projects : [];

  const ProjectSkeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card
          key={i}
          className="p-6 rounded-xl border border-neutral-800 bg-gradient-to-br from-neutral-900/70 to-neutral-900 animate-pulse"
        >
          <div className="w-full h-40 bg-neutral-800 rounded-lg mb-4"></div>
          <div className="h-5 bg-neutral-800 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-neutral-800 rounded w-5/6 mb-4"></div>
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="w-12 h-5 bg-neutral-800 rounded-full"></div>
            <div className="w-16 h-5 bg-neutral-800 rounded-full"></div>
          </div>
          <div className="flex justify-between mt-auto">
            <div className="h-8 bg-neutral-800 rounded-lg w-20"></div>
            <div className="h-8 bg-neutral-800 rounded-lg w-20"></div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6 lg:space-y-8 p-4">
      <div className="">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold  mb-2">
              Projects Management
            </h1>
            <p className="text-gray-600">
              Manage your portfolio projects with precision
            </p>
          </div>
          <Button
            onClick={handleAddNew}
            className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 px-8 py-3 text-lg font-semibold rounded-xl"
          >
            <Plus
              size={20}
              className="group-hover:rotate-90 transition-transform mr-2"
            />
            Add New Project
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {isLoading ? (
            <ProjectSkeleton />
          ) : safeProjects.length === 0 ? (
            <div className="col-span-full text-center py-24">
              <div className="w-24 h-24 mx-auto mb-8 p-6 bg-neutral-900/50 rounded-2xl border-2 border-dashed border-neutral-700">
                <div className="text-4xl">📁</div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-200 mb-4">
                No projects yet
              </h3>
              <p className="text-xl text-neutral-500 mb-8 max-w-md mx-auto">
                Add your first project to showcase your amazing work
              </p>
              <Button
                onClick={handleAddNew}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 px-10 py-4 text-lg font-semibold rounded-xl"
              >
                <Plus size={20} className="mr-2" />
                Add First Project
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {safeProjects.map((project) => (
                <Card
                  key={project._id}
                  className="group relative p-8 border border-neutral-800/50 bg-neutral-900/60 backdrop-blur-sm rounded-2xl hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transform hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                >
                  {/* Card Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg backdrop-blur-sm border border-white/20">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-3.5 h-3.5 text-yellow-300"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-xs font-bold text-white">Featured</span>
                      </div>
                    </div>
                  )}

                  {/* Project Image */}
                  <div className="relative mb-6">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-xl border-2 border-neutral-800/50 group-hover:border-indigo-500/30 transition-all duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-neutral-100 mb-3 line-clamp-1 group-hover:text-indigo-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies?.map((tech: string) => (
                        <span
                          key={tech}
                          className="text-xs bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-indigo-500/30 text-indigo-300 px-3 py-1.5 rounded-full font-medium hover:from-indigo-600/30 hover:to-purple-600/30 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 text-xs text-neutral-500 mb-10">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link flex items-center gap-2 hover:text-emerald-400 transition-colors duration-300 font-medium"
                        >
                          <ExternalLink size={14} />
                          Live
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link flex items-center gap-2 hover:text-indigo-400 transition-colors duration-300 font-medium"
                        >
                          <Github size={14} />
                          Code
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute bottom-6 left-6 right-6 flex gap-3 ">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(project)}
                      className="flex-1 bg-neutral-900/80 backdrop-blur-sm border-neutral-700/50 hover:bg-neutral-800/50 hover:border-neutral-600/50 text-neutral-200 hover:text-neutral-100 font-medium transition-all duration-300 rounded-xl border px-4 py-2.5"
                      disabled={deletingId === project._id}
                    >
                      <Edit size={16} className="mr-2" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDelete(project)}
                      className="flex-1 bg-gradient-to-r from-red-600/90 to-red-700/90 backdrop-blur-sm hover:from-red-700/90 hover:to-red-800/90 shadow-lg hover:shadow-red-500/25 transform hover:-translate-y-0.5 transition-all duration-300 font-medium rounded-xl px-4 py-2.5 text-white"
                      disabled={deletingId === project._id}
                    >
                      {deletingId === project._id ? (
                        <Loader2 size={16} className="mr-2 animate-spin" />
                      ) : (
                        <Trash2 size={16} className="mr-2" />
                      )}
                      {deletingId === project._id ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => !open && handleCancel()}
      >
        <DialogContent className="max-w-4xl p-0 bg-neutral-900/95 backdrop-blur-xl border-neutral-800/50 rounded-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="p-8 pb-6 border-b border-neutral-800/50">
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {editingProject ? "Edit Project" : "Add New Project"}
            </DialogTitle>
            <DialogDescription className="text-lg text-neutral-400 mt-2">
              {editingProject
                ? "Update your project details below"
                : "Create a new portfolio project"}
            </DialogDescription>
          </DialogHeader>

          <div className="p-8 grid grid-cols-1 xl:grid-cols-2 gap-12">
            {/* Form Fields */}
            <div className="space-y-8">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-neutral-300 mb-3">
                  Project Title
                </label>
                <input
                  type="text"
                  placeholder="Enter project title"
                  value={editData.title || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  className="w-full bg-neutral-900/80 backdrop-blur-sm border border-neutral-700/50 focus:border-indigo-500/70 focus:ring-4 focus:ring-indigo-500/20 text-lg px-5 py-4 rounded-xl transition-all duration-300 placeholder-neutral-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={uploading}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-neutral-300 mb-3">
                  Description
                </label>
                <textarea
                  placeholder="Describe your project..."
                  value={editData.description || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  rows={5}
                  className="w-full bg-neutral-900/80 backdrop-blur-sm border border-neutral-700/50 focus:border-indigo-500/70 focus:ring-4 focus:ring-indigo-500/20 resize-vertical text-lg px-5 py-4 rounded-xl transition-all duration-300 placeholder-neutral-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  disabled={uploading}
                />
                <p className="text-xs text-neutral-500 mt-2">
                  Max 200 characters recommended
                </p>
              </div>

              {/* Links */}
              <div>
                <label className="block text-sm font-semibold text-neutral-300 mb-3">
                  Links
                </label>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-neutral-500 mb-2 flex items-center gap-2">
                      <ExternalLink size={14} className="text-emerald-400" />
                      Live URL (optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://your-project-url.com"
                      value={editData.liveUrl || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, liveUrl: e.target.value })
                      }
                      className="w-full bg-neutral-900/80 backdrop-blur-sm border border-neutral-700/50 focus:border-emerald-500/70 focus:ring-4 focus:ring-emerald-500/20 px-5 py-4 rounded-xl transition-all duration-300 placeholder-neutral-500 disabled:opacity-50"
                      disabled={uploading}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-500 mb-2 flex items-center gap-2">
                      <Github size={14} className="text-indigo-400" />
                      GitHub URL (optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/username/repo"
                      value={editData.githubUrl || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, githubUrl: e.target.value })
                      }
                      className="w-full bg-neutral-900/80 backdrop-blur-sm border border-neutral-700/50 focus:border-indigo-500/70 focus:ring-4 focus:ring-indigo-500/20 px-5 py-4 rounded-xl transition-all duration-300 placeholder-neutral-500 disabled:opacity-50"
                      disabled={uploading}
                    />
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-sm font-semibold text-neutral-300 mb-3">
                  Technologies
                </label>
                <input
                  type="text"
                  placeholder="React, Next.js, Tailwind, TypeScript"
                  value={
                    Array.isArray(editData.technologies)
                      ? editData.technologies.join(", ")
                      : ""
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    const techs = value
                      .split(",")
                      .map((t) => t.trim())
                      .filter((t) => t.length > 0);
                    setEditData({
                      ...editData,
                      technologies: techs,
                    });
                  }}
                  className="w-full bg-neutral-900/80 backdrop-blur-sm border border-neutral-700/50 focus:border-purple-500/70 focus:ring-4 focus:ring-purple-500/20 px-5 py-4 rounded-xl transition-all duration-300 placeholder-neutral-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={uploading}
                />
                <p className="text-xs text-neutral-500 mt-2">
                  Separate technologies with commas (e.g., React, Next.js, MongoDB)
                </p>
                {editData.technologies && editData.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {editData.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 text-purple-300 px-3 py-1.5 rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-300 mb-4">
                  Project Image
                </label>
                <p className="text-xs text-neutral-500 mb-6">
                  Recommended: 1200x600px, Max 5MB (JPG, PNG, WebP)
                </p>

                {/* Image Preview */}
                {editData.image && (
                  <div className="relative group mb-6">
                    <Image
                      src={editData.image}
                      alt="Project preview"
                      width={400}
                      height={200}
                      className="w-full h-52 object-cover rounded-2xl border-2 border-neutral-700/50 shadow-2xl"
                    />
                    <button
                      type="button"
                      aria-label="Remove project image"
                      onClick={() => setEditData({ ...editData, image: "" })}
                      className="absolute -top-3 -right-3 p-2 bg-red-500/90 backdrop-blur-sm text-white rounded-2xl hover:bg-red-600/90 shadow-2xl transform hover:scale-110 transition-all duration-300 border-2 border-white/20"
                      disabled={uploading}
                    >
                      <X size={18} />
                    </button>
                  </div>
                )}

                {/* Upload Controls */}
                <div className="grid grid-cols-1 gap-4">
                  {/* File Upload */}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        setUploading(true);
                        setUploadError(null);

                        const toBase64 = (file: File): Promise<string> =>
                          new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => {
                              const base64String = (
                                reader.result as string
                              ).split(",")[1];
                              resolve(base64String);
                            };
                            reader.onerror = (error) => reject(error);
                          });

                        try {
                          const base64File = await toBase64(file);
                          const res = await axios.post("/api/upload", {
                            file: base64File,
                          });
                          const uploadedUrl = res.data.url;
                          setEditData((prev) => ({
                            ...prev,
                            image: uploadedUrl,
                          }));
                        } catch (err) {
                          setUploadError(
                            "Image upload failed. Please try again."
                          );
                        } finally {
                          setUploading(false);
                        }
                      }}
                      className="hidden"
                      id="project-image-upload"
                      disabled={uploading}
                    />
                    <label
                      htmlFor="project-image-upload"
                      className={`w-full flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-neutral-700/50 rounded-2xl text-center transition-all duration-300 cursor-pointer group ${uploading
                        ? "bg-neutral-900/50 border-neutral-600/30 opacity-50 cursor-not-allowed"
                        : "hover:border-indigo-500/60 hover:bg-indigo-500/5"
                        }`}
                    >
                      <Upload
                        size={28}
                        className={`transition-transform duration-300 ${uploading
                          ? ""
                          : "group-hover:rotate-12 group-hover:scale-110"
                          }`}
                      />
                      <div>
                        <p className="font-semibold text-neutral-200 text-lg">
                          {uploading ? "Uploading..." : "Click to upload"}
                        </p>
                        <p className="text-neutral-500 text-sm mt-1">
                          Drag & drop or click to select
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* URL Input */}
                  <div>
                    <label className="block text-xs text-neutral-500 mb-2">
                      Or paste image URL
                    </label>
                    <input
                      type="url"
                      value={editData.image || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, image: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg"
                      className="w-full bg-neutral-900/80 backdrop-blur-sm border border-neutral-700/50 focus:border-indigo-500/70 focus:ring-4 focus:ring-indigo-500/20 px-5 py-4 rounded-xl transition-all duration-300 placeholder-neutral-500 text-sm disabled:opacity-50"
                      disabled={uploading}
                    />
                  </div>

                  {/* Featured Toggle */}
                  <div className="pt-4 border-t border-neutral-800/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block text-sm font-semibold text-neutral-300 mb-1">
                          Featured Project
                        </label>
                        <p className="text-xs text-neutral-500">
                          Highlight this project on your portfolio
                        </p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={editData.featured || false}
                        onClick={() =>
                          setEditData({
                            ...editData,
                            featured: !editData.featured,
                          })
                        }
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/20 ${editData.featured
                          ? "bg-gradient-to-r from-purple-600 to-pink-600"
                          : "bg-neutral-700/50"
                          }`}
                        disabled={uploading}
                      >
                        <span
                          className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${editData.featured ? "translate-x-7" : "translate-x-1"
                            }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Error */}
                {uploadError && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <p className="text-red-400 text-sm">{uploadError}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="p-8 pt-0 border-t border-neutral-800/50 bg-neutral-900/50 backdrop-blur-sm rounded-b-2xl">
            <div className="flex w-full justify-end gap-4">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="px-8 py-3 bg-neutral-900/80 backdrop-blur-sm border-neutral-700/50 hover:bg-neutral-800/50 hover:border-neutral-600/50 text-neutral-200 font-semibold transition-all duration-300 rounded-xl"
                disabled={uploading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={
                  uploading || !editData.title || editData.title.trim() === ""
                }
                className="px-10 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 font-semibold text-lg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {uploading ? (
                  <>
                    <Loader2 size={20} className="mr-3 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={20} className="mr-3" />
                    Save Project
                  </>
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProjects;
