// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // "use client";

// // import * as React from "react";
// // import {
// //   SidebarMenu,
// //   SidebarMenuItem,
// //   useSidebar,
// // } from "@/components/ui/sidebar";
// // // import { useAppSelector } from "@/hooks";
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// // export function TeamSwitcher() {
// //   // const profile = useAppSelector((state) => state.profile);
// //   const { state: sidebarState } = useSidebar();

// //   const profile = {
// //     profilename: localStorage.getItem("profilename"),
// //     profileImage: localStorage.getItem("profileImage"),
// //     email: localStorage.getItem("profileemail"),
// //   };

// //   const isCollapsed = sidebarState === "collapsed";
// //   const initials = profile.profilename?.[0]?.toUpperCase() || "U";

// //   return (
// //     <SidebarMenu>
// //       <SidebarMenuItem>
// //         <div
// //           className={`group flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted/50 ${
// //             isCollapsed ? "justify-center px-2" : ""
// //           }`}
// //         >
// //           <Avatar className="h-9 w-9 ring-2 ring-muted-foreground/10 group-hover:ring-foreground/20 transition">
// //             <AvatarImage
// //               src={profile.profileImage || ""}
// //               alt={profile.name || "User Avatar"}
// //             />
// //             <AvatarFallback className="text-sm font-medium">
// //               {initials}
// //             </AvatarFallback>
// //           </Avatar>

// //           {!isCollapsed && (
// //             <div className="flex flex-col truncate">
// //               <span className="text-sm font-semibold text-foreground truncate">
// //                 {profile.name}
// //               </span>
// //               <span className="text-xs text-muted-foreground truncate">
// //                 My Account
// //               </span>
// //             </div>
// //           )}
// //         </div>
// //       </SidebarMenuItem>
// //     </SidebarMenu>
// //   );
// // }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import * as React from "react";
// import {
//   SidebarMenu,
//   SidebarMenuItem,
//   useSidebar,
// } from "@/components/ui/sidebar";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// export function TeamSwitcher() {
//   const { state: sidebarState } = useSidebar();

//   const profile = {
//     name: localStorage.getItem("profilename") || "User",
//     profileImage: localStorage.getItem("profileImage"),
//     email: localStorage.getItem("profileemail"),
//   };

//   const isCollapsed = sidebarState === "collapsed";
//   const initials = profile.name?.[0]?.toUpperCase() || "U";

//   return (
//     <SidebarMenu>
//       <SidebarMenuItem>
//         <div
//           className={`group flex items-center gap-3 rounded-xl px-3 py-2 transition-all hover:bg-muted/50 ${
//             isCollapsed ? "justify-center px-2" : ""
//           }`}
//         >
//           <Avatar className="h-9 w-9 ring-2 ring-muted-foreground/10 group-hover:ring-foreground/20 transition">
//             <AvatarImage src={profile.profileImage || ""} alt={profile.name} />
//             <AvatarFallback className="text-sm font-medium">
//               {initials}
//             </AvatarFallback>
//           </Avatar>

//           {!isCollapsed && (
//             <div className="flex flex-col overflow-hidden">
//               <span className="text-sm font-semibold text-foreground truncate">
//                 {profile.name}
//               </span>
//               <span className="text-xs text-muted-foreground truncate">
//                 {profile.email || "My Account"}
//               </span>
//             </div>
//           )}
//         </div>
//       </SidebarMenuItem>
//     </SidebarMenu>
//   );
// }

"use client";

import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";

export function TeamSwitcher() {
  const { state: sidebarState } = useSidebar();

  // Hardcoded profile
  // const profile = {
  //   name: localStorage.getItem("profilename") || "User",
  //   profileImage: localStorage.getItem("profileImage"),
  //   email: localStorage.getItem("profileemail"),
  // };

  // const [profile, setProfile] = React.useState({
  //   name: "User",
  //   profileImage: null as string | null,
  //   email: "",
  // });

  // React.useEffect(() => {
  //   const name = localStorage.getItem("profilename") || "User";
  //   const profileImage = localStorage.getItem("profileImage");
  //   const email = localStorage.getItem("profileemail");

  //   setProfile({
  //     name,
  //     profileImage: profileImage || "",
  //     email: email || "",
  //   });
  // }, []);

  const [profile, setProfile] = React.useState({
    name: "User",
    profileImage: null as string | null,
    email: "",
  });

  // React.useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const name = localStorage.getItem("profilename") || "User";
  //     const profileImage = localStorage.getItem("profileImage");
  //     const email = localStorage.getItem("profileemail");

  //     setProfile({
  //       name,
  //       profileImage: profileImage || "",
  //       email: email || "",
  //     });
  //   }
  // }, []);
  const getUserInfo = async () => {
    try {
      const userInfo = await axios.get("/api/userInfo");
      // console.log("userInfo", userInfo.data);
      setProfile({
        name: userInfo.data.name,
        profileImage: userInfo.data.profileImage,
        email: userInfo.data.email,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  React.useEffect(() => {
    getUserInfo();
  }, []);

  const isCollapsed = sidebarState === "collapsed";
  const initials = profile.name?.[0]?.toUpperCase() || "U";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div
          className={`group flex items-center gap-3 rounded-2xl px-3 py-2 transition-all hover:bg-muted/60 ${isCollapsed ? "justify-center px-2" : ""
            }`}
        >
          <Avatar className="h-9 w-9 ring-2 ring-muted-foreground/10 group-hover:ring-foreground/20 transition duration-300 ease-in-out shadow-sm">
            <AvatarImage
              src={profile.profileImage || undefined}
              alt={profile.name}
            />
            <AvatarFallback className="text-sm font-semibold bg-muted text-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>

          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold text-foreground truncate">
                {profile.name}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {profile.email}
              </span>
            </div>
          )}
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
