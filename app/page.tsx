"use client";

import React, { useState, useCallback, useEffect } from "react";
import ArxivFetcher from "./components/ArxivFetcher";
import CustomPDFViewer from "./components/CustomPDFViewer";
import { getLikedPdfs } from "./utils/pdfUtils";
import Login from "./login/page";

const PDFBrowser: React.FC = () => {
  const [pdfLinks, setPdfLinks] = useState<string[]>([]);
  const [likedPdfs, setLikedPdfs] = useState<string[]>([]);

  useEffect(() => {
    const fetchLikedPdfs = async () => {
      const oldLikedPdfs = await getLikedPdfs();
      setLikedPdfs(oldLikedPdfs);
    };
    fetchLikedPdfs();
  }, []);

  const handlePdfLinksUpdate = (links: string[]) => {
    setPdfLinks(links);
  };

  const handleLikedPdfUpdate = useCallback((newLikedPdf: string) => {
    setLikedPdfs((prev) => [...prev, newLikedPdf]);
  }, []);

  return (
    <div className="flex flex-row justify-center items-center min-h-[50vh] w-full">
      <Login />
      <div className="w-1/2 m-4 rounded-lg bg-white shadow-xl">
        <ArxivFetcher onPdfLinksUpdate={handlePdfLinksUpdate} />
        <CustomPDFViewer
          pdfUrls={pdfLinks}
          onLikedPdfUpdate={handleLikedPdfUpdate}
        />
      </div>
    </div>
  );
};

export default PDFBrowser;
