"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "./ui/card";
import Sidebar from "../components/Sidebar";
import { useUser } from "@/app/login/useUser";
import { getLikedPdfs } from "@/app/utils/pdfUtils";
import { Paper } from "./Paper";
import Link from "next/link";
import CustomPDFViewer from "./CustomPDFViewer";

const ProfileContent: React.FC = () => {
  const [likedPapers, setLikedPapers] = useState<Paper[]>([]);
  const reversedPapers = likedPapers.slice().reverse();
  const user = useUser();

  useEffect(() => {
    if (user) {
      getLikedPdfs(user.id).then((likedPapers) => setLikedPapers(likedPapers));
    }
  }, [user]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Your Matches</h2>
          <Link
            href="/matches"
            className="underline text-blue-700 text-sm font-semibold"
          >
            10 matches
          </Link>
        </CardHeader>
        <CardContent>{/* Add matches content here */}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">
            Liked Papers ({reversedPapers.length})
          </h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap pb-8">
            {reversedPapers.map((paper) => (
              <div key={paper.name} className="w-1/3  p-4 flex flex-col  gap-2">
                <h1 className="font-bold overflow-ellipsis line-clamp-2">
                  {paper.name}
                </h1>
                <Link
                  href={paper.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CustomPDFViewer pdfUrls={[paper.pdfUrl]} />
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div>
        <Sidebar />
      </div>
    </div>
  );
};

export default ProfileContent;
