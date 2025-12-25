/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Cpu,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";

import {
  Settings,
  User,
  FolderOpen,
  Award,
  Mail,
  FileText,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const data = {
  navMain: [
    {
      title: "Profile",
      url: "/admin",
      icon: User,
    },

    {
      title: "Projects",
      url: "/admin/AdminProjects",
      icon: FolderOpen,
    },
    {
      title: "Skills",
      url: "/admin/AdminSkills",
      icon: Settings,
    },
    {
      title: "Certifications",
      url: "/admin/AdminCertifications",
      icon: Award,
    },
    {
      title: "About",
      url: "/admin/AdminAbout",
      icon: FileText,
    },
    {
      title: "Contact",
      url: "/admin/AdminContact",
      icon: Mail,
    },
    {
      title: "Technologies",
      url: "/admin/AdminTechnologies",
      icon: Cpu,
    },
    {
      title: "Resume",
      url: "/admin/AdminResume",
      icon: Cpu,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
