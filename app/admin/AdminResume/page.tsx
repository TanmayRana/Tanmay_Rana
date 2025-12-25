"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  FileText,
  UploadCloud,
  XCircle,
  ImageIcon,
  Download,
  Loader2,
  Trash2,
  CheckCircle2,
  Eye,
} from "lucide-react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getResume, uploadResume } from "@/lib/storeData/resumeSlice";
import Button from "@/util/Button";

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const validateFile = (file: File) => {
  if (file.type !== "application/pdf" && !file.type.startsWith("image/")) {
    return "Only PDF or image files are allowed.";
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `File size exceeds ${MAX_FILE_SIZE_MB}MB limit.`;
  }
  return "";
};

const AdminResume = () => {
  const dispatch = useAppDispatch();
  const { resumeUrl, isLoading } = useAppSelector((state) => state.resume);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isImage, setIsImage] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(getResume()).catch(() => {
      toast.error("Failed to load resume");
    });
  }, [dispatch]);

  useEffect(() => {
    if (resumeUrl) {
      setIsImage(resumeUrl.match(/\.(jpeg|jpg|png|gif|webp|svg)$/i) !== null);
    }
  }, [resumeUrl]);

  // console.log("resumeUrl", resumeUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        toast.error(validationError);
        resetState();
      } else {
        setError("");
        setSelectedFile(file);
        const isImg = file.type.startsWith("image/");
        setIsImage(isImg);
        setLocalPreview(isImg ? URL.createObjectURL(file) : null);
      }
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        toast.error(validationError);
        resetState();
      } else {
        setError("");
        setSelectedFile(file);
        const isImg = file.type.startsWith("image/");
        setIsImage(isImg);
        setLocalPreview(isImg ? URL.createObjectURL(file) : null);
      }
    }
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const resetState = () => {
    setSelectedFile(null);
    setLocalPreview(null);
    setError("");
    setIsDragging(false);
    setIsImage(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file to upload.");
      toast.error("Please select a file to upload.");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const toBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const base64String = (reader.result as string).split(",")[1];
            resolve(base64String);
          };
          reader.onerror = (error) => reject(error);
        });

      const base64File = await toBase64(selectedFile);
      const res = await axios.post("/api/upload", {
        file: base64File,
      });

      const uploadedUrl = res.data.url;
      if (uploadedUrl) {
        await dispatch(uploadResume(uploadedUrl));
        toast.success("Resume uploaded successfully!");
        resetState();
      }
    } catch (uploadError) {
      console.error("Upload failed:", uploadError);
      setError("Failed to upload file. Please try again.");
      toast.error("Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    resetState();
  };

  const handleDownload = () => {
    if (resumeUrl) {
      window.open(resumeUrl, "_blank");
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(uploadResume(""));
      toast.success("Resume deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete resume");
    }
  };

  return (
    <div className="space-y-8 p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            Resume Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload and manage your resume (PDF or Image, max {MAX_FILE_SIZE_MB}
            MB)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div className="glass-card p-8 rounded-2xl border border-neutral-800/50 bg-neutral-900/60 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-neutral-100 mb-6">
              Upload New Resume
            </h2>

            {/* Drop Zone */}
            <div
              className={`relative mb-6 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-12 cursor-pointer transition-all duration-300 ${isDragging
                ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20 scale-[1.02]"
                : "border-neutral-700/50 bg-neutral-900/40 hover:border-purple-500/50 hover:bg-purple-500/5"
                }`}
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              aria-label="File drop zone"
            >
              <UploadCloud
                className={`w-16 h-16 mb-4 transition-all duration-300 ${isDragging
                  ? "text-purple-400 scale-110"
                  : "text-purple-500/70"
                  }`}
              />
              <p className="text-center text-neutral-200 font-semibold text-lg mb-2">
                Drag & drop your resume here
              </p>
              <p className="text-center text-neutral-500 text-sm">
                or click to browse files
              </p>
              <p className="text-center text-neutral-600 text-xs mt-3">
                Supports PDF and Image files (max {MAX_FILE_SIZE_MB}MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </div>

            {/* Selected File Preview */}
            {selectedFile && (
              <div className="mb-6 flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl backdrop-blur-sm">
                {isImage ? (
                  <ImageIcon className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                ) : (
                  <FileText className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                )}
                <div className="flex flex-col flex-grow min-w-0">
                  <p
                    className="font-medium truncate text-emerald-100"
                    title={selectedFile.name}
                  >
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-emerald-300/70">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  className="text-red-400 hover:text-red-300 transition-colors flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    resetState();
                  }}
                  aria-label="Remove selected file"
                  type="button"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            )}

            {/* Local Preview */}
            {localPreview && isImage && (
              <div className="mb-6 rounded-xl overflow-hidden border-2 border-neutral-700/50">
                <div className="relative w-full aspect-[4/3] bg-neutral-800">
                  <Image
                    src={localPreview}
                    alt="Selected File Preview"
                    fill
                    sizes="(max-width: 600px) 100vw, 600px"
                    className="object-contain"
                    priority={false}
                    draggable={false}
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
                <XCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="px-6 py-3 bg-neutral-900/80 backdrop-blur-sm border-neutral-700/50 hover:bg-neutral-800/50 text-neutral-200 font-medium transition-all duration-300 rounded-xl"
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || !!error || isUploading}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-5 h-5 mr-2" />
                    Upload Resume
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Current Resume Section */}
        <div className="space-y-6">
          <div className="glass-card p-8 rounded-2xl border border-neutral-800/50 bg-neutral-900/60 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-neutral-100">
                Current Resume
              </h2>
              <Button
                variant="outline"
                onClick={() => {
                  if (resumeUrl) {
                    window.open(resumeUrl, '_blank');
                  }
                }}
                className="px-6 py-3 bg-neutral-900/80 backdrop-blur-sm border-neutral-700/50 hover:bg-neutral-800/50 text-neutral-200 font-medium transition-all duration-300 rounded-xl cursor-pointer"
                disabled={!resumeUrl}
              >
                <Eye className="w-5 h-5 mr-2" /> Preview
              </Button>
            </div>


            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
                <p className="text-neutral-400">Loading resume...</p>
              </div>
            ) : resumeUrl ? (
              <div className="space-y-6">
                {/* Preview */}
                <div className="rounded-xl overflow-hidden border-2 border-neutral-700/50 bg-neutral-800/50">
                  {isImage ? (
                    <div className="relative w-full aspect-[4/3] bg-neutral-800 flex items-center justify-center">
                      <iframe
                        src={resumeUrl}
                        // alt="Current Resume"
                        className="w-full h-full object-contain"
                        draggable={false}
                        onError={(e) => {
                          console.error("Image failed to load:", resumeUrl);
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-12 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                      <FileText className="w-20 h-20 text-blue-400 mb-4" />
                      <span className="font-semibold text-blue-300 text-lg">
                        PDF Resume Uploaded
                      </span>
                      <span className="text-neutral-500 text-sm mt-2">
                        Click download to view
                      </span>
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-300 font-medium">
                    Resume is active and visible
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleDownload}
                    className="cursor-pointer flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 font-medium rounded-xl"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download
                  </Button>
                  <Button
                    onClick={handleDelete}
                    variant="outline"
                    className="cursor-pointer px-6 py-3 bg-red-500/10 border-red-500/30 hover:bg-red-500/20 text-red-400 hover:text-red-300 font-medium transition-all duration-300 rounded-xl"
                  >
                    <Trash2 className="w-5 h-5 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 mb-6 p-5 bg-neutral-800/50 rounded-2xl border-2 border-dashed border-neutral-700">
                  <FileText className="w-full h-full text-neutral-600" />
                </div>
                <h3 className="text-xl font-bold text-neutral-300 mb-2">
                  No Resume Uploaded
                </h3>
                <p className="text-neutral-500 max-w-sm">
                  Upload your resume using the form on the left to make it
                  available for download
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
};

export default AdminResume;
