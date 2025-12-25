/* eslint-disable @next/next/no-img-element */
// import React, { useState } from "react";
// import { PlusOutlined } from "@ant-design/icons";
// import { Image, Upload, message } from "antd";
// import type { GetProp, UploadFile, UploadProps } from "antd";

// type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

// const getBase64 = (file: FileType): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });

// const UploadImage: React.FC = ({ uploadImage, setuploadImage }) => {
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [fileList, setFileList] = useState<UploadFile[]>([]);

//   const handlePreview = async (file: UploadFile) => {
//     if (!file.url && !file.preview && file.originFileObj) {
//       file.preview = await getBase64(file.originFileObj as FileType);
//     }
//     setPreviewImage(file.url || (file.preview as string));
//     setPreviewOpen(true);
//   };

//   // Custom upload logic using base64
//   const customRequest = async (options: any) => {
//     const { file, onSuccess, onError } = options;

//     try {
//       const base64 = await getBase64(file);
//       const res = await fetch("/api/upload", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ file: base64 }),
//       });
//       const data = await res.json();
//       console.log("data in customRequest", data);
//       if (res.ok) {
//         onSuccess();
//         setFileList([
//           {
//             uid: file.uid,
//             name: file.name,
//             status: "done",
//             url: data.url,
//           },
//         ]);
//         message.success("Upload successful!");
//       } else {
//         onError(new Error(data.message || "Upload failed"));
//         message.error(data.message || "Upload failed");
//       }
//     } catch (error) {
//       onError(error);
//       message.error("Upload error");
//     }
//   };

//   const handleChange: UploadProps["onChange"] = ({ fileList: flist }) => {
//     // Only keep the latest file in the list
//     setFileList(flist.slice(-1));
//   };

//   const uploadButton = (
//     <button style={{ border: 0, background: "none" }} type="button">
//       <PlusOutlined />
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </button>
//   );

//   return (
//     <>
//       <Upload
//         customRequest={customRequest}
//         listType="picture-card"
//         fileList={fileList}
//         onPreview={handlePreview}
//         onChange={handleChange}
//         maxCount={1}
//         accept="image/*"
//       >
//         {fileList.length >= 1 ? null : uploadButton}
//       </Upload>

//       <Image
//         // width={200}
//         // height={200}
//         wrapperStyle={{ display: "none" }}
//         preview={{
//           visible: previewOpen,
//           onVisibleChange: (visible) => setPreviewOpen(visible),
//           afterOpenChange: (visible) => !visible && setPreviewImage(""),
//         }}
//         src={previewImage}
//       />
//     </>
//   );
// };

// export default UploadImage;

// import React, { useState, useEffect } from "react";
// import { PlusOutlined } from "@ant-design/icons";
// import { Image, Upload, message } from "antd";
// import type { UploadFile, UploadProps } from "antd/lib/upload/interface";
// import { X } from "lucide-react";

// type FileType = Parameters<NonNullable<UploadProps["beforeUpload"]>>[0];

// interface UploadImageProps {
//   uploadImage?: string;
//   setUploadImage: (url: string) => void;
// }

// const getBase64 = (file: FileType): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });

// const UploadImage: React.FC<UploadImageProps> = ({
//   uploadImage,
//   setUploadImage,
// }) => {
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [fileList, setFileList] = useState<UploadFile[]>([]);

//   // Initialize fileList with existing uploadImage if available
//   useEffect(() => {
//     if (uploadImage) {
//       setFileList([
//         {
//           uid: "-1",
//           name: "image.png",
//           status: "done",
//           url: uploadImage,
//         },
//       ]);
//     } else {
//       setFileList([]);
//     }
//   }, [uploadImage]);

//   const handlePreview = async (file: UploadFile) => {
//     if (!file.url && !file.preview && file.originFileObj) {
//       file.preview = await getBase64(file.originFileObj as FileType);
//     }
//     setPreviewImage(file.url || (file.preview as string));
//     setPreviewOpen(true);
//   };

//   // Custom upload logic - simulate uploading and return uploaded image URL
//   const customRequest = async (options: any) => {
//     const { file, onSuccess, onError } = options;
//     try {
//       const base64 = await getBase64(file);

//       // Replace below with your real upload API call if you have one.
//       // Example POST to /api/upload with base64-encoded file:
//       const res = await fetch("/api/upload", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ file: base64 }),
//       });

//       const data = await res.json();

//       if (res.ok && data.url) {
//         setFileList([
//           {
//             uid: file.uid,
//             name: file.name,
//             status: "done",
//             url: data.url,
//           },
//         ]);
//         setUploadImage(data.url);
//         message.success("Upload successful!");
//         onSuccess(null, file);
//       } else {
//         const errorMsg = data.message || "Upload failed";
//         message.error(errorMsg);
//         onError(new Error(errorMsg));
//       }
//     } catch (error) {
//       message.error("Upload error");
//       onError(error);
//     }
//   };

//   const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
//     // Only keep the latest file in the list
//     setFileList(newFileList.slice(-1));
//     // If user removes the image, update uploadImage state
//     if (newFileList.length === 0) {
//       setUploadImage("");
//       setPreviewImage("");
//     }
//   };

//   const uploadButton = (
//     <div>
//       <PlusOutlined />
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </div>
//   );

//   return (
//     <>
//       <Upload
//         className="w-full  object-cover rounded-lg border border-gray-200"
//         customRequest={customRequest}
//         listType="picture-card"
//         fileList={fileList}
//         onPreview={handlePreview}
//         onChange={handleChange}
//         maxCount={1}
//         accept="image/*"
//         onRemove={() => {
//           // Clear image URL when removed
//           setUploadImage("");
//           setPreviewImage("");
//         }}
//       >
//         {fileList.length >= 1 ? null : uploadButton}
//       </Upload>

//       <Image
//         preview={{
//           visible: previewOpen,
//           onVisibleChange: (visible) => setPreviewOpen(visible),
//         }}
//         src={previewImage}
//         style={{ display: "none" }}
//         // className="w-full h-36 object-cover rounded-lg border border-gray-200"
//       />
//     </>
//   );
// };

// export default UploadImage;

// import React, { useState, useEffect } from "react";
// import { PlusOutlined } from "@ant-design/icons";
// import { Image, Upload, message } from "antd";
// import type { UploadFile, UploadProps } from "antd/lib/upload/interface";

// type FileType = Parameters<NonNullable<UploadProps["beforeUpload"]>>[0];

// interface UploadImageProps {
//   uploadImage?: string;
//   setUploadImage: (url: string) => void;
// }

// const getBase64 = (file: FileType): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });

// const UploadImage: React.FC<UploadImageProps> = ({
//   uploadImage,
//   setUploadImage,
// }) => {
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [fileList, setFileList] = useState<UploadFile[]>([]);

//   useEffect(() => {
//     if (uploadImage) {
//       setFileList([
//         {
//           uid: "-1",
//           name: "image.png",
//           status: "done",
//           url: uploadImage,
//         },
//       ]);
//     } else {
//       setFileList([]);
//     }
//   }, [uploadImage]);

//   const handlePreview = async (file: UploadFile) => {
//     if (!file.url && !file.preview && file.originFileObj) {
//       file.preview = await getBase64(file.originFileObj as FileType);
//     }
//     setPreviewImage(file.url || (file.preview as string));
//     setPreviewOpen(true);
//   };

//   const customRequest = async (options: any) => {
//     const { file, onSuccess, onError } = options;
//     try {
//       const base64 = await getBase64(file);

//       const res = await fetch("/api/upload", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ file: base64 }),
//       });

//       const data = await res.json();

//       if (res.ok && data.url) {
//         setFileList([
//           {
//             uid: file.uid,
//             name: file.name,
//             status: "done",
//             url: data.url,
//           },
//         ]);
//         setUploadImage(data.url);
//         message.success("Upload successful!");
//         onSuccess(null, file);
//       } else {
//         const errorMsg = data.message || "Upload failed";
//         message.error(errorMsg);
//         onError(new Error(errorMsg));
//       }
//     } catch (error) {
//       message.error("Upload error");
//       onError(error);
//     }
//   };

//   const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
//     setFileList(newFileList.slice(-1));
//     if (newFileList.length === 0) {
//       setUploadImage("");
//       setPreviewImage("");
//     }
//   };

//   const uploadButton = (
//     <div className="flex flex-col items-center justify-center text-zinc-500">
//       <PlusOutlined className="text-lg" />
//       <span className="mt-1 text-xs font-medium">Upload</span>
//     </div>
//   );

//   return (
//     <div className="w-full">
//       <Upload
//         customRequest={customRequest}
//         listType="picture-card"
//         fileList={fileList}
//         // onPreview={handlePreview}
//         onChange={handleChange}
//         maxCount={1}
//         accept="image/*"
//         onRemove={() => {
//           setUploadImage("");
//           setPreviewImage("");
//         }}
//         className="upload-list-inline"
//       >
//         {fileList.length >= 1 ? null : uploadButton}
//       </Upload>

//       {/* <Image
//         preview={{
//           visible: previewOpen,
//           onVisibleChange: (visible) => setPreviewOpen(visible),
//         }}
//         src={previewImage}
//         style={{ display: "none" }}
//       /> */}
//     </div>
//   );
// };

// export default UploadImage;

// import React, { useState, useEffect } from "react";
// import { PlusOutlined } from "@ant-design/icons";
// import { Upload, message } from "antd";
// import type { UploadFile, UploadProps } from "antd/lib/upload/interface";

// type FileType = Parameters<NonNullable<UploadProps["beforeUpload"]>>[0];

// interface UploadImageProps {
//   uploadImage?: string;
//   setUploadImage: (url: string) => void;
// }

// const getBase64 = (file: FileType): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });

// const UploadImage: React.FC<UploadImageProps> = ({
//   uploadImage,
//   setUploadImage,
// }) => {
//   const [fileList, setFileList] = useState<UploadFile[]>([]);

//   useEffect(() => {
//     if (uploadImage) {
//       setFileList([
//         {
//           uid: "-1",
//           name: "image.png",
//           status: "done",
//           url: uploadImage,
//         },
//       ]);
//     } else {
//       setFileList([]);
//     }
//   }, [uploadImage]);

//   const customRequest = async (options: any) => {
//     const { file, onSuccess, onError } = options;
//     try {
//       const base64 = await getBase64(file);

//       const res = await fetch("/api/upload", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ file: base64 }),
//       });

//       const data = await res.json();

//       if (res.ok && data.url) {
//         setFileList([
//           {
//             uid: file.uid,
//             name: file.name,
//             status: "done",
//             url: data.url,
//           },
//         ]);
//         setUploadImage(data.url);
//         message.success("Upload successful!");
//         onSuccess(null, file);
//       } else {
//         const errorMsg = data.message || "Upload failed";
//         message.error(errorMsg);
//         onError(new Error(errorMsg));
//       }
//     } catch (error) {
//       message.error("Upload error");
//       onError(error);
//     }
//   };

//   const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
//     setFileList(newFileList.slice(-1));
//     if (newFileList.length === 0) {
//       setUploadImage("");
//     }
//   };

//   const uploadButton = (
//     <div className="flex flex-col items-center justify-center w-full h-36 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-600 text-zinc-500 hover:border-zinc-500 transition">
//       <PlusOutlined className="text-2xl mb-1" />
//       <span className="text-sm font-medium">Click or drag file to upload</span>
//     </div>
//   );

//   return (
//     <div className="w-full">
//       <Upload
//         customRequest={customRequest}
//         listType="picture-card"
//         fileList={fileList}
//         onChange={handleChange}
//         maxCount={1}
//         accept="image/*"
//         showUploadList={false}
//         onRemove={() => {
//           setUploadImage("");
//         }}
//         className="w-full"
//       >
//         {fileList.length >= 1 ? (
//           <img
//             src={fileList[0].url}
//             alt="Uploaded"
//             className="w-full h-36 object-cover rounded-lg border border-zinc-300 dark:border-zinc-700"
//           />
//         ) : (
//           uploadButton
//         )}
//       </Upload>
//     </div>
//   );
// };

// export default UploadImage;

// import React from "react";

// const UploadButton = ({ uploadImage, setUploadImage }) => {
//   const handleImageUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setUploadImage(reader.result); // Set image preview as base64
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center w-full">
//       <label
//         htmlFor="dropzone-file"
//         className="relative flex flex-col items-center justify-center w-full max-w-md  border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-100 hover:bg-gray-200 transition dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
//       >
//         {uploadImage ? (
//           <img
//             src={uploadImage}
//             alt="Preview"
//             className="w-full h-full object-cover rounded-2xl"
//           />
//         ) : (
//           <div className="flex flex-col items-center justify-center px-4 pt-5 pb-6 text-center">
//             <svg
//               className="w-10 h-10 mb-3 text-gray-500 dark:text-gray-400"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M4 16v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1M12 12v6m0 0l-3-3m3 3l3-3M12 6v6m0 0l-3-3m3 3l3-3"
//               />
//             </svg>
//             <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
//               Click to upload or drag and drop
//             </p>
//             <p className="text-xs text-gray-500 dark:text-gray-400">
//               PNG, JPG, GIF, SVG — Max. 800x400px
//             </p>
//           </div>
//         )}
//         <input
//           id="dropzone-file"
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//         />
//       </label>
//     </div>
//   );
// };

// export default UploadButton;

// "use client";

// import React, { useRef, useState, useCallback } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// // import { v4 as uuidv4 } from "uuid";
// // import axios from "axios";
// import { useRouter } from "next/navigation";
// // import { toast } from "sonner"; // Optional toast support

// const MAX_FILE_SIZE_MB = 5;
// const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// interface ResumeUploadDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// const validateFile = (file: File) => {
//   if (file.type !== "application/pdf") {
//     return "Only PDF files are allowed.";
//   }
//   if (file.size > MAX_FILE_SIZE_BYTES) {
//     return `File size exceeds ${MAX_FILE_SIZE_MB}MB limit.`;
//   }
//   return "";
// };

// const UploadButton: React.FC<ResumeUploadDialogProps> = ({
//   open,
//   onOpenChange,
// }) => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [error, setError] = useState<string>("");
//   const [isDragging, setIsDragging] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const router = useRouter();

//   // const hasSubscription = async (): Promise<boolean> => {
//   //   try {
//   //     const res = await axios.get("/api/check-subscription");
//   //     return res.data?.hasAccess ?? false;
//   //   } catch (error) {
//   //     console.error("Error checking subscription:", error);
//   //     return false;
//   //   }
//   // };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const validationError = validateFile(file);
//       if (validationError) {
//         setError(validationError);
//         setSelectedFile(null);
//       } else {
//         setError("");
//         setSelectedFile(file);
//       }
//     }
//   };

//   const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const file = e.dataTransfer.files?.[0];
//     if (file) {
//       const validationError = validateFile(file);
//       if (validationError) {
//         setError(validationError);
//         setSelectedFile(null);
//       } else {
//         setError("");
//         setSelectedFile(file);
//       }
//     }
//   }, []);

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const resetState = () => {
//     setSelectedFile(null);
//     setError("");
//     setIsDragging(false);
//     setIsUploading(false);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setError("Please select a PDF file to upload.");
//       return;
//     }

//     setIsUploading(true);
//     setError("");

//     try {
//       // const recordId = uuidv4();
//       const formData = new FormData();
//       formData.append("file", selectedFile);
//       // formData.append("recordId", recordId);

//       // const hasSubscriptionEnabled = await hasSubscription();

//       // if (!hasSubscriptionEnabled) {
//       //   const resultHistory = await axios.get("/api/history");
//       //   const historyList = resultHistory.data;

//       //   const isPresent = historyList.find(
//       //     (item: any) => item.aiAgentType === "/ai_tools/ai-resume-analyzer"
//       //   );

//       //   // console.log("isPresent", isPresent);

//       //   if (isPresent) {
//       //     toast.warning(
//       //       "You've used your free roadmap. Upgrade for unlimited access."
//       //     );
//       //     router.push("/billing");
//       //     resetState();
//       //     return;
//       //   }
//       // }

//       // const res = await axios.post("/api/ai-resume-agent", formData);
//       // // console.log("res", res.data);
//       // toast.success("Resume uploaded successfully!");

//       onOpenChange(false);
//       resetState();
//       // router.push(`/ai_tools/ai-resume-analyzer/${recordId}`);
//     } catch (uploadError) {
//       console.error("Upload failed:", uploadError);
//       setError("Failed to upload file. Please try again.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleCancel = () => {
//     resetState();
//     onOpenChange(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-md w-full">
//         <DialogHeader>
//           <DialogTitle>Upload Resume PDF</DialogTitle>
//           <DialogDescription>
//             <div className="mb-4 text-sm text-gray-500">
//               Please upload your resume as a PDF file. Max size:{" "}
//               {MAX_FILE_SIZE_MB}MB.
//             </div>

//             <div
//               onDrop={handleDrop}
//               onDragOver={handleDragOver}
//               onDragLeave={handleDragLeave}
//               className={`mb-4 flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${
//                 isDragging
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-300 bg-gray-50"
//               }`}
//               onClick={() => fileInputRef.current?.click()}
//               role="button"
//               tabIndex={0}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" || e.key === " ") {
//                   e.preventDefault();
//                   fileInputRef.current?.click();
//                 }
//               }}
//               aria-label="File upload dropzone, click or drag and drop PDF file here"
//             >
//               <p className="text-gray-700 text-center">
//                 Drag & drop your PDF here, or click to select a file
//               </p>
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="application/pdf"
//                 className="hidden"
//                 onChange={handleFileChange}
//                 disabled={isUploading}
//               />
//             </div>

//             {selectedFile && (
//               <div className="text-green-600 text-sm mb-2" aria-live="polite">
//                 Selected file: <strong>{selectedFile.name}</strong> (
//                 {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
//               </div>
//             )}

//             {error && (
//               <div
//                 className="text-red-600 text-sm mb-2"
//                 role="alert"
//                 aria-live="assertive"
//               >
//                 {error}
//               </div>
//             )}

//             <div className="flex gap-2 justify-end mt-4">
//               <button
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
//                 onClick={handleCancel}
//                 type="button"
//                 disabled={isUploading}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
//                 onClick={handleUpload}
//                 type="button"
//                 disabled={!selectedFile || !!error || isUploading}
//               >
//                 {isUploading ? "Uploading..." : "Upload"}
//               </button>
//             </div>
//           </DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default UploadButton;

// "use client";

// import React, { useRef, useState, useCallback } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { useRouter } from "next/navigation";

// const MAX_FILE_SIZE_MB = 5;
// const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// interface ResumeUploadDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// const validateFile = (file: File): string => {
//   if (file.type !== "application/pdf") return "Only PDF files are allowed.";
//   if (file.size > MAX_FILE_SIZE_BYTES)
//     return `File size exceeds ${MAX_FILE_SIZE_MB}MB limit.`;
//   return "";
// };

// const UploadButton: React.FC<ResumeUploadDialogProps> = ({
//   open,
//   onOpenChange,
// }) => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [error, setError] = useState<string>("");
//   const [isDragging, setIsDragging] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);

//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const router = useRouter();

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const validationError = validateFile(file);
//     if (validationError) {
//       setError(validationError);
//       setSelectedFile(null);
//     } else {
//       setError("");
//       setSelectedFile(file);
//     }
//   };

//   const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const file = e.dataTransfer.files?.[0];
//     if (!file) return;

//     const validationError = validateFile(file);
//     if (validationError) {
//       setError(validationError);
//       setSelectedFile(null);
//     } else {
//       setError("");
//       setSelectedFile(file);
//     }
//   }, []);

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const resetState = () => {
//     setSelectedFile(null);
//     setError("");
//     setIsDragging(false);
//     setIsUploading(false);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setError("Please select a PDF file to upload.");
//       return;
//     }

//     setIsUploading(true);
//     setError("");

//     try {
//       const formData = new FormData();
//       formData.append("file", selectedFile);

//       // Uncomment and connect to backend if needed
//       // const res = await axios.post("/api/upload-resume", formData);
//       // toast.success("Resume uploaded!");

//       onOpenChange(false);
//       resetState();
//       // router.push("/resume/analysis");
//     } catch (err) {
//       console.error("Upload failed:", err);
//       setError("Failed to upload file. Please try again.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleCancel = () => {
//     resetState();
//     onOpenChange(false);
//   };

//   return (
//     // <Dialog open={open} onOpenChange={onOpenChange}>
//     //   <DialogContent className="max-w-md w-full">
//     //     <DialogHeader>
//     //       <DialogTitle>Upload Resume (PDF)</DialogTitle>
//     //       <DialogDescription>
//     //         Max file size: {MAX_FILE_SIZE_MB}MB. Only PDF files are supported.
//     //       </DialogDescription>
//     //     </DialogHeader>

//     //     <div
//     //       onDrop={handleDrop}
//     //       onDragOver={handleDragOver}
//     //       onDragLeave={handleDragLeave}
//     //       onClick={() => fileInputRef.current?.click()}
//     //       role="button"
//     //       tabIndex={0}
//     //       onKeyDown={(e) => {
//     //         if (e.key === "Enter" || e.key === " ") {
//     //           e.preventDefault();
//     //           fileInputRef.current?.click();
//     //         }
//     //       }}
//     //       aria-label="Dropzone"
//     //       className={`mt-4 mb-2 flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//     //         isDragging
//     //           ? "border-blue-500 bg-blue-50"
//     //           : "border-gray-300 bg-gray-50"
//     //       }`}
//     //     >
//     //       <p className="text-gray-700 text-center text-sm">
//     //         Drag & drop a PDF here, or click to select
//     //       </p>
//     //       <input
//     //         ref={fileInputRef}
//     //         type="file"
//     //         accept="application/pdf"
//     //         className="hidden"
//     //         onChange={handleFileChange}
//     //         disabled={isUploading}
//     //       />
//     //     </div>

//     //     {selectedFile && (
//     //       <div className="text-green-700 text-sm mb-2">
//     //         Selected: <strong>{selectedFile.name}</strong> (
//     //         {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
//     //       </div>
//     //     )}

//     //     {error && (
//     //       <div className="text-red-600 text-sm mb-2" role="alert">
//     //         {error}
//     //       </div>
//     //     )}

//     //     <div className="mt-4 flex justify-end gap-2">
//     //       <button
//     //         className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
//     //         onClick={handleCancel}
//     //         type="button"
//     //         disabled={isUploading}
//     //       >
//     //         Cancel
//     //       </button>
//     //       <button
//     //         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
//     //         onClick={handleUpload}
//     //         type="button"
//     //         disabled={!selectedFile || !!error || isUploading}
//     //       >
//     //         {isUploading ? "Uploading..." : "Upload"}
//     //       </button>
//     //     </div>
//     //   </DialogContent>
//     // </Dialog>
//     <div className="">
//       <div
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onClick={() => fileInputRef.current?.click()}
//         role="button"
//         tabIndex={0}
//         onKeyDown={(e) => {
//           if (e.key === "Enter" || e.key === " ") {
//             e.preventDefault();
//             fileInputRef.current?.click();
//           }
//         }}
//         aria-label="Dropzone"
//         className={`mt-4 mb-2 flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//           isDragging
//             ? "border-blue-500 bg-blue-50"
//             : "border-gray-300 bg-gray-50"
//         }`}
//       >
//         <p className="text-gray-700 text-center text-sm">
//           Drag & drop a PDF here, or click to select
//         </p>
//         <input
//           ref={fileInputRef}
//           type="image"
//           accept="application/pdf"
//           className="hidden"
//           onChange={handleFileChange}
//           disabled={isUploading}
//         />
//       </div>

//       {selectedFile && (
//         <div className="text-green-700 text-sm mb-2">
//           Selected: <strong>{selectedFile.name}</strong> (
//           {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
//         </div>
//       )}

//       {error && (
//         <div className="text-red-600 text-sm mb-2" role="alert">
//           {error}
//         </div>
//       )}

//       <div className="mt-4 flex justify-end gap-2">
//         <button
//           className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
//           onClick={handleCancel}
//           type="button"
//           disabled={isUploading}
//         >
//           Cancel
//         </button>
//         <button
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
//           onClick={handleUpload}
//           type="button"
//           disabled={!selectedFile || !!error || isUploading}
//         >
//           {isUploading ? "Uploading..." : "Upload"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UploadButton;

// "use client";

// import React, { useRef, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";

// const MAX_FILE_SIZE_MB = 5;
// const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// interface ResumeUploadDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// const validateFile = (file: File): string => {
//   if (file.type !== "application/pdf") return "Only PDF files are allowed.";
//   if (file.size > MAX_FILE_SIZE_BYTES)
//     return `File size exceeds ${MAX_FILE_SIZE_MB}MB limit.`;
//   return "";
// };

// const UploadButton: React.FC<ResumeUploadDialogProps> = ({
//   open,
//   onOpenChange,
// }) => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [error, setError] = useState<string>("");
//   const [isDragging, setIsDragging] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);

//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const router = useRouter();

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const validationError = validateFile(file);
//     if (validationError) {
//       setError(validationError);
//       setSelectedFile(null);
//     } else {
//       setError("");
//       setSelectedFile(file);
//     }
//   };

//   const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const file = e.dataTransfer.files?.[0];
//     if (!file) return;

//     const validationError = validateFile(file);
//     if (validationError) {
//       setError(validationError);
//       setSelectedFile(null);
//     } else {
//       setError("");
//       setSelectedFile(file);
//     }
//   }, []);

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const resetState = () => {
//     setSelectedFile(null);
//     setError("");
//     setIsDragging(false);
//     setIsUploading(false);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setError("Please select a PDF file to upload.");
//       return;
//     }

//     setIsUploading(true);
//     setError("");

//     try {
//       const formData = new FormData();
//       formData.append("file", selectedFile);

//       // Example:
//       // await axios.post("/api/upload-resume", formData);
//       // toast.success("Uploaded!");

//       onOpenChange(false);
//       resetState();
//       // router.push("/resume/analysis");
//     } catch (err) {
//       console.error("Upload failed:", err);
//       setError("Failed to upload file. Please try again.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleCancel = () => {
//     resetState();
//     onOpenChange(false);
//   };

//   return (
//     <div className="max-w-xl mx-auto px-4 py-6">
//       <h2 className="text-lg font-semibold mb-2">Upload Resume (PDF)</h2>
//       <p className="text-sm text-gray-600 mb-4">
//         Drag and drop your resume, or click to select. PDF only, max{" "}
//         {MAX_FILE_SIZE_MB}MB.
//       </p>

//       <div
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onClick={() => fileInputRef.current?.click()}
//         role="button"
//         tabIndex={0}
//         onKeyDown={(e) => {
//           if (e.key === "Enter" || e.key === " ") {
//             e.preventDefault();
//             fileInputRef.current?.click();
//           }
//         }}
//         aria-label="Dropzone"
//         className={`flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition ${
//           isDragging
//             ? "border-blue-500 bg-blue-50"
//             : "border-gray-300 bg-gray-50 hover:bg-gray-100"
//         }`}
//       >
//         <svg
//           className="w-8 h-8 text-gray-400 mb-2"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth={2}
//           viewBox="0 0 24 24"
//         >
//           <path d="M4 16v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1M12 12v6m0-6l-3 3m3-3l3 3m3-10V6a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2" />
//         </svg>
//         <p className="text-sm text-gray-600">Click to upload or drag & drop</p>
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept="application/pdf"
//           className="hidden"
//           onChange={handleFileChange}
//           disabled={isUploading}
//         />
//       </div>

//       {selectedFile && (
//         <div className="mt-2 text-green-700 text-sm">
//           Selected: <strong>{selectedFile.name}</strong> (
//           {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
//         </div>
//       )}

//       {error && (
//         <div className="mt-2 text-red-600 text-sm" role="alert">
//           {error}
//         </div>
//       )}

//       <div className="mt-6 flex justify-end gap-2">
//         <button
//           className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
//           onClick={handleCancel}
//           type="button"
//           disabled={isUploading}
//         >
//           Cancel
//         </button>
//         <button
//           className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
//           onClick={handleUpload}
//           type="button"
//           disabled={!selectedFile || !!error || isUploading}
//         >
//           {isUploading ? "Uploading..." : "Upload"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UploadButton;

// import React, { useState } from "react";

// const UploadButton = ({ onUpload, uploadImage }) => {
//   const [preview, setPreview] = useState<string | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       // setUploadImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center w-full">
//       <label
//         htmlFor="dropzone-file"
//         className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition"
//       >
//         <div className="flex flex-col items-center justify-center pt-5 pb-6">
//           <svg
//             className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 20 16"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5
//                  5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5
//                  a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//             />
//           </svg>
//           <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//             <span className="font-semibold">Click to upload</span> or drag &
//             drop
//           </p>
//           <p className="text-xs text-gray-500 dark:text-gray-400">
//             JPG, PNG, SVG, or GIF (max 800x400px)
//           </p>
//         </div>
//         <input
//           id="dropzone-file"
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={handleFileChange}
//         />
//       </label>

//       {preview && (
//         <div className="mt-4">
//           <img
//             src={preview}
//             alt="Preview"
//             className="w-60 h-auto rounded-lg shadow-md object-cover"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadButton;

// import React, { useState, useEffect } from "react";

// interface UploadButtonProps {
//   uploadImage?: string | null;
//   onUpload: (imageDataUrl: string) => void;
// }

// const UploadButton: React.FC<UploadButtonProps> = ({
//   uploadImage,
//   onUpload,
// }) => {
//   const [preview, setPreview] = useState<string | null>(uploadImage || null);

//   useEffect(() => {
//     // Update preview if uploadImage prop changes
//     setPreview(uploadImage || null);
//   }, [uploadImage]);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();

//       reader.onloadend = () => {
//         const result = reader.result as string;
//         setPreview(result);
//         onUpload(result);
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center w-full">
//       <label
//         htmlFor="dropzone-file"
//         className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition"
//       >
//         <div className="flex flex-col items-center justify-center pt-5 pb-6">
//           <svg
//             className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 20 16"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5
//                  5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5
//                  a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//             />
//           </svg>
//           <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//             <span className="font-semibold">Click to upload</span> or drag &amp;
//             drop
//           </p>
//           <p className="text-xs text-gray-500 dark:text-gray-400">
//             JPG, PNG, SVG, or GIF (max 800x400px)
//           </p>
//         </div>
//         <input
//           id="dropzone-file"
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={handleFileChange}
//         />
//       </label>

//       {preview && (
//         <div className="mt-4">
//           <img
//             src={preview}
//             alt="Preview"
//             className="w-60 h-auto rounded-lg shadow-md object-cover"
//           />
//         </div>
//       )}

//       <div className="flex gap-2 justify-end mt-4">
//         <button
//           className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
//           onClick={handleCancel}
//           type="button"
//           disabled={isUploading}
//         >
//           Cancel
//         </button>
//         <button
//           className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
//           onClick={handleUpload}
//           type="button"
//           disabled={!selectedFile || !!error || isUploading}
//         >
//           {isUploading ? "Uploading..." : "Upload"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UploadButton;

// import React, { useState, useEffect } from "react";

// interface UploadButtonProps {
//   uploadImage?: string | null;
//   onUpload: (imageDataUrl: string) => void;
//   onCancel?: () => void;
// }

// const UploadButton: React.FC<UploadButtonProps> = ({
//   uploadImage,
//   onUpload,
//   onCancel,
// }) => {
//   const [preview, setPreview] = useState<string | null>(uploadImage || null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [error, setError] = useState<string>("");
//   const [isUploading, setIsUploading] = useState(false);

//   useEffect(() => {
//     setPreview(uploadImage || null);
//   }, [uploadImage]);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       setError("Only image files are allowed.");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const result = reader.result as string;
//       setPreview(result);
//       setSelectedFile(file);
//       setError("");
//       onUpload(result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleUpload = () => {
//     if (!selectedFile || error) return;

//     setIsUploading(true);

//     setTimeout(() => {
//       setIsUploading(false);
//       alert("Image uploaded successfully!"); // Replace with actual logic
//     }, 1500);
//   };

//   const handleCancel = () => {
//     setPreview(null);
//     setSelectedFile(null);
//     setError("");
//     if (onCancel) onCancel();
//   };

//   return (
//     <div className="w-full max-w-lg mx-auto">
//       <label
//         htmlFor="dropzone-file"
//         className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600"
//       >
//         <div className="flex flex-col items-center justify-center pt-5 pb-6">
//           <svg
//             className="w-10 h-10 mb-3 text-gray-500 dark:text-gray-400"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 20"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M16 16l-4-4-4 4m8-6v6a2 2 0 002 2h2a2 2 0 002-2V6a2 2 0 00-2-2h-2M4 8v10a2 2 0 002 2h12M12 4v8"
//             />
//           </svg>
//           <p className="mb-1 text-sm text-gray-600 dark:text-gray-300">
//             <span className="font-semibold">Click to upload</span> or drag and
//             drop
//           </p>
//           <p className="text-xs text-gray-500 dark:text-gray-400">
//             PNG, JPG, SVG, GIF up to 5MB
//           </p>
//         </div>
//         <input
//           id="dropzone-file"
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={handleFileChange}
//         />
//       </label>

//       {preview && (
//         <div className="mt-4 flex justify-center">
//           <img
//             src={preview}
//             alt="Preview"
//             className="w-60 h-auto rounded-lg shadow-md object-cover"
//           />
//         </div>
//       )}

//       {error && (
//         <div className="text-red-600 text-sm mt-2 text-center">{error}</div>
//       )}

//       <div className="mt-4 flex justify-end gap-2">
//         <button
//           onClick={handleCancel}
//           type="button"
//           disabled={isUploading}
//           className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleUpload}
//           type="button"
//           disabled={!selectedFile || !!error || isUploading}
//           className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
//         >
//           {isUploading ? "Uploading..." : "Upload"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UploadButton;

import React, { useState, useEffect } from "react";

interface UploadButtonProps {
  uploadImage?: string | null;
  onUpload: (imageDataUrl: string) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({
  uploadImage,
  onUpload,
}) => {
  const [preview, setPreview] = useState<string | null>(uploadImage || null);

  useEffect(() => {
    setPreview(uploadImage || null);
  }, [uploadImage]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onUpload(result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <label
      htmlFor="dropzone-file"
      className="flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 dark:hover:border-gray-500 transition overflow-hidden min-h-20 h-36 max-h-64"
    >
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="object-cover w-full h-full rounded-lg"
        />
      ) : (
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 
                 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5
                 a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag &amp;
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            JPG, PNG, SVG, or GIF (max 800x400px)
          </p>
        </div>
      )}

      <input
        id="dropzone-file"
        type="file"
        accept="image/*"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileChange}
      />
    </label>
  );
};

export default UploadButton;
