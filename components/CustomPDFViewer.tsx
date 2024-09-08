// match with other people who liked the same pdf

"use client";

import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { saveLikedPdf } from "../app/utils/pdfUtils";

// Set up the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import LoadingSpinner from "./LoadingSpinner";

interface CustomPDFViewerProps {
  pdfUrls: string[];
}

function CustomPDFViewer({ pdfUrls }: CustomPDFViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (pdfUrls.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center  text-black">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-[600px] p-5 max-w-[85vw] rounded-[20px] relative">
      <Document
        file={"https://arxiv.org/pdf/2001.00019"}
        className="unselectable"
      >
        <Page pageNumber={1} width={340} scale={0.8} className="unselectable" />
      </Document>
    </div>
  );
}

export default CustomPDFViewer;
