"use client";

import React, { useEffect, useState } from "react";
import {
  Save,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { toast } from "sonner";


import Button from "@/util/Button";
import { Card } from "@/util/Card";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { getContact, postContact } from "@/lib/storeData/contactSlice";
import {
  getSocialMedia,
  postSocialMedia,
} from "@/lib/storeData/SocialMediaSlice";

const AdminContact = () => {
  const dispatch = useAppDispatch();

  // Redux states
  const { data: contactDataFromStore } = useAppSelector(
    (state) => state.contact
  );
  const { data: socialDataFromStore } = useAppSelector(
    (state) => state.socialMedia
  );

  // Local form state
  const [contactData, setContactData] = useState({
    email: "",
    phone: "",
    location: "",
    githunurl: "",
    linkedinurl: "",
    twitterurl: "",
  });

  // Load data on mount
  useEffect(() => {
    dispatch(getContact());
    dispatch(getSocialMedia());
  }, [dispatch]);

  // Update local state when redux store changes
  useEffect(() => {
    if (contactDataFromStore && contactDataFromStore.length > 0) {
      setContactData((prev) => ({
        ...prev,
        ...contactDataFromStore[0],
      }));
    }

    if (socialDataFromStore && socialDataFromStore.length > 0) {
      setContactData((prev) => ({
        ...prev,
        ...socialDataFromStore[0],
      }));
    }
  }, [contactDataFromStore, socialDataFromStore]);

  // Socket.io listener for new messages


  // Contact form submit handler
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, phone, location } = contactData;
    // console.log("Submitted contact info:", { email, phone, location });

    try {
      await dispatch(postContact({ email, phone, location })).unwrap();
      toast.success("Contact information saved successfully");
    } catch (error) {
      toast.error("Failed to save contact information");
      console.error(error);
    }
  };

  // Social media submit handler
  const handleSocialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Use keys exactly as in state
    const { githunurl, linkedinurl, twitterurl } = contactData;
    // console.log("Submitted social links:", {
    //   githunurl,
    //   linkedinurl,
    //   twitterurl,
    // });

    try {
      await dispatch(
        postSocialMedia({
          github: githunurl,
          linkedin: linkedinurl,
          twitter: twitterurl,
        })
      ).unwrap();
      toast.success("Social media links saved successfully");
    } catch (error) {
      toast.error("Failed to save social media links");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold  mb-2">
          Contact Management
        </h1>
        <p className="text-gray-600">
          Manage your contact information and social media links
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Contact Info Form */}
        <Card className="p-4 lg:p-6 border">
          <h2 className="text-lg lg:text-xl font-semibold  mb-6 flex items-center gap-3">
            <Mail className="text-indigo-600" size={24} />
            Contact Information
          </h2>

          <form
            onSubmit={handleContactSubmit}
            className="space-y-4 lg:space-y-6"
          >
            <div>
              <label className=" text-sm font-medium  mb-2 flex items-center gap-2">
                <Mail size={16} />
                Email Address
              </label>
              <input
                type="email"
                value={contactData.email}
                onChange={(e) =>
                  setContactData({ ...contactData, email: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm lg:text-base"
                required
              />
            </div>

            <div>
              <label className=" text-sm font-medium  mb-2 flex items-center gap-2">
                <Phone size={16} />
                Phone Number
              </label>
              <input
                type="tel"
                value={contactData.phone}
                onChange={(e) =>
                  setContactData({ ...contactData, phone: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm lg:text-base"
                required
              />
            </div>

            <div>
              <label className=" text-sm font-medium  mb-2 flex items-center gap-2">
                <MapPin size={16} />
                Location
              </label>
              <input
                type="text"
                value={contactData.location}
                onChange={(e) =>
                  setContactData({ ...contactData, location: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm lg:text-base"
                required
              />
            </div>

            <Button type="submit" className="w-full sm:w-auto">
              <Save size={16} />
              Save Contact Info
            </Button>
          </form>
        </Card>

        {/* Social Media Form */}
        <Card className="p-4 lg:p-6 border">
          <h2 className="text-lg lg:text-xl font-semibold  mb-6 flex items-center gap-3">
            <Github className="text-indigo-600" size={24} />
            Social Media Links
          </h2>

          <form
            onSubmit={handleSocialSubmit}
            className="space-y-4 lg:space-y-6"
          >
            <div>
              <label className=" text-sm font-medium  mb-2 flex items-center gap-2">
                <Github size={16} />
                GitHub URL
              </label>
              <input
                type="url"
                value={contactData.githunurl}
                onChange={(e) =>
                  setContactData({ ...contactData, githunurl: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm lg:text-base"
                required
              />
            </div>

            <div>
              <label className=" text-sm font-medium  mb-2 flex items-center gap-2">
                <Linkedin size={16} />
                LinkedIn URL
              </label>
              <input
                type="url"
                value={contactData.linkedinurl}
                onChange={(e) =>
                  setContactData({
                    ...contactData,
                    linkedinurl: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm lg:text-base"
                required
              />
            </div>

            <div>
              <label className=" text-sm font-medium  mb-2 flex items-center gap-2">
                <Twitter size={16} />
                Twitter URL (Optional)
              </label>
              <input
                type="url"
                value={contactData.twitterurl || ""}
                onChange={(e) =>
                  setContactData({ ...contactData, twitterurl: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm lg:text-base"
              />
            </div>

            <Button type="submit" className="w-full sm:w-auto">
              <Save size={16} />
              Save Social Links
            </Button>
          </form>
        </Card>
      </div>

      {/* Preview Section */}
      <Card className="p-4 lg:p-6 border">
        <h2 className="text-lg lg:text-xl font-semibold mb-6">
          Contact Preview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <Card className="p-4 border hover:border-indigo-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="text-indigo-600" size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-sm mb-1">Email</h4>
                <p className="text-sm text-gray-600 truncate">{contactData.email}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border hover:border-indigo-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="text-indigo-600" size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-sm mb-1">Phone</h4>
                <p className="text-sm text-gray-600 truncate">{contactData.phone}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border hover:border-indigo-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="text-indigo-600" size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-sm mb-1">Location</h4>
                <p className="text-sm text-gray-600 truncate">{contactData.location}</p>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default AdminContact;
