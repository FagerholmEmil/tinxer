'use client';

import React, { useEffect, useState } from 'react';

interface ArxivFetcherProps {
  onPdfLinksUpdate: (links: string[]) => void;
}

const ArxivFetcher: React.FC<ArxivFetcherProps> = ({ onPdfLinksUpdate }) => {
  const [topic, setTopic] = useState('physics');  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchArxivData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/arxiv-proxy?topic=${topic}`);
        const data = await response.text();
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');

        const pdfElements = xmlDoc.querySelectorAll('link[type="application/pdf"]');
        const links = Array.from(pdfElements).map(el => el.getAttribute('href') || '');
        console.log(links);

        onPdfLinksUpdate(links);
      } catch (error) {
        console.error('Error fetching arXiv data:', error);
      }
    };

    fetchArxivData();
  }, [topic, onPdfLinksUpdate]);

  return null;
};

export default ArxivFetcher;
