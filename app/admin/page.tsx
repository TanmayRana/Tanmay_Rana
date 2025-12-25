"use client";
import React, { useState, useEffect } from "react";
import { Upload, Save } from "lucide-react";
import {
  getProfileData,
  updateProfileData,
} from "@/lib/storeData/profileSlice";
import axios from "axios";
import Button from "@/util/Button";
import { Card } from "@/util/Card";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AdminProfile = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile);

  const [personalData, setPersonalData] = useState(() => ({
    profileImage: profile?.profileImage ?? "/placeholder.jpg",
    name: profile?.name ?? "",
    title: profile?.title ?? "",
    tagline: profile?.tagline ?? "",
    description: profile?.description ?? "",
    roles: profile?.roles?.join(", ") ?? "",
    expertise: profile?.expertise ?? "",
    whatsapp: profile?.whatsapp ?? "",
    greeting: profile?.greeting ?? "",
    location: profile?.location ?? "",
    status: profile?.status ?? "Available",
  }));

  useEffect(() => {
    dispatch(getProfileData());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setPersonalData({
        profileImage: profile.profileImage ?? "/placeholder.jpg",
        name: profile.name ?? "",
        title: profile.title ?? "",
        tagline: profile.tagline ?? "",
        description: profile.description ?? "",
        roles: profile.roles?.join(", ") ?? "",
        expertise: profile.expertise ?? "",
        whatsapp: profile.whatsapp ?? "",
        greeting: profile.greeting ?? "",
        location: profile.location ?? "",
        status: profile.status ?? "Available",
      });
    }
  }, [profile]);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handlePersonalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const dataToSave = {
        ...personalData,
        roles: personalData.roles.split(",").map((r: string) => r.trim()),
      };
      await dispatch(updateProfileData(dataToSave));
      toast.success("Profile updated successfully!");
      dispatch(getProfileData());
    } catch (error) {
      setError("Failed to update profile, please try again.");
      console.error("Error in handlePersonalSubmit", error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setSuccess(null);

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

    try {
      const base64File = await toBase64(file);
      const res = await axios.post("/api/upload", { file: base64File });
      const uploadedUrl = res.data.url;
      setPersonalData((prev) => ({ ...prev, profileImage: uploadedUrl }));
      toast.success("Profile image uploaded successfully!");
    } catch (err) {
      setError("Image upload failed. Please try again.");
      console.error("Image upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">
          Profile Management
        </h1>
        <p className="text-gray-600">
          Update your personal information and Hero section details
        </p>
      </div>

      <div className="flex justify-center gap-6 lg:gap-8">
        <div className="w-full max-w-2xl">
          <Card className="p-4 lg:p-6 border">
            <h2 className="text-lg lg:text-xl font-semibold mb-6">
              Personal Information
            </h2>

            <form
              onSubmit={handlePersonalSubmit}
              className="space-y-4 lg:space-y-6"
            >
              {/* Profile Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Profile Image
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <img
                    src={personalData.profileImage || "/placeholder.jpg"}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="profile-image"
                      disabled={uploading}
                    />
                    <label
                      htmlFor="profile-image"
                      className={`inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer text-sm transition-colors ${uploading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                      <Upload size={16} />
                      {uploading ? "Uploading..." : "Upload New Image"}
                    </label>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <Input
                  type="text"
                  value={personalData.name}
                  onChange={(e) =>
                    setPersonalData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Professional Title (Main)
                </label>
                <Input
                  type="text"
                  value={personalData.title}
                  onChange={(e) =>
                    setPersonalData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  required
                />
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Tagline (e.g. Frontend Dev | Tech Explorer)
                </label>
                <Input
                  type="text"
                  value={personalData.tagline}
                  onChange={(e) =>
                    setPersonalData((prev) => ({ ...prev, tagline: e.target.value }))
                  }
                  required
                />
              </div>

              {/* Greeting */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Greeting (Hero)
                </label>
                <Input
                  type="text"
                  value={personalData.greeting}
                  onChange={(e) =>
                    setPersonalData((prev) => ({ ...prev, greeting: e.target.value }))
                  }
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Hero Description
                </label>
                <Textarea
                  rows={3}
                  value={personalData.description}
                  onChange={(e) =>
                    setPersonalData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  required
                />
              </div>

              {/* Roles */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Roles (comma-separated tags)
                </label>
                <Input
                  type="text"
                  value={personalData.roles}
                  onChange={(e) =>
                    setPersonalData((prev) => ({ ...prev, roles: e.target.value }))
                  }
                  placeholder="AI Engineer, Web Dev, etc."
                  required
                />
              </div>

              {/* Expertise */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Expertise (Hero Card)
                </label>
                <Input
                  type="text"
                  value={personalData.expertise}
                  onChange={(e) =>
                    setPersonalData((prev) => ({ ...prev, expertise: e.target.value }))
                  }
                  required
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  WhatsApp Number
                </label>
                <Input
                  type="text"
                  value={personalData.whatsapp}
                  onChange={(e) =>
                    setPersonalData((prev) => ({ ...prev, whatsapp: e.target.value }))
                  }
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Location (Hero Card)
                </label>
                <Input
                  type="text"
                  value={personalData.location}
                  onChange={(e) =>
                    setPersonalData((prev) => ({ ...prev, location: e.target.value }))
                  }
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Status (e.g. Available)
                </label>
                <Input
                  type="text"
                  value={personalData.status}
                  onChange={(e) =>
                    setPersonalData((prev) => ({ ...prev, status: e.target.value }))
                  }
                  required
                />
              </div>

              {/* Feedback messages */}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-600 text-sm">{success}</p>}

              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={uploading}
              >
                <Save size={16} />
                Save Personal Info
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
