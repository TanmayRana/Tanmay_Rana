"use client";
import Image from "next/image";
// import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Brain } from "lucide-react";
import { Card } from "@/util/Card";
// import Card from "@/util/Card";

interface ResumePreviewProps {
  url: string | null;
  isLoading: boolean;
}

export default function ResumePreview({ url, isLoading }: ResumePreviewProps) {
  // console.log("ResumePreview URL:", url);

  if (isLoading) {
    return (
      <Card className="w-full h-full flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm shadow-xl p-4">
        <div className="w-full h-full flex flex-col items-center justify-center bg-muted/50 rounded-lg">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse mb-4">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            Analyzing your resume...
          </p>
          <Skeleton className="h-4 w-32 mt-2" />
        </div>
      </Card>
    );
  }

  if (!url) {
    return (
      <Card className="w-full h-full flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm shadow-xl p-4">
        <div className="w-full h-full flex flex-col items-center justify-center bg-muted/50 rounded-lg">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <FileText className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground">
            No Preview Available
          </h3>
          <p className="text-sm text-muted-foreground">Resume URL not found.</p>
        </div>
      </Card>
    );
  }

  const isPdf = url.split("?")[0].endsWith(".pdf");

  return (
    <Card className="w-full h-full shadow-xl bg-card/80 backdrop-blur-sm p-2 overflow-hidden">
      <div className="relative w-full h-full bg-white rounded-md">
        {isPdf ? (
          <iframe
            src={`${url}#toolbar=0&navpanes=0&scrollbar=0`}
            title="Resume Preview"
            className="w-full h-full border-0 rounded-md"
          />
        ) : (
          <Image
            src={url}
            alt="Resume preview"
            layout="fill"
            objectFit="contain"
            className="transition-opacity duration-300 rounded-md p-2"
            data-ai-hint="resume document"
          />
        )}
      </div>
    </Card>
  );
}
