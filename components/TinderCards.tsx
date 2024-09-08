import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import CustomPDFViewer from "./CustomPDFViewer";
import { Button } from "./ui/button";
import Link from "next/link";

interface Paper {
  name: string;
  pdfUrl: string;
  summary?: string;
}

const parseXMLPapers = (xml: string) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, "text/xml");

  const entries = xmlDoc.getElementsByTagName("entry");
  const parsedPapers: Paper[] = Array.from(entries).map((entry) => ({
    name: entry.getElementsByTagName("title")[0].textContent || "",
    summary: entry.getElementsByTagName("summary")[0].textContent || "",
    pdfUrl:
      entry.querySelector('link[title="pdf"]')?.getAttribute("href") || "",
  }));

  return parsedPapers;
};

const usePapers = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const topic = "Machine learning";

  useEffect(() => {
    fetch(
      `http://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(topic)}&start=0&max_results=20`,
    )
      .then((response) => response.text())
      .then((data) => parseXMLPapers(data))
      .then((papers) => setPapers(papers));
  }, []);

  return papers;
};

const TinderCards: React.FC = () => {
  const papers = usePapers();
  const [currentIndex, setCurrentIndex] = useState(0);

  const onSwipe = (direction: string) => {
    console.log("You swiped: " + direction, currentIndex);
    if (direction === "up") {
      window.open(papers[currentIndex].pdfUrl, "_blank");
      return;
    }
    console.log("You swiped: " + direction);
    setCurrentIndex((prev) => prev + 1);
    // open the pdf in new tab
  };

  const onCardLeftScreen = (name: string) => {
    console.log(name + " left the screen");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[300px] h-[80vh] mt-20">
        {papers.slice(0, currentIndex + 2).map((paper) => (
          <TinderCard
            key={paper.name}
            onSwipe={onSwipe}
            onCardLeftScreen={() => onCardLeftScreen(paper.name)}
            preventSwipe={["up", "down"]}
            className="absolute w-full h-full bg-white flex flex-col  items-center"
          >
            <h1 className="p-4">{paper.name}</h1>
            <div className="w-full rounded-[20px] bg-white overflow-hidden">
              <div className="flex items-start justify-center overflow-y-auto h-full">
                <CustomPDFViewer pdfUrls={[paper.pdfUrl]} />
              </div>
            </div>
            <Link href={paper.pdfUrl} target="_blank" rel="noopener noreferrer">
              <Button>Read More</Button>
            </Link>
          </TinderCard>
        ))}
      </div>

      <div className="absolute bottom-[100px] left-1/2 transform -translate-x-1/2 flex space-x-4">
        <button className="bg-white rounded-full p-3 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
        <button className="bg-white rounded-full p-3 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TinderCards;
