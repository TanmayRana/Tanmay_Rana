"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Plus,
  Edit,
  Trash2,
  Award,
  ExternalLink,
  Upload,
  Calendar,
  Link as LinkIcon,
  Star,
  FileText,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Certification } from "../../../types";
import { Button as UIButton } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  fetchCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from "@/lib/storeData/certificationSlice";
import axios from "axios";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

// Extended interface to include new fields
interface CertificationExtended extends Omit<Certification, "_id"> {
  _id?: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  description: string;
  link: string;
  featured: boolean;
}

const AdminCertifications = () => {
  const dispatch = useAppDispatch();
  const { certifications, loading } = useAppSelector(
    (state) => state.certifications
  );

  const [editingCert, setEditingCert] = useState<CertificationExtended | null>(
    null
  );
  // Initialize with default values for all fields
  const [editData, setEditData] = useState<Partial<CertificationExtended>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    dispatch(fetchCertifications())
      .unwrap()
      .catch(() => toast.error("Failed to load certifications"));
  }, [dispatch]);

  const handleEdit = (cert: Certification) => {
    // Cast to Extended to ensure TS is happy with potential missing fields from older data
    const extendedCert = {
      ...cert,
      description: cert.description || "",
      link: cert.link || "",
      featured: cert.featured || false,
    } as CertificationExtended;

    setEditingCert(extendedCert);
    setEditData(extendedCert);
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    setEditingCert(null);
    setEditData({});
    setIsDialogOpen(false);
  };

  const handleSave = async () => {
    const {
      title,
      issuer,
      date,
      credentialUrl,
      description,
      link,
      featured,
    } = editData;

    if (!title || !issuer || !date) {
      toast.warning("Please fill in title, issuer, and date");
      return;
    }

    const certData = {
      title,
      issuer,
      date,
      credentialUrl: credentialUrl || "",
      description: description || "",
      link: link || "",
      featured: featured || false,
    };

    try {
      if (!editingCert?._id) {
        await dispatch(createCertification(certData as Certification)).unwrap();
        toast.success("Certification created successfully");
      } else {
        await dispatch(
          updateCertification({
            _id: editingCert._id,
            ...certData,
          })
        ).unwrap();
        toast.success("Certification updated successfully");
      }
      // Refresh list
      dispatch(fetchCertifications());
      handleCancel();
    } catch (err) {
      toast.error("Failed to save certification");
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteCertification(id)).unwrap();
      toast.success("Certification deleted successfully");
    } catch {
      toast.error("Failed to delete certification");
    }
  };

  const handleAddNew = () => {
    setEditingCert(null);
    setEditData({
      title: "",
      issuer: "",
      date: new Date().getFullYear().toString(),
      credentialUrl: "",
      description: "",
      link: "",
      featured: false,
    });
    setIsDialogOpen(true);
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = (error) => reject(error);
    });

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      const base64File = await toBase64(file);
      const res = await axios.post("/api/upload", { file: base64File });
      return res.data.url as string;
    } catch (err) {
      console.error("Image upload failed:", err);
      toast.error("Image upload failed");
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8 p-6 lg:p-10 min-h-screen text-foreground">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-600 mb-2">
            Certifications
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your professional achievements and badges
          </p>
        </div>
        <UIButton
          onClick={handleAddNew}
          disabled={loading}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:scale-105"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New Certification
        </UIButton>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
        </div>
      )}

      {/* Empty State */}
      {!loading && certifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center glass-card rounded-3xl border border-border p-12 bg-card/50">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
            <Award className="w-10 h-10 text-emerald-500" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            No Certifications Yet
          </h3>
          <p className="text-muted-foreground max-w-sm mb-8">
            Start building your portfolio by adding your first professional
            certification.
          </p>
          <UIButton onClick={handleAddNew} variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Certification
          </UIButton>
        </div>
      )}

      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {certifications.map((cert: Certification) => (
            <motion.div
              key={cert._id || cert.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="group relative"
            >
              <div className="h-full glass-card bg-card/40 backdrop-blur-xl border border-border rounded-2xl p-6 hover:border-emerald-500/30 hover:bg-card/60 transition-all duration-300 flex flex-col shadow-sm">
                {/* Featured Badge */}
                {cert.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-500" />
                      Featured
                    </div>
                  </div>
                )}

                {/* Header with Icon/Image */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    {cert.credentialUrl ? (
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-border bg-background">
                        {cert.credentialUrl && (
                          <Image
                            src={cert.credentialUrl}
                            alt={cert.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl border border-border bg-emerald-500/10 flex items-center justify-center">
                        <Award className="w-8 h-8 text-emerald-500" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground line-clamp-2 leading-tight mb-1">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-emerald-500 font-medium">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-grow space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{cert.date}</span>
                  </div>

                  {cert.description && (
                    <p className="text-sm text-muted-foreground/80 line-clamp-3">
                      {cert.description}
                    </p>
                  )}

                  <div className="flex gap-2 flex-wrap">
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Verify
                      </a>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-border flex gap-2">
                  <UIButton
                    variant="ghost"
                    size="sm"
                    className="flex-1 hover:bg-background/50 hover:text-emerald-500"
                    onClick={() => handleEdit(cert)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </UIButton>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <UIButton
                        variant="ghost"
                        size="sm"
                        className="flex-1 hover:bg-red-500/10 hover:text-red-500 text-muted-foreground"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </UIButton>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-card border-border">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Certification</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete <span className="font-semibold text-foreground">{cert.title}</span>?
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-transparent border-border hover:bg-card">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => cert._id && handleDelete(cert._id)}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-card/95 backdrop-blur-xl border-border text-foreground p-0 overflow-hidden gap-0">
          <DialogHeader className="p-6 border-b border-border bg-card/50">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              {editingCert ? (
                <>
                  <Edit className="w-5 h-5 text-emerald-500" />
                  Edit Certification
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 text-emerald-500" />
                  Add New Certification
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Fill in the details for your professional certification.
            </DialogDescription>
          </DialogHeader>

          <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {/* Image Upload */}
            <div className="flex justify-center mb-6">
              <div
                className={cn(
                  "relative group cursor-pointer w-full h-40 rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center overflow-hidden",
                  editData.credentialUrl
                    ? "border-emerald-500/50 bg-card"
                    : "border-border hover:border-emerald-500/50 hover:bg-card/50"
                )}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      await handleFileUpload(file).then((url) => {
                        setEditData((prev) => ({ ...prev, credentialUrl: url }));
                        toast.success("Image uploaded successfully");
                      });
                    }
                  }}
                  disabled={uploading}
                />

                {uploading ? (
                  <div className="flex flex-col items-center gap-2 text-emerald-500">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span className="text-sm font-medium">Uploading...</span>
                  </div>
                ) : editData.credentialUrl ? (
                  <>
                    <Image
                      src={editData.credentialUrl}
                      alt="Preview"
                      fill
                      className="object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <div className="bg-black/60 px-4 py-2 rounded-full text-white text-sm font-medium flex items-center gap-2">
                        <Upload className="w-4 h-4" /> Change Image
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-emerald-500 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <Upload className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium">Click to upload badge</span>
                  </div>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Certification Title
                </label>
                <div className="relative">
                  <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    className="w-full bg-background border border-border rounded-lg py-2.5 pl-10 pr-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                    placeholder="e.g. AWS Certified Solutions Architect"
                    value={editData.title || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Issuer
                </label>
                <div className="relative">
                  <CheckCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    className="w-full bg-background border border-border rounded-lg py-2.5 pl-10 pr-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                    placeholder="e.g. Amazon"
                    value={editData.issuer || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, issuer: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="month"
                    className="w-full bg-background border border-border rounded-lg py-2.5 pl-10 pr-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all [color-scheme:dark]"
                    value={editData.date || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, date: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2 col-span-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Verification Link
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    className="w-full bg-background border border-border rounded-lg py-2.5 pl-10 pr-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                    placeholder="https://..."
                    value={editData.link || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, link: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2 col-span-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Description
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <textarea
                    className="w-full bg-background border border-border rounded-lg py-2.5 pl-10 pr-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all min-h-[100px] resize-none"
                    placeholder="Brief description of the certification..."
                    value={editData.description || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Featured Toggle */}
              <div className="col-span-2 pt-2">
                <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card cursor-pointer hover:bg-card/80 transition-colors group">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-border bg-background text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
                    checked={editData.featured || false}
                    onChange={(e) =>
                      setEditData({ ...editData, featured: e.target.checked })
                    }
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Star className={cn("w-4 h-4", editData.featured ? "fill-amber-400 text-amber-400" : "text-muted-foreground")} />
                      Mark as Featured
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Featured certifications appear on your main profile highlights
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <DialogFooter className="p-6 border-t border-border bg-card/50">
            <UIButton
              variant="ghost"
              onClick={handleCancel}
              className="hover:bg-background text-muted-foreground hover:text-foreground"
            >
              Cancel
            </UIButton>
            <UIButton
              onClick={handleSave}
              disabled={loading || uploading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[100px]"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
            </UIButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCertifications;
