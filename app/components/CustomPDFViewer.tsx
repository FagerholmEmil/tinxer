// match with other people who liked the same pdf

'use client';

import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { saveLikedPdf } from '../utils/pdfUtils';

// Set up the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import LoadingSpinner from './LoadingSpinner';

interface CustomPDFViewerProps {
  pdfUrls: string[];
  onLikedPdfUpdate: (url: string) => void;
}

function CustomPDFViewer({ pdfUrls, onLikedPdfUpdate }: CustomPDFViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedPdfs, setSavedPdfs] = useState<string[]>([]);
  const [lastAction, setLastAction] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const currentUrl = pdfUrls[currentIndex];
      if (!currentUrl) return;

      if (event.key === '1') {
        savePdf(currentUrl);
        setCurrentIndex((prev) => (prev + 1) % pdfUrls.length);
        setLastAction("Like");
      } else if (event.key === '2') {
        setCurrentIndex((prev) => (prev + 1) % pdfUrls.length);
        setLastAction("Skip");
      } else if (event.key === '3') {
        setCurrentIndex((prev) => (prev + 1) % pdfUrls.length);
        setLastAction("Ultra Like");
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, pdfUrls, onLikedPdfUpdate]);

  useEffect(() => {
    if (lastAction) {
      const timer = setTimeout(() => setLastAction(null), 1000); // Clear after 1 second
      return () => clearTimeout(timer);
    }
  }, [lastAction]);

  const savePdf = async (url: string) => {
    if (url) {
      setSavedPdfs((prev) => [...prev, url]);
      await saveLikedPdf(url);
      onLikedPdfUpdate(url);
    }
  };

  if (pdfUrls.length === 0) {
    return <div className='flex flex-col justify-center items-center min-h-screen text-black'> 
      <LoadingSpinner />
    </div>;
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen relative'>
      {lastAction && (
        <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 text-white p-2 rounded z-10 ${
          lastAction === 'Like' ? 'bg-green-500' :
          lastAction === 'Skip' ? 'bg-red-500' :
          'bg-yellow-500'
        }`}>
          {lastAction}
        </div>
      )}
      <Document file={pdfUrls[currentIndex]}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
}

export default CustomPDFViewer;
