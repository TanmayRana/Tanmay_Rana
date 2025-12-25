"use client";
import { useAppSelector } from "@/hooks";
import { AboutSection } from "./_components/pageComponents/AboutSection";
import { CertificatesSection } from "./_components/pageComponents/CertificatesSection";
import { ContactSection } from "./_components/pageComponents/ContactSection";
import { ExperienceSection } from "./_components/pageComponents/ExperienceSection";
import { Footer } from "./_components/pageComponents/Footer";
import { HeroSection } from "./_components/pageComponents/HeroSection";
import { Navbar } from "./_components/pageComponents/Navbar";
import { PageTransition } from "./_components/pageComponents/PageTransition";
import { ProjectsSection } from "./_components/pageComponents/ProjectsSection";
import { ResumeSection } from "./_components/pageComponents/ResumeSection";
import { SkillsSection } from "./_components/pageComponents/SkillsSection";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks";
import { fetchAbout, fetchPassions } from "@/lib/storeData/aboutSlice";
import { getProfileData } from "@/lib/storeData/profileSlice";
import { getContact } from "@/lib/storeData/contactSlice";
import { getSocialMedia } from "@/lib/storeData/SocialMediaSlice";
import { TechnologiesSection } from "./_components/pageComponents/TechnologiesSection";

const Index = () => {
  return (
    <>
      <PageTransition>
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <TechnologiesSection />
          <SkillsSection />
          <ProjectsSection />
          {/* <ExperienceSection /> */}
          {/* <ResumeSection /> */}
          <CertificatesSection />
          <ContactSection />
        </main>
        <Footer />
      </PageTransition>
    </>
  );
};

export default Index;


// Make butter and a good user experience and responsive make butter degine.mobile,tabe,laptop,large scrine make responsive